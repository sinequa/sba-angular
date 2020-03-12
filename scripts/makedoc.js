// Hook Ast.ts.createSourceFile to replace contents of module.providers.ts files with adjoining 
// module.providers.doc.ts files 
const Ast = require('ts-simple-ast'); // compodoc uses typescript via this module
const path = require('path');
const fs = require('fs');
const process = require('process');

const PROVIDERS_FILE = 'module.providers.ts';
const DOC_PROVIDERS_FILE = 'module.providers.doc.ts';

const originalCreateSourceFile = Ast.ts.createSourceFile;

function createSourceFile(fileName, text, languageVersion, setParentNodes) {
    const args = [...arguments];
    if (path.basename(fileName) === PROVIDERS_FILE) {
        const replacementFileName = path.join(path.dirname(fileName), DOC_PROVIDERS_FILE);
        let replacementText;
        try {
            replacementText = fs.readFileSync(replacementFileName, {encoding: 'utf8', flag: 'r'});
        }
        catch (ex) {
            console.log('Module provider replacement file does not exist:', replacementFileName);
            process.exit(-1);
        }
        if (replacementText) {
            args[1] = replacementText;
        }
    }
    return originalCreateSourceFile.apply(this, args);
}

Ast.ts.createSourceFile = createSourceFile;

// Run compodoc
const cd = require('@compodoc/compodoc');
const cdApp = new cd.CliApplication();
cdApp.start();