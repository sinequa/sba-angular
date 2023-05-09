// TODO
// doc-labels
// doc-labels-menu
// doc-result-labels

import { compareScreenshots } from "./fn"

describe('components/labels testing', () => {
  it('Can access the Labels page', () => {
    cy.visit('components/labels')
  })
  it('Has doc-add-label working', () => {
    cy.visit('components/labels')
    cy.get('doc-add-label').get('sq-add-label').get('input')
    compareScreenshots('doc-add-label')
  })
  it('Has doc-delete-label working', () => {
    cy.visit('components/labels')
    cy.get('doc-delete-label').get('sq-delete-label').get('input')
    compareScreenshots('doc-delete-label')
  })
  it('Has doc-edit-label working', () => {
    cy.visit('components/labels')
    cy.get('doc-edit-label').get('sq-edit-label').get('input')
    compareScreenshots('doc-edit-label')
  })
  it('Has doc-labels-autocomplete working', () => {
    cy.visit('components/labels')
    cy.get('doc-labels-autocomplete').get('sq-labels-autocomplete').get('.badge')
    compareScreenshots('doc-labels-autocomplete')
  })
  it('Has doc-rename-label working', () => {
    cy.visit('components/labels')
    cy.get('doc-rename-label').get('sq-rename-label').get('input')
    compareScreenshots('doc-rename-label')
  })
})