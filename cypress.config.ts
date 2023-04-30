import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  videoCompression: 51,
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:4200/',
  },
});
