import { danger, warn, fail } from 'danger';
import slack from 'danger-plugin-slack'
// Setup
const pr = danger.github.pr;

// Check for description
const checkDescription = () => {
  if (pr.body.length < 10) {
    fail('This pull request needs a description.');
  }
}

// Warn when there is a big PR
const checkPRSize = () => {
  const bigPRThreshold = 500;
  if (pr.additions + pr.deletions > bigPRThreshold) {
    warn(':exclamation: Big PR');
  }
}

const modifiedFiles = danger.git.modified_files;

// Number of modified Files
const numberOfModifiedFiles = modifiedFiles.length;

const slackReport = () => {
  const options = {
    webhookUrl: "https://hooks.slack.com/services/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",
    text: `Novo PR com ${numberOfModifiedFiles} arquivos modificados`, 
    username: "Bot do PR",
    iconEmoji: ":sunglasses:",
    iconUrl: "http://path/custom/icon/url",
    channel: "#general",
  }
  
  slack(options)
}

checkDescription();
checkPRSize();
slackReport();
