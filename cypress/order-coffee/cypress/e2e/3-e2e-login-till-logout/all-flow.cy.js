/// <reference types="cypress" />

describe('After login, user can do add menu, checkout, and logout', () => {
  beforeEach(() => {
    cy.signIn()
      .then(() => {
        cy.addMenu()
      })
      .then(() => {
        cy.get('[data-cy="btn-checkout"]')
          .click()
          .then(() => {
            cy.get('[data-cy="alert-message"]').contains('Items Purchased')
          })
      })
  })

  it('it will show button login when logout button clicked', () => {
    cy.get('[data-cy="btn-logout"]')
      .wait(1000)
      .click()
      .then(() => {
        cy.get('[data-cy="btn-login"]').contains('Login')
        cy.get('[data-cy="btn-logout"]').should('not.exist')
      })
  })
})
