describe("Validate Cypress Clears Cookie and Alias", () => {
  it("Set Cookie and Alias", () => {
    cy.getCookie("oo_inv_reprompt");
    cy.setCookie("oo_inv_reprompt", "1");
    cy.getCookie("oo_inv_reprompt");
    cy.wrap("2").as("two");
    cy.get<string>("@two").then((value) => {
      cy.log(value);
    });
  });

  it("Get Cookie and Alias", () => {
    cy.getCookie("oo_inv_reprompt");
    cy.get<string>("@two").then((value) => {
      cy.log(value);
    });
  });
});
