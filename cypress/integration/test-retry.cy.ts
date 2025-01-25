describe("Validate Command Retries for Cypress", () => {
  beforeEach(() => {
    cy.visit("https://cigna.com/medicare");
  });

  it("Validate Retries for all Test", () => {
    cy.get("cipublic-sticky-banner h4").should(
      "have.text",
      "Shop and compare plans"
    );
  });

  it(
    "Validate Retries for specific Test at it level",
    {
      retries: 2,
    },
    () => {
      cy.get("cipublic-sticky-banner h4").should(
        "have.text",
        "Shop and compare plans"
      );
    }
  );
});
