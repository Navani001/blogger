describe("Validate Command Retries for Cypress", () => {
  beforeEach(() => {
    cy.visit("/medicare");
  });

  it("Validate Command Keeps Retrying for default Timeout", () => {
    cy.visit("https://plans.cigna.com/?zip=78724&fip=48453&PlanType=MAPD#pdp");
     cy.get("cipublic-sticky-banner h4").should(
      "have.text",
      "Shop and compare plans"
    ); 
  });

  it("Validate Command Keeps Retrying for Custom Timeout", () => {
    cy.get("cipublic-sticky-banner h4", {
      timeout: 8000,
    }).should("have.text", "Shop and compare plans");
  });

  it("Disable Command Timeout", () => {
    cy.get("cipublic-sticky-banner h4", {
      timeout: 0,
    }).should("have.text", "Shop and compare plans");
  });

  it("Test Passes with ", () => {
    cy.get("cipublic-sticky-banner h4", {
      timeout: 0,
    }).should("have.text", "Shop and compare plans now");
  });
});
