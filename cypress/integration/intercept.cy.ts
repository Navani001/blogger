describe('test suite for network intercepting', () => {

    beforeEach(() => {
        cy.setCookie("oo_inv_reprompt", "1");
        cy.visit("https://www.cigna.com/medicare/");
        cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input').shadow().find('input').type('63043');
    })

    it('test for intercepting an api response', () => {
        
        cy.intercept('**/igse/connecturedrx2?action=plan-compare-search*').as('planCompareSearchResponse');
        cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input cipublic-button').shadow().find('button').click();
        cy.wait('@planCompareSearchResponse');

        cy.get('igse-app').shadow().find('igse-plans-view').shadow().find('cipublic-tabs').as('tabs');
    
        const plansFromUI = [];

        ['Medicare Part D Plans', 'Medicare Advantage Plans'].forEach(tabName => {
            
            cy.get('@tabs').contains(tabName).shadow().find('a').click('top');

            cy.get('@tabs').find("cipublic-tab-section[active='true']").find('ul li').each(el => {
                cy.wrap(el).find('plan-card').shadow().find('cipublic-product-card').find('.plan-heading').eq(0).invoke('text').then(txt => {
                    plansFromUI.push(txt);
                })
            })

        })

        cy.get('@planCompareSearchResponse').its('response').then(planCompareSearchResponse => {            
            const planNames = planCompareSearchResponse.body.MedicarePlans.map(x => x.PlanName);            
            expect(planNames).to.be.deep.eq(plansFromUI);
        })

        
    })

    it('test for stubbing api response', () => {
        
        //stubbed data is stored in a json file and stored in fixtures folder
        cy.intercept('**/igse/connecturedrx2?action=plan-compare-search*', {fixture: 'stubbed-plans.json'}).as('planCompareSearchResponse');
        
        cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input cipublic-button').shadow().find('button').click();
    })

})