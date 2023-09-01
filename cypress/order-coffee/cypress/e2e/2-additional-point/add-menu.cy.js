/// <reference types="cypress" />

describe('Customer add some items from the menu to the cart', () => {
  beforeEach(() => {
    cy.signIn()
  })

  it('adding latte to cart 1 item, and in cart will be visible there latte with 1 item', () => {
    cy.get('[data-cy="text-menu-item-name"]')
      .first()
      .contains('Latte')
      .then(() => {
        cy.get('[data-cy="btn-add-menu-item-to-cart"]')
          .first()
          .click()
          .then(() => {
            cy.get('[data-cy="text-cart-item-name"]').contains('Latte')
            cy.get('[data-cy="input-cart-item-amount"]').should('have.value', 1)
          })
      })
  })

  it('adding Cappucino to cart 2 item, and in cart will be visible there latte with 2 item', () => {
    cy.get('[data-cy="text-menu-item-name"]')
      .eq(1)
      .contains('Cappucino')
      .then(() => {
        cy.get('[data-cy="btn-add-menu-item-to-cart"]')
          .eq(1)
          .click()
          .then(() => {
            cy.get('[data-cy="text-cart-item-name"]').contains('Cappucino')
            cy.get('[data-cy="input-cart-item-amount"]').should('have.value', 1)
          })
      })
      .then(() => {
        cy.get('[data-cy="btn-add-menu-item-to-cart"]')
          .eq(1)
          .click()
          .then(() => {
            cy.get('[data-cy="text-cart-item-name"]').contains('Cappucino')
            cy.get('[data-cy="input-cart-item-amount"]').should('have.value', 2)
          })
      })
  })

  it('adding Latte & Cappucino to cart 1 & 2 item, and in cart will be visible there latte with 1 item & cappucino 2 items', () => {
    cy.addMenu()
  })
})
