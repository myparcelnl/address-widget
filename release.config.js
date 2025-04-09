import {
  addChangelogPlugin,
  addCommitAnalyzerPlugin,
  addGitHubActionsOutputPlugin,
  addGitHubPlugin,
  addReleaseNotesGeneratorPlugin,
} from '@myparcel/semantic-release-config/src/plugins';
import mainConfig from '@myparcel/semantic-release-config';

/**
 * @type {import('semantic-release').Options}
 */
export default {
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
