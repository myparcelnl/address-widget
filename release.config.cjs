const {
  addChangelogPlugin,
  addCommitAnalyzerPlugin,
  addGitHubActionsOutputPlugin,
  addGitPlugin,
  addGitHubPlugin,
  addReleaseNotesGeneratorPlugin,
} = require('@myparcel/semantic-release-config/src/plugins');
const mainConfig = require('@myparcel/semantic-release-config');

/**
 * @type {import('semantic-release').Options}
 */
module.exports = {
  ...mainConfig,
  tagFormat: 'v${version}',
  plugins: [
    addCommitAnalyzerPlugin(),
    addGitHubActionsOutputPlugin(),
    addReleaseNotesGeneratorPlugin(),
    addChangelogPlugin(),
    addGitPlugin(),
    addGitHubPlugin(),
  ],
};
