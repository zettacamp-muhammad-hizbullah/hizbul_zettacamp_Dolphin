/// <reference types="cypress" />

describe('After login, user can do logout', () => {
  beforeEach(() => {
    cy.signIn()
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
