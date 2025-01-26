describe('contact us', () => {
  it('send', () => {
 cy.Login()
    cy.get('[data-test-id="Profile"').click()
     cy.get('div.flex > .MuiButtonBase-root').click()
     cy.get('#subject').type("testing hk")
     cy.get('#message').type("testing with cypress hk")
     cy.get(':nth-child(4) > .MuiButtonBase-root').click()
  })
})