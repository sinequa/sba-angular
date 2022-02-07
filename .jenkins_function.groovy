// Useful Jenkins functions

// call a job to build an app
def build_app(sba_version, jobToBuild, branch) {
	stage("Build app ${jobToBuild}") {
		try {
			// is the job runnable ?
			def enabled = Jenkins.instance.getItemByFullName(jobToBuild).isBuildable();
			def jobnamebranch = "${jobToBuild}/${branch}"
			echo "build app ${jobToBuild} in branch ${branch} with sba-internal version ${sba_version} ${jobnamebranch}"
			if (enabled) {
				def res = build job: jobnamebranch, wait : true, propagate : true, parameters: [string(name: 'SBA_VERSION', value: sba_version)]
			}
		} catch (err) {
			currentBuild.result = "FAILURE"
			sendMessage("#CC0000", "Build failed when building ${jobToBuild} in branch ${branch} with sba-internal version ${sba_version}")
			throw err
		}
	}
}

// set the sba_version variable with the version
// the version is calculated or is a parameter of the job
def set_sba_version(curBranch) {
	if (sba_version.length() == 0) {
		if ( env.BRANCH_NAME.contains("release") ) {
			sba_version = curBranch.split("%2F")[1].trim()
		} else {
			sba_version = developNumber
		}
		// add the build number to have a unique version
		sba_version = "${sba_version}.${env.BUILD_NUMBER}"
	}
	echo "sba_version: ${sba_version}"
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
	if (env.BRANCH_NAME.contains("PR-")) {
		tmpBranch = env.CHANGE_TARGET
	} else {
		tmpBranch = env.BRANCH_NAME
	}
	echo "tmpBranch: ${tmpBranch}"

	theBranch = tmpBranch.replace("/", "%2F")
	echo "Branch returned: ${theBranch}"
	return theBranch
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
return this
