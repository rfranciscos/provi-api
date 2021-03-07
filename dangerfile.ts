import { danger, warn, fail } from 'danger';

// Setup
const pr = danger.github.pr;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// // Custom modifiers for people submitting PRs to be able to say "skip this"
// const skipTests = bodyAndTitle.includes('skip new tests');
// const skipVisualDiff = bodyAndTitle.includes('skip visual diff');
// const skipStories = bodyAndTitle.includes('skip stories');
// const hasScreenShots =
//   pr.body.includes('.png') ||
//   pr.body.includes('.jpg') ||
//   pr.body.includes('.gif');

// Check for description
if (danger.github.pr.body.length < 10) {
  fail('This pull request needs a description.');
}

// // Check for reference to JIRA issue
// const JIRA_REGEX = /(DAR-|MLSSERV-)/;
// if (!JIRA_REGEX.test(bodyAndTitle)) {
//   warn(
//     'Is this PR related to a Jira issue? If so link it via the PR title or description by adding the issue id (DAR-XXX)'
//   );
// }

// Warn when there is a big PR
const bigPRThreshold = 20;
if (pr.additions + pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR');
}

// // Gather changes
// const modifiedFiles = danger.git.modified_files.filter(path =>
//   path.endsWith('js')
// );

// // Check for console.log statements
// modifiedFiles.forEach(file => {
//   const content = fs.readFileSync(file).toString();
//   if (content.includes('console.log') || content.includes('console.warn')) {
//     fail(`a \`console.log\` was left in file (${file})`);
//   }
// });

// // Check that every file touched has a corresponding test file
// const correspondingTestsForModifiedFiles = modifiedFiles.map(f => {
//   const newPath = path.dirname(f);
//   const name = path.basename(f);
//   return `${newPath}/__tests__/${name}`;
// });

// const testFilesThatDontExist = correspondingTestsForModifiedFiles
//   .filter(f => !f.includes('__stories__')) // skip stories
//   .filter(f => !fs.existsSync(f));

// if (testFilesThatDontExist.length > 0 && !skipTests) {
//   const output = `Missing Test Files:
// ${testFilesThatDontExist.map(f => `- \`${f}\``).join('\n')}
// If these files are supposed to not exist, please update your PR body to include "Skip New Tests".`;
//   warn(output);
// }

// // Find changed React components
// const changedComponents = modifiedFiles.filter(file => {
//   const content = fs.readFileSync(file).toString();
//   return content.includes('React');
// });

// // Check for images in PR description if new components added
// if (changedComponents.length > 0 && !skipVisualDiff && !hasScreenShots) {
//   const output = `Should there be images to represent these components:
//   ${changedComponents.map(f => `- \`${f}\``).join('\n')}
//   If these changes are not visual, please update your PR body to include "Skip Visual Diff".`;
//   warn(output);
// }

// // Check that every component touched has a corresponding story
// const correspondingStoriesForChangedComponents = uniq(
//   changedComponents.map(f => {
//     const newPath = path.dirname(f);
//     return `${newPath}/__stories__/index.js`;
//   })
// );

// const missingStories = correspondingStoriesForChangedComponents.filter(
//   f => !fs.existsSync(f)
// );

// if (missingStories.length && !skipStories) {
//   const output = `Missing Stories:
// ${missingStories.map(f => `- \`${f}\``).join('\n')}
// If these stories should not exist, please update your PR body to include "Skip Stories".`;
//   warn(output);
// }