// Useful Jenkins functions

// call a job to build an app
def build_app(sba_version, jobToBuild, branch) {
	stage("Build app ${jobToBuild}") {
		// is the job runnable ?
		def enabled = Jenkins.instance.getItemByFullName(jobToBuild).isBuildable();
		def jobnamebranch = "${jobToBuild}/${branch}"
		echo "build app ${jobToBuild} in branch ${branch} with sba-internal version ${sba_version} ${jobnamebranch}"
		if (enabled) {
			// start the job (without propagate error)
			def resbuild = build job: jobnamebranch, wait: true, propagate: false, parameters: [string(name: 'SBA_VERSION', value: sba_version)]
			def jobResult = resbuild.getResult()
			echo "Build of ${jobnamebranch} returned result: ${jobResult}"
			if (jobResult != 'SUCCESS') {
				sendMessage("#CC0000", "Build failed when building ${jobToBuild} in branch ${branch} with sba-internal version ${sba_version}")
				// set the current build as unstable (warning)
				currentBuild.result = "UNSTABLE"
			}
		}
	}
}

// function to get the package version in package.json file
def get_pkg_version() {
	def pkg_version = powershell(returnStdout: true, script: '''
		$file = 'package.json'
		$search = '.+"version":\\s"(.+)"'
		$retval = (Select-String -path $file -pattern $search -Allmatches | % { $_.Matches.Groups[1].Value })
		write-output $retval
	''')
	// remove CR/LF
	pkg_version = pkg_version.trim()
	pkg_version = "${pkg_version}${pkg_suffix}.${env.BUILD_NUMBER}"
	echo "pkg_version: ${pkg_version}"
	return pkg_version
}

// function to build the package tag from the version
def get_pkg_tag(sba_version) {
	def pkg_tag = sba_version.split(pkg_suffix)[0]
	pkg_tag = pkg_tag.trim()
	pkg_tag = "${tag_prefix}${pkg_tag}"
	echo "pkg_tag: ${pkg_tag}"
	return pkg_tag
}

// function to check if we are in PR or another branch
def buildOrMerge() {
	def typeAction = ""
	if (env.BRANCH_NAME.contains("PR-")) {
		typeAction = "build"
	} else {
		typeAction = "merge"
	}
	return typeAction
}
// get the branch name and the version number from the right jenkins variable 
def getBranch() {
	def tmpBranch=""
	// PR : 
	//   BRANCH_NAME: PR-8208
	//   CHANGE_TARGET: release/11.7.0
	// BRANCH
	//   BRANCH_NAME: develop
	//   BRANCH_NAME: release/11.7.0
	// return: release/11.7.0

	if (env.BRANCH_NAME.contains("PR-")) {
		tmpBranch = env.CHANGE_TARGET
	} else {
		tmpBranch = env.BRANCH_NAME
	}
	echo "tmpBranch: ${tmpBranch}"

	echo "Branch returned: ${tmpBranch}"
	return tmpBranch
}

// get the branch name and the version number from the right jenkins variable 
def findBranchNumber() {
	def tmpBranch=""
	def theBranch=""
	// PR : 
	//   BRANCH_NAME: PR-8208
	//   CHANGE_TARGET: release/11.7.0
	// BRANCH
	//   BRANCH_NAME: develop
	//   BRANCH_NAME: release/11.7.0
	// return: release%2F11.7.0

	echo "Triggering job for branch ${env.BRANCH_NAME}"
	tmpBranch = getBranch()

	theBranch = tmpBranch.replace("/", "%2F")
	echo "Branch returned: ${theBranch}"
	return theBranch
}

// function to append lines to the end of a file
def appendFile(afile, what) {
	def content = ""
	def txt = ""
	try {
		if (fileExists(afile)) {
			content = readFile afile
			what.each {
				txt += it + "\n"
			}
			content += txt
			//echo "content: ${content}"
			writeFile file: afile, text: content
		}
	} catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}
}

// function to send an email to the authors of the commit
def sendMessage(color, specificMessage, logfile="") {
	echo "Message is: ${specificMessage}"
	if (!binding.hasVariable("AUTHOR_NAME")) {
		AUTHOR_NAME = ""
	}
	// https://jenkins.sinequa.com/env-vars.html/

	to = ""
	pbranch = env.BRANCH_NAME
	branch_link = pbranch
	if (pbranch.startsWith("PR-")) {
		branch_link += " https://github.sinequa.com/Product/ice/pull/" + pbranch.replace("PR-", "")
	}
	if ("${color}" == "#26cc00") {
		status = "OK"
	} else {
		status = "Failed"
		to = mailto
	}
	if ("${AUTHOR_NAME}" != "") {
		to = "${AUTHOR_NAME}" + ", " + to
	}
	// println("mailTo: ${to}")
	
	subject = "[${pbranch}] ${BUILD_TAG} ${status}"
	echo "Send email ${subject} to ${to}"
	
	header = "Commit on branch ${branch_link} from ${AUTHOR_NAME}\nJob ${BUILD_URL}/\n"
	message = "${header}\n${specificMessage}"
	
	if ("${status}" == "Failed" && logfile?.trim()) {
		log = bat (script: "type ${WORKSPACE}\\${logfile}",returnStdout: true)
		emailext(from: "build@sinequa.com",  to: "${to}", attachLog:true, subject: "${subject}", body: "${message}\n\n${log}")
	} else {
		emailext(from: "build@sinequa.com",  to: "${to}", attachLog:false, subject: "${subject}", body: "${message}\n\n")
	}
}

// get the path of npm in the version of the branch
def getIceNode(branchName) {
	println "Get nodejs from ICE for the release ${branchName}"
	def cmd = "&git clone --no-checkout --depth 1 --filter=blob:none --branch ${branchName} --single-branch ${env:GIT_ROOT_URL}/Product/ice ice" + "\n"
	cmd += "cd ice" + "\n"
	cmd += "&git sparse-checkout init --cone" + "\n"
	cmd += "&git sparse-checkout set distrib/programs/win/node/" + "\n"
	cmd += "&git checkout ${branchName}" + "\n"
	cmd += "cd .." + "\n"
	// println cmd
	try {
		def ret = powershell(returnStdout: true, script: cmd)
	} catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}
}

// get the path of npm in the version of the branch
def getNPMpath(pgm) {
	println "Get $pgm path"
	def pgmPath = ""
	
	// def cmd = '\$npmPath="ice\\distrib\\programs\\win\\node\\14.16.0\\' + pgm + '"' + "\n"
	def cmd = '\$npmPath = Get-Childitem -path ./ice -file ' + pgm + ' -recurse -ErrorAction SilentlyContinue | select fullname | Out-String -stream | select-object -skip 3 | select-object -first 1'+ "\n"
	cmd += "if ( \$null -ne \$npmPath ) {" + "\n"
	cmd += " if ( Test-Path \$npmPath -PathType leaf ) {" + "\n"
	cmd += " Write-Output \$npmPath" + "\n"
	cmd += " } else {" + "\n"
	cmd += ' Write-Output ""' + "\n"
	cmd += " }" + "\n"
	cmd += "} else {" + "\n"
	cmd += 'Write-Output ""' + "\n"
	cmd += "}" + "\n"
	// println cmd
	
	pgmPath = powershell(returnStdout: true, script: cmd)
	// remove CR/LF
	pgmPath = pgmPath.trim()
	
	println "Path found: "+ pgmPath
	return pgmPath
}

return this
