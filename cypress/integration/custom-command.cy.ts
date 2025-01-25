describe('suite for custom command', () =>{
    it('test without custom command', () => {
        cy.setCookie("oo_inv_reprompt", "1");
        cy.visit("https://www.cigna.com/medicare/");
        cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input').shadow().find('input').type('63043');
        cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input cipublic-button').shadow().find('button').click();
    })

    it('test with custom command', () => {
        cy.searchForPlans('63043');
    })
})