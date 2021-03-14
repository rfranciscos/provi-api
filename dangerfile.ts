/**
 * BEFORE EDITING THIS FILE, PLEASE READ http://danger.systems/js/usage/culture.html
 *
 * This file is split into two parts:
 * 1) Rules that require or suggest changes to the code, the PR, etc.
 * 2) Rules that celebrate achievements
 */
import { danger, fail, message, warn } from 'danger';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~ Required or suggested changes                                          ~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Rule: It is necessary to have at least 2 reviewers.
 */
const reviewersCount = danger.github.requested_reviewers.users.length;
if (reviewersCount === 0) {
  fail(`🕵 Whoops, I don't see any reviewers. Remember to add two.`);
} else if (reviewersCount >= 2) {
  message(`It's great to have ${reviewersCount} reviewers.`);
}

/**
 * Rule: The number of changes must be less than 1000.
 * Reason: To make review more easy
 */
const bigPRThreshold = 1000;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(
    '🤡 Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.',
  );
}

/**
 * Rule: Don't commit the package-lock.json file
 * Reason: Always use package.json as a reference
 */
console.log(danger.git.modified_files);
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
if (lockfileChanged) {
  fail(
    "👀 This project don't accept package-lock file. Please, remove file and try again",
  );
}

/**
 * Rule: All commits must have (feat/fix/major/chore) as a prefix
 * Reason: Easy searching and reading commit
 */
danger.git.commits.forEach((commit) => {
  if (!commit.message.match(/^(feat:)|(fix:)|(major:)|(chore:)/g)) {
    fail(`👀 Commit message '${commit.message}' does match the correct format`);
  }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~ Achievemnts                                                            ~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Rule: Celebrate PRs that remove more code than they add.
 * Reason: Less is more!
 */
if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(
    `🥋👏 Great job! I see more lines deleted than added. Thanks for keeping us lean!`,
  );
}
