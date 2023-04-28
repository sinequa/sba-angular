// TODO
// doc-facet-refine

describe('components/facet testing', () => {
  it('Can access the Facet page', () => {
    cy.visit('components/facet')
  })
  it('Has doc-facet working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet').get('sq-facet-card').get('.card')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-primary-actions')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-view-actions')
    cy.get('doc-facet').get('sq-facet-card').get('.sq-secondary-actions')
  })
  it('Has doc-facet-bar working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-bar').get('sq-facet-bar').get('sq-facet-card')
  })
  it('Has doc-facet-filters working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-filters').get('sq-facet-bar').get('sq-facet-filters').get('ul')
  })
  it('Has doc-facet-list working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-list').get('sq-facet-list').get('input')
    cy.get('doc-facet-list').get('sq-facet-list').get('ul')
  })
  it('Has doc-facet-multi working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-multi').get('sq-facet-multi').get('.list-group')
  })
  it('Has doc-facet-range working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-range').get('sq-facet-range').get('ngx-slider')
  })
  it('Has doc-facet-tag-cloud working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-tag-cloud').get('sq-facet-tag-cloud').get('ul.cloud')
  })
  it('Has doc-facet-testing working', () => {
    cy.visit('components/facet')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Booleans"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Integers"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles Dist"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Doubles Range"]').get('ngx-slider')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Dist"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Range"]')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates Timeline"]')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Dates"]').get('sq-facet-date')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Strings"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Trees"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Entities"]').get('ul')
    cy.get('doc-facet-testing').get('sq-facet-card[ng-reflect-title="Normalized Entities"]').get('ul')
  })
})