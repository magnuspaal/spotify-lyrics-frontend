import { readFile, writeFileSync } from 'fs';

const compose = 'cicd/deploy/docker-compose.yml';
const newVersion = process.argv[2]

bumpVersion(compose, /^(\s+image.*social-frontend:)(.+)$/m, newVersion);

function bumpVersion(file, regexp, version) {
  readFile(file, "utf-8", (err, data) => {
    if (err) { console.log(err) }
     const text = data.replace(regexp, "$1" + version);
     writeFileSync(file, text);
     console.log(`Bumping version in ${file} to ${version}`)
  });
}