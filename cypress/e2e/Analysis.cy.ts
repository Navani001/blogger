Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  if (err.message.includes('NEXT_REDIRECT')) {
    return false
  }
  // For other errors, let Cypress handle them normally
})

describe('Analysis', () => {
  it('visting', () => {
    cy.Login()
    cy.get('[data-test-id="Profile"').click()
      cy.contains('Analysis').click()

 cy.get(':nth-child(1) > .MuiTableCell-alignCenter > .MuiButtonBase-root').click()
  })})
