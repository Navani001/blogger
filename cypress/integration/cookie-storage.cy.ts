describe("Cookie Storage", () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it("Validate Opinion Lab Pop Up is displayed", () => {
    cy.visit("https://plans.cigna.com/?zip=78724&fip=48453&PlanType=MAPD#pdp");
    cy.get("#oo_invitation_prompt").should("be.visible");
  });

  it("Validate Opinion Lab Pop Up is not displayed", () => {
    cy.setCookie("oo_inv_reprompt", "1");
    cy.visit("https://plans.cigna.com/?zip=78724&fip=48453&PlanType=MAPD#pdp");
    cy.wait(12000); // This wait is just to wait for sometimes to make sure Pop never occured 
    cy.get("#oo_invitation_prompt").should("not.exist");
  });
});
