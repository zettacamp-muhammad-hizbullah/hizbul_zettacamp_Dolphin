/// <reference types="cypress" />
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare namespace Cypress {
  interface Chainable {
    signIn(): Chainable<void>
    addMenu(): Chainable<void>
  }
}

Cypress.Commands.add('signIn', () => {
  cy.visit('http://localhost:4200')
  const typedName = 'Muhammad Hizbullah'
  cy.get('[data-cy="input-name"]')
    .type(typedName)
    .should('have.value', typedName)

  const typedPassword = 'p4$$w0rd'
  cy.get('[data-cy="input-password"]')
    .type(typedPassword)
    .should('have.value', typedPassword)

  cy.get('[data-cy="btn-login"]')
    .click()
    .then(() => {
      cy.get('[data-cy="text-navbar-header"]').contains('Order Coffee')
      cy.get('[data-cy="btn-login"]').should('not.exist')
    })
})

Cypress.Commands.add('addMenu', () => {
  cy.get('[data-cy="text-menu-item-name"]')
    .first()
    .contains('Latte')
    .then(() => {
      cy.get('[data-cy="btn-add-menu-item-to-cart"]')
        .first()
        .click()
        .then(() => {
          cy.get('[data-cy="text-cart-item-name"]').first().contains('Latte')
          cy.get('[data-cy="input-cart-item-amount"]')
            .first()
            .should('have.value', 1)
        })
    })

  cy.get('[data-cy="text-menu-item-name"]')
    .eq(1)
    .contains('Cappucino')
    .then(() => {
      cy.get('[data-cy="btn-add-menu-item-to-cart"]')
        .eq(1)
        .click()
        .then(() => {
          cy.get('[data-cy="text-cart-item-name"]').eq(1).contains('Cappucino')
          cy.get('[data-cy="input-cart-item-amount"]')
            .eq(1)
            .should('have.value', 1)
        })
    })
    .then(() => {
      cy.get('[data-cy="btn-add-menu-item-to-cart"]')
        .eq(1)
        .click()
        .then(() => {
          cy.get('[data-cy="text-cart-item-name"]').eq(1).contains('Cappucino')
          cy.get('[data-cy="input-cart-item-amount"]')
            .eq(1)
            .should('have.value', 2)
        })
    })
})
