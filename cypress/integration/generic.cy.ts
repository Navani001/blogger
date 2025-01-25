describe('generic test suite', () => {
    it('expect unexpected results when both sync and async code exists', () => {
        console.log('Hello');
        cy.wrap('').then(() => {
            console.log('Welcome to CTC');
        })
        console.log('Thanks for coming to see us');
        cy.wrap('').then(() => {
            console.log('Good bye.. see you later');
        })
    })

    it('wrap sync statements to expect correct results when both sync and async code exists', () => {
        cy.wrap('').then(() => {
            console.log('Hello');
        })

        cy.wrap('').then(() => {
            console.log('Welcome to CTC');
        })

        cy.wrap('').then(() => {
            console.log('Thanks for coming to see us');
        })
        
        cy.wrap('').then(() => {
            console.log('Good bye.. see you later');
        })
    })
})