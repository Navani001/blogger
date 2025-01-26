/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        searchForPlans(zipCode: string): void;
        Login():void;
        Publish(url: string): void;
    }
}

Cypress.Commands.add("searchForPlans", (zipCode: string) => {
    searchForPlans(zipCode);
  
})
Cypress.Commands.add("Login", () => {
   
    Login();
})
Cypress.Commands.add("Publish", (url) => {
   
    Publish(url);
})

function searchForPlans(zipCode: string) {
    cy.setCookie("oo_inv_reprompt", "1");
    cy.visit("https://www.cigna.com/medicare/");
    cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input').shadow().find('input').type(zipCode);
    cy.get('ciapp-medicare-plan-finder').shadow().find('cipublic-input cipublic-button').shadow().find('button').click();
}
function Login(){
      cy.visit('http://localhost:3000/login')
    cy.get('[type="text"]').type("raj@bitsathy.ac.in")
    cy.get('[type="password"]').type('123')
    cy.get(':nth-child(9) > .MuiButtonBase-root').click()
}
function Publish(url){
  cy.Login()
   cy.get('.flex > .px-4').click()
   cy.get('.tiptap').type('testing with cypress')
    cy.contains('Publish').click()
    cy.get(':nth-child(1) > .p-2').type("testing")
    cy.get('.flex > .p-2').type(url)
    cy.get('#fixed-tags-demo').type('a')
    cy.get('#fixed-tags-demo-option-0').click()
    cy.get(':nth-child(4) > .p-2').type("testing with cypress")
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()

}