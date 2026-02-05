const {
  addChangelogPlugin,
  addCommitAnalyzerPlugin,
  addGitHubActionsOutputPlugin,
  addGitPlugin,
  addGitHubPlugin,
  addReleaseNotesGeneratorPlugin,
  addNpmPlugin,
} = require('@myparcel-dev/semantic-release-config/src/plugins');
const mainConfig = require('@myparcel-dev/semantic-release-config');

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
    addNpmPlugin(),
    addGitPlugin(),
    addGitHubPlugin()
  ],
};
