import { execSync } from "node:child_process";
import * as p from "@clack/prompts";

const REGISTRY = "https://npm.sinequa.com";

const PROJECTS = {
  core: { pkg: "@sinequa/core", buildScript: "buildcore" },
  components: { pkg: "@sinequa/components", buildScript: "buildcomponents" },
  analytics: { pkg: "@sinequa/analytics", buildScript: "buildanalytics" },
} as const;

type Project = keyof typeof PROJECTS;

// Build order respects dependency chain: core → components → analytics
const BUILD_ORDER: Project[] = ["core", "components", "analytics"];

function run(cmd: string): void {
  execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
}

function getOutput(cmd: string): string {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return "";
  }
}

function bumpVersion(
  version: string,
  type: "patch" | "minor" | "major"
): string {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN))
    throw new Error(`Invalid version: ${version}`);
  if (type === "major") return `${parts[0] + 1}.0.0`;
  if (type === "minor") return `${parts[0]}.${parts[1] + 1}.0`;
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function getPublishedVersion(pkg: string): string {
  return getOutput(`npm view ${pkg} version --registry ${REGISTRY}`);
}

function getLocalVersion(project: Project): string {
  return getOutput(
    `node -e "process.stdout.write(require('./projects/${project}/package.json').version)"`
  );
}

async function main(): Promise<void> {
  p.intro("SBA — publish libraries to Verdaccio");

  // 1. Select projects
  const selected = await p.multiselect<string>({
    message: "Which project(s) do you want to build & publish?",
    options: [
      { value: "core", label: "@sinequa/core" },
      { value: "components", label: "@sinequa/components" },
      { value: "analytics", label: "@sinequa/analytics" },
    ],
    required: true,
  });

  if (p.isCancel(selected)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const selectedSet = new Set(selected as Project[]);

  // 2. Fetch current published versions from Verdaccio
  const fetchSpinner = p.spinner();
  fetchSpinner.start("Fetching current versions from Verdaccio…");

  const publishedVersions: Partial<Record<Project, string>> = {};
  for (const proj of selected as Project[]) {
    const version = getPublishedVersion(PROJECTS[proj].pkg);
    publishedVersions[proj] = version || getLocalVersion(proj);
  }

  fetchSpinner.stop("Versions fetched.");

  for (const proj of selected as Project[]) {
    p.log.info(
      `${PROJECTS[proj].pkg}: ${publishedVersions[proj] ?? "not published yet"}`
    );
  }

  // 3. Choose bump type
  const bumpType = await p.select<string>({
    message: "Version bump type?",
    options: [
      { value: "patch", label: "patch", hint: "0.0.x" },
      { value: "minor", label: "minor", hint: "0.x.0" },
      { value: "major", label: "major", hint: "x.0.0" },
    ],
  });

  if (p.isCancel(bumpType)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  // 4. Compute new versions
  const newVersions: Partial<Record<Project, string>> = {};
  for (const proj of selected as Project[]) {
    const base = publishedVersions[proj]!;
    newVersions[proj] = bumpVersion(base, bumpType as "patch" | "minor" | "major");
    p.log.success(`${PROJECTS[proj].pkg}: ${base} → ${newVersions[proj]}`);
  }

  // 5. Determine full build order (dependencies included but not published)
  const needsCore =
    selectedSet.has("core") ||
    selectedSet.has("components") ||
    selectedSet.has("analytics");
  const needsComponents =
    selectedSet.has("components") || selectedSet.has("analytics");
  const needsAnalytics = selectedSet.has("analytics");

  const buildQueue: Project[] = [];
  if (needsCore) buildQueue.push("core");
  if (needsComponents) buildQueue.push("components");
  if (needsAnalytics) buildQueue.push("analytics");

  const extraBuilds = buildQueue.filter((p) => !selectedSet.has(p));
  if (extraBuilds.length > 0) {
    p.log.warn(
      `The following projects will also be built (required dependencies): ${extraBuilds.map((proj) => PROJECTS[proj].pkg).join(", ")}`
    );
  }

  // 6. Confirm
  const confirm = await p.confirm({
    message: "Proceed with version update and build?",
    initialValue: false,
  });

  if (p.isCancel(confirm) || !confirm) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  // 7. Update versions of selected projects
  const versionSpinner = p.spinner();
  versionSpinner.start("Updating versions…");
  for (const proj of BUILD_ORDER.filter((p) => selectedSet.has(p))) {
    run(
      `npm --no-git-tag-version version ${newVersions[proj]} --prefix projects/${proj}`
    );
  }
  versionSpinner.stop("Versions updated.");

  // 8. Build in dependency order
  const buildSpinner = p.spinner();
  buildSpinner.start("Building…");
  for (const proj of buildQueue) {
    buildSpinner.message(`Building ${PROJECTS[proj].pkg}…`);
    run(`npm run ${PROJECTS[proj].buildScript}`);
  }
  buildSpinner.stop("Build complete.");

  // 9. Confirm publish
  const shouldPublish = await p.confirm({
    message: `Publish to Verdaccio (${REGISTRY})?`,
    initialValue: false,
  });

  if (p.isCancel(shouldPublish)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (shouldPublish) {
    const publishSpinner = p.spinner();
    publishSpinner.start("Publishing…");
    for (const proj of BUILD_ORDER.filter((p) => selectedSet.has(p))) {
      publishSpinner.message(`Publishing ${PROJECTS[proj].pkg}@${newVersions[proj]}…`);
      run(`npm publish ./dist/${proj} --registry ${REGISTRY}`);
    }
    publishSpinner.stop("Published successfully.");
  }

  p.outro("Done!");
}

main().catch((err) => {
  p.cancel(String(err));
  process.exit(1);
});
