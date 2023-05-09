// TODO
// doc-alerts-menu

import { compareScreenshots } from "./fn"

describe('components/alerts testing', () => {
  it('Can access the Alerts page', () => {
    cy.visit('components/alerts')
  })
  it('Has doc-edit-alert working', () => {
    cy.visit('components/alerts')
    cy.get('doc-edit-alert').get('sq-edit-alert').get('sq-modal')
    compareScreenshots('doc-edit-alert')
  })
  it('Has doc-manage-alerts', () => {
    cy.visit('components/alerts')
    cy.get('doc-manage-alerts').get('sq-manage-alerts').get('sq-modal')
    compareScreenshots('doc-manage-alerts')
  })
})