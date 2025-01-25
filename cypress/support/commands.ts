/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        searchForPlans(zipCode: string): void;
    }
}

Cypress.Commands.add("searchForPlans", (zipCode: string) => {
    searchForPlans(zipCode);
})

function searchForPlans(zipCode: string) {
    cy.setCookie("oo_inv_reprompt", "1");
    cy.visit("https://www.cigna.com/medicare/");
    cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input').shadow().find('input').type(zipCode);
    cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input cipublic-button').shadow().find('button').click();
}