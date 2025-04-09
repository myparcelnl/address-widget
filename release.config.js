const {
  addChangelogPlugin,
  addCommitAnalyzerPlugin,
  addGitHubActionsOutputPlugin,
  addGitHubPlugin,
  addReleaseNotesGeneratorPlugin,
} = require('@myparcel/semantic-release-config/src/plugins');
const mainConfig = require('@myparcel/semantic-release-config');

/**
 * @type {import('semantic-release').Options}
 */
module.exports = {
  ...mainConfig,
  extends: 'semantic-release-monorepo',
  tagFormat: 'v${version}',
  plugins: [
    addCommitAnalyzerPlugin(),
    addGitHubActionsOutputPlugin(),
    addReleaseNotesGeneratorPlugin(),
    addChangelogPlugin(),

    /*
     * Includes npm and git functionality
     */
    [
      '@myparcel-do/semantic-release-plugin'
    ],

    addGitHubPlugin(),
  ],
};
