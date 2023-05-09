// TODO
// sq-preview-extracts-panel

import { compareScreenshots, search } from "./fn"

describe('components/preview testing', () => {
  it('Can access the Preview page', () => {
    cy.visit('components/preview?search=Paris')
  })
  it('Has doc-preview working', () => {
    cy.visit('components/preview')
    search('Paris');
    cy.wait(2000)
    cy.get('doc-preview').get('sq-preview').get('iframe')
    cy.get('doc-preview').get('sq-preview-entity-panel').get('sq-facet-card')
    compareScreenshots(['doc-preview', 'doc-component-demo[ng-reflect-title="Preview"]'], 'preview')
    compareScreenshots(['doc-preview', 'doc-component-demo[ng-reflect-title="PreviewEntityPanelComponent"]'], 'preview-entity-panel')
  })
  it('Has doc-preview-search-form working', () => {
    cy.visit('components/preview')
    cy.get('doc-preview-search-form').get('sq-preview-search-form').get('input')
    compareScreenshots('doc-preview-search-form')
  })
})