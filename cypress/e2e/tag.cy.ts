describe('Tag visiting', () => {
  it('vidintig trending tags', () => {
     cy.Login()
     cy.contains('anime').click()
     cy.get('hi').click()


  })
})