// TODO
// sq-baskets-menu

import { compareScreenshots, visit } from "./fn"

describe('components/baskets testing', () => {
  it('Can access the Baskets page', () => {
    visit('components/baskets')
  })
  it('Has doc-edit-basket working', () => {
    visit('components/baskets')
    cy.get('doc-edit-basket').get('sq-edit-basket').get('sq-modal').should('exist')
    compareScreenshots('doc-edit-basket')
  })
  it('Has doc-facet-baskets working', () => {
    visit('components/baskets')
    cy.get('doc-facet-baskets').get('sq-facet-baskets').get('.list-group').should('exist')
    compareScreenshots('doc-facet-baskets')
  })
  it('Has doc-manage-baskets working', () => {
    visit('components/baskets')
    cy.get('doc-manage-baskets').get('sq-manage-baskets').get('sq-modal').should('exist')
    compareScreenshots('doc-manage-baskets')
  })
  it('Has doc-result-baskets working', () => {
    visit('components/baskets')
    cy.get('doc-result-baskets').get('sq-result-baskets').get('button').should('exist')
    compareScreenshots('doc-result-baskets')
  })
  it('Has doc-select-baskets working', () => {
    visit('components/baskets')
    cy.get('doc-select-baskets').get('sq-select-basket').get('sq-modal').should('exist')
    compareScreenshots('doc-select-baskets')
  })
})