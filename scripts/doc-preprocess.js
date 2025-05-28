const fs = require('fs/promises');
const path = require('path');

const typeRegistry = new Map();
const repository = process.argv[2] || "https://github.com/sinequa/sba-angular";

/**
 * Given the path to a .ts file, this function searches for classes,
 * types, and interfaces and adds them to the type registry
 */
async function handleTsFile(filePath) {
  // Insert your function logic here
  return fs.readFile(filePath, 'utf-8').then(data => {

    const filename = path.basename(filePath);

    // Strip comments, but preserve line numbers by replacing with newlines
    const noComments = data.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, (match) => {
      // Count the number of newlines in the match and return the same number of newlines
      return (match.match(/\n/g) || []).map(() => '\n').join('');
    });

    // This regex looks for a 'class', 'type', or 'interface' keyword,
    // followed by one or more spaces, followed by one or more word characters
    const pattern = /\b(class|type|interface)\s+(\w+)/g;
    let match;

    while ((match = pattern.exec(noComments)) !== null) {
      const lineNumber = (noComments.substring(0, match.index).match(/\n/g) || []).length + 1;
      const type = match[1];
      const name = match[2];
      console.log(`Found ${type} ${name} at line ${lineNumber} in ${filename}`);
      if(typeRegistry.has(name)) {
        const prev = typeRegistry.get(name);
        console.warn(`Duplicate ${type} ${name} found at line ${lineNumber} in ${filename} was also found at line ${prev.lineNumber} in ${prev.filename} `);
      }
      typeRegistry.set(name, {type, lineNumber, filename, filePath});
    }
  });
}

/**
 * Scans a directory for .ts files (excluding tests)
 * and calls the callback function for each file
 */
async function forEachSourceFile(directoryPath, callback) {
  // Read the directory
  return fs.readdir(directoryPath, { withFileTypes: true }).then(dirents => {
    const promises = dirents.map(dirent => {
      const fullPath = path.join(directoryPath, dirent.name);

      if (dirent.isDirectory() && dirent.name !== '__tests__') {
        return forEachSourceFile(fullPath, callback);
      } else if (dirent.isFile() && path.extname(dirent.name) === '.ts' && !dirent.name.endsWith('.spec.ts') && dirent.name != 'test.ts') {
        return callback(fullPath);
      }
      return Promise.resolve();
    });
    return Promise.all(promises);
  });
}

/**
 * Search for types in the documentation and replace them with links to the source code
 */
async function handleDocFile(filePath) {
  return fs.readFile(filePath, 'utf-8').then(data => {
    const filename = path.basename(filePath);

    let hasReplacement = false;
    const pattern = /(?<!\[\s*)`(\w+)`(?!\s*\])/g;
    const result = data.replace(pattern, (match) => {
      const name = match.substring(1, match.length - 1);
      if(typeRegistry.has(name)) {
        hasReplacement = true;
        const type = typeRegistry.get(name);
        console.log(`Found ${type.type} ${name} in ${filename}`);
        return `[${match}](${repository}/blob/master/${type.filePath.replace(/\\/g, '/')}#L${type.lineNumber})`;
      }
      else {
        console.warn(`Could not find ${name} in ${filename}`);
      }
      return match;
    });

    if(hasReplacement) {
      console.log(`Writing ${filePath}`);
      return fs.writeFile(filePath, result, 'utf-8');
    }
  });
}

/**
 * Scans a directory for .md files and calls the callback function for each file
 */
async function forEachDocFile(directoryPath, callback) {
  // Read the directory
  return fs.readdir(directoryPath, { withFileTypes: true }).then(dirents => {
    const promises = dirents.map(dirent => {
      const fullPath = path.join(directoryPath, dirent.name);

      if (dirent.isDirectory() && !dirent.name.startsWith("_")) {
        return forEachDocFile(fullPath, callback);
      } else if (dirent.isFile() && path.extname(dirent.name) === '.md') {
        return callback(fullPath);
      }
      return Promise.resolve();
    });
    return Promise.all(promises);
  });
}


console.log("Scanning for types...");

// Call the function on your directory
Promise.all([
  forEachSourceFile('./projects/core', handleTsFile),
  forEachSourceFile('./projects/components', handleTsFile),
  forEachSourceFile('./projects/analytics', handleTsFile)
]).then(() => {
  console.log("Scanning for docs...");
  return forEachDocFile('./docs', handleDocFile);
}).catch(err => {
  console.error('An error occurred:', err);
});
