// TODO
// sq-baskets-menu

import { compareScreenshots } from "./fn"


describe('components/baskets testing', () => {
  it('Can access the Baskets page', () => {
    cy.visit('components/baskets')
  })
  it('Has doc-edit-basket working', () => {
    cy.visit('components/baskets')
    cy.get('doc-edit-basket').get('sq-edit-basket').get('sq-modal')
    compareScreenshots('doc-edit-basket')
  })
  it('Has doc-facet-baskets working', () => {
    cy.visit('components/baskets')
    cy.get('doc-facet-baskets').get('sq-facet-baskets').get('.list-group')
    compareScreenshots('doc-facet-baskets')
  })
  it('Has doc-manage-baskets working', () => {
    cy.visit('components/baskets')
    cy.get('doc-manage-baskets').get('sq-manage-baskets').get('sq-modal')
    compareScreenshots('doc-manage-baskets')
  })
  it('Has doc-result-baskets working', () => {
    cy.visit('components/baskets')
    cy.get('doc-result-baskets').get('sq-result-baskets').get('button')
    compareScreenshots('doc-result-baskets')
  })
  it('Has doc-select-baskets working', () => {
    cy.visit('components/baskets')
    cy.get('doc-select-baskets').get('sq-select-basket').get('sq-modal')
    compareScreenshots('doc-select-baskets')
  })
})