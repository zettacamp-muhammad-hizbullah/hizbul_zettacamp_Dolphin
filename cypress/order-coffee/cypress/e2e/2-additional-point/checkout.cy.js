/// <reference types="cypress" />

describe('Customer add some items from the menu to the cart and checkout it', () => {
  beforeEach(() => {
    cy.signIn().then(() => {
      cy.addMenu()
    })
  })

  it('checkout menu from cart items', () => {
    cy.get('[data-cy="btn-checkout"]')
      .click()
      .then(() => {
        cy.get('[data-cy="alert-message"]').contains('Items Purchased')
      })
  })
})
