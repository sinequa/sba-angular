const fs = require('fs/promises');

const filePath = "./docs/_config.yml";
const baseurl = "/pages/CustomerSolutions/sba-internal/";

fs.readFile(filePath, 'utf-8').then(data => {
  const pattern = `baseurl: \"/sba-angular/\"`;
  let hasReplacement = false;
  const result = data.replace(pattern, () => {
    hasReplacement = true;
    return `baseurl: \"${baseurl}\"`;
  });
  if(hasReplacement) {
    console.log(`Rewriting ${filePath} with baseurl: "${baseurl}"`);
    return fs.writeFile(filePath, result, 'utf-8');
  }
  else {
    throw new Error(`Could not find ${pattern} in ${filePath}`);
  }
});
