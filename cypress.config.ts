import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:4200/#/',
    specPattern: '{projects,cypress}/**/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
  },
});
