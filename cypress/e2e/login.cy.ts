describe('Login test', () => {
    beforeEach(() => {
   cy.visit('https://bloggingai.vercel.app')
  })
  it('Should Login', () => {
    cy.visit('https://bloggingai.vercel.app')
    cy.get('[type="text"]').type("raj@bitsathy.ac.in")
    cy.get('[type="password"]').type('123')
    cy.get(':nth-child(9) > .MuiButtonBase-root').click()
  })
   it('Should not Login', () => {
    cy.visit('https://bloggingai.vercel.app')
    cy.get('[type="text"]').type("raj@btsathy.ac.in")
    cy.get('[type="password"]').type('123')
    cy.get(':nth-child(9) > .MuiButtonBase-root').click()
  })
})