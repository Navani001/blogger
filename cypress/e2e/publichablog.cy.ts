


describe('Public a blog', () => {
  it('write a blog', () => {
   cy.Publish(Math.random().toString(36).substring(7))

  })
})