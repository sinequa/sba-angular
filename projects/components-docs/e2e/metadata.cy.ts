import { compareScreenshots, visit } from "./fn"

describe('components/metadata testing', () => {
  it('Can access the Metadata page', () => {
    visit('components/metadata')
  })
  it('Has doc-metadata working', () => {
    visit('components/metadata')
    cy.get('doc-metadata').get('sq-metadata').get('sq-metadata-item').should('exist')
    compareScreenshots('doc-metadata')
  })
  it('Has doc-metadata-item working', () => {
    visit('components/metadata')
    cy.get('doc-metadata-item').get('sq-metadata-item').should('exist')
    compareScreenshots('doc-metadata-item')
  })
})