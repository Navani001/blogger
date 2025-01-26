describe('visit the crested blog', () => {
  
    it('visiting', () => {
      const word=Math.random().toString(36).substring(7)
       cy.Publish(word)
      
      cy.visit('http://localhost:3000/blogs/'+word)


 
      cy.get('[data-test-id="Comment-field"]').type('text')
      cy.contains('Post').click()
        cy.get('Like').click()
  })
})