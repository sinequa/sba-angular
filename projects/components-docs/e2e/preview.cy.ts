// TODO
// sq-preview-extracts-panel
// sq-preview-search-form

describe('components/preview testing', () => {
  it('Can access the Preview page', () => {
    cy.visit('components/preview?search=Paris')
  })
  it('Has doc-preview working', () => {
    cy.visit('components/preview?search=Paris')
    cy.get('doc-preview').get('sq-preview').get('iframe')
    cy.get('doc-preview').get('sq-preview-entity-panel').get('sq-facet-card')
  })
})