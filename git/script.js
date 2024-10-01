const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const git = simpleGit();

if (process.argv.length < 3) {
  console.error("Usage: node script.js <PAT>");
  process.exit(1);
}

const PAT = process.argv[2];
const GITMODULES_FILE = path.join(process.cwd(), "../.gitmodules");

if (!fs.existsSync(GITMODULES_FILE)) {
  console.error(".gitmodules file not found in the root of the repository.");
  process.exit(1);
}

function parseGitmodules() {
  const data = fs.readFileSync(GITMODULES_FILE, "utf-8");
  const lines = data.split("\n");

  const paths = [];
  const urls = [];
  let currentSubmodule = "";

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("[submodule")) {
      currentSubmodule = trimmedLine.match(/"(.+)"/)[1];
      console.log(`Found submodule: ${currentSubmodule}`);
    } else if (trimmedLine.startsWith("path =")) {
      const path = trimmedLine.split("=")[1].trim();
      paths.push(path);
      console.log(`Found path: '${path}'`);
    } else if (trimmedLine.startsWith("url =")) {
      const url = trimmedLine.split("=")[1].trim();
      const urlWithPat = `https://${PAT}@${url.replace("https://", "")}`;
      urls.push(urlWithPat);
      console.log(`Found URL: '${urlWithPat}'`);
    }
  });

  return { paths, urls };
}

function deleteSubmoduleFolder(submodulePath) {
  if (fs.existsSync(submodulePath)) {
    fs.rmSync(submodulePath, { recursive: true, force: true });
    console.log(`Deleted submodule folder: ${submodulePath}`);
  } else {
    console.log(`Submodule folder not found: ${submodulePath}`);
  }
}

function deleteGitFolder(submodulePath) {
  const gitFolder = path.join(submodulePath, ".git");
  if (fs.existsSync(gitFolder)) {
    fs.rmSync(gitFolder, { recursive: true, force: true });
    console.log(`Deleted .git folder in: ${submodulePath}`);
  } else {
    console.log(`.git folder not found in: ${submodulePath}`);
  }
}

async function processSubmodules() {
  const { paths, urls } = parseGitmodules();

  for (let i = 0; i < paths.length; i++) {
    const submodulePath = paths[i];
    const submoduleUrl = urls[i];

    // Step 1: Delete the submodule folder if it exists
    deleteSubmoduleFolder(submodulePath);

    // Step 2: Clone the submodule into the specified path
    console.log(`Cloning submodule: ${submodulePath} from ${submoduleUrl}`);
    try {
      await git.clone(submoduleUrl, submodulePath);
    } catch (error) {
      console.error(`Failed to clone ${submoduleUrl} into ${submodulePath}`);
      continue;
    }

    // Step 3: Remove the submodule's .git directory to convert it into a normal folder
    deleteGitFolder(submodulePath);
  }
}

// Execute the main function
processSubmodules().catch((error) => {
  console.error("An error occurred:", error);
});
