// TODO
// doc-facet-refine

import { compareScreenshots, visit } from "./fn"

describe('components/facet testing', () => {
  it('Can access the Facet page', () => {
    visit('components/facet')
  })
  it('Has doc-facet working', () => {
    visit('components/facet')
    cy.get('doc-facet').get('sq-facet-card').get('.card').should('exist')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-primary-actions').should('exist')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-view-actions').should('exist')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-secondary-actions').should('exist')
    compareScreenshots('doc-facet')
  })
  it('Has doc-facet-bar working', () => {
    visit('components/facet')
    cy.get('doc-facet-bar').get('sq-facet-bar').get('sq-facet-card').should('exist')
    compareScreenshots('doc-facet-bar')
  })
  it('Has doc-facet-filters working', () => {
    visit('components/facet')
    cy.get('doc-facet-filters').get('sq-facet-filters').get('ul').should('exist')
    compareScreenshots('doc-facet-filters')
  })
  it('Has doc-facet-list working', () => {
    visit('components/facet')
    cy.get('doc-facet-list').get('sq-facet-list').get('input').should('exist')
    cy.get('doc-facet-list').get('sq-facet-list').get('ul').should('exist')
    compareScreenshots('doc-facet-list')
  })
  it('Has doc-facet-multi working', () => {
    visit('components/facet')
    cy.get('doc-facet-multi').get('sq-facet-multi').get('.list-group').should('exist')
    compareScreenshots('doc-facet-multi')
  })
  it('Has doc-facet-range working', () => {
    visit('components/facet')
    cy.get('doc-facet-range').get('sq-facet-range').get('ngx-slider').should('exist')
    compareScreenshots('doc-facet-range')
  })
  it('Has doc-facet-tag-cloud working', () => {
    visit('components/facet')
    cy.get('doc-facet-tag-cloud').get('sq-facet-tag-cloud').get('ul.cloud').should('exist')
    compareScreenshots('doc-facet-tag-cloud')
  })
  it('Has doc-facet-testing working', () => {
    visit('components/facet')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Booleans"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Booleans"]'], 'facet-testing-booleans')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Integers"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Integers"]'], 'facet-testing-integers')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Doubles"]'], 'facet-testing-doubles')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles Dist"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Doubles Dist"]'], 'facet-testing-doubles-dist')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles Range"]').get('ngx-slider').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Doubles Range"]'], 'facet-testing-doubles-range')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Dist"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Dates Dist"]'], 'facet-testing-dates-dist')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Range"]').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Dates Range"]'], 'facet-testing-dates-range')
    // cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Timeline"]')
    // compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Dates Timeline"]'], 'facet-testing-dates-timeline')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates"]').get('sq-facet-date').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Dates"]'], 'facet-testing-dates')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Strings"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Strings"]'], 'facet-testing-strings')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Trees"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Trees"]'], 'facet-testing-trees')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Entities"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Entities"]'], 'facet-testing-entities')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Normalized Entities"]').get('ul').should('exist')
    compareScreenshots(['doc-facet-testing', 'sq-facet-card[ng-reflect-title="Normalized Entities"]'], 'facet-testing-normalized-entities')
  })
})