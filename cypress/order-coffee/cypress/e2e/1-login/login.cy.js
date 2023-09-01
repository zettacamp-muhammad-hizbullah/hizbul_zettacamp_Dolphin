/// <reference types="cypress" />

describe('login flow when input fields are empty', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('display login form with input name, input password and button login to submit, and text login', () => {
    cy.get('[data-cy="text-title-login"]')
      .contains('Login')
      .should('have.length', 1)
      .should('have.text', 'Login')
  })

  it('submit button login visible after submit when password and name field are empty', () => {
    cy.get('[data-cy="btn-login"]')
      .click()
      .then(($btn) => {
        cy.get($btn).contains('Login')
      })
  })
})

describe('login flow when input fields are filled', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('display login form with input name, input password and button login to submit, and text login', () => {
    cy.get('[data-cy="text-title-login"]')
      .contains('Login')
      .should('have.length', 1)
      .should('have.text', 'Login')
  })

  it('type input in name input', () => {
    const typedName = 'Muhammad Hizbullah'
    cy.get('[data-cy="input-name"]')
      .type(typedName)
      .should('have.value', typedName)
  })

  it('type input in password input', () => {
    const typedPassword = 'p4$$w0rd'
    cy.get('[data-cy="input-password"]')
      .type(typedPassword)
      .should('have.value', typedPassword)
  })

  it('submit button login when password and name field are filled', () => {
    cy.signIn()
  })
})
