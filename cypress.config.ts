import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';

export default defineConfig({
  env: {
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false,
    ALWAYS_GENERATE_DIFF: false,
    ALLOW_VISUAL_REGRESSION_TO_FAIL: false,
    type: 'actual'
  },
  e2e: {
    baseUrl: 'http://localhost:4200/#/',
    specPattern: '{projects,cypress}/**/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
  },
});
