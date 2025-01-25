describe("Assertions", () => {
  before(() => {
    cy.visit("/medicare");
  });

  context("Implicit assertions - should, and", () => {
    it("Check a given element has expected text", () => {
      cy.get("h1").should("have.text", "Cigna Medicare Plans");
    });

    it("Withing an given element, check if paragraph has valid css value and matches value using regular expression", () => {
      cy.get("cipublic-sticky-banner")
        .should("be.visible")
        .within(() => {
          cy.get("p")
            .should("have.css", "display") // yields 'block'
            .and("match", /block/); // yields 'block'
        });
    });

    it("Assert an attribute and then check if its visible", () => {
      cy.get("cipublic-link")
        .contains("Medicare 101")
        .should(
          "have.attr",
          "href",
          "/knowledge-center/index.html#understandingmedicare"
        )
        .then(($button) => {
          cy.wrap($button).invoke("removeAttr", "target").should("be.visible"); // Removing target attribute to force load in same page
        });
    });

    it("Check if an element does not have a given value", () => {
      cy.get(".micro-text").should("not.have.value", "Connecticut");
    });

    it("Check if atleast two public links are displayed in a page", () => {
      cy.get("cipublic-link").should("have.length.at.least", 2);
    });

    it("Click on a link and verify newly loaded page url", () => {
      cy.get("cipublic-link").contains("Medicare 101").click();
      cy.url().should(
        "eq",
        `${Cypress.config().baseUrl}/knowledge-center/#understandingmedicare`
      );
    });
  });

  context("Explicit Assertions: Chai expect jQuery examples", () => {
    it("Verify length", () => {
      // Verify public links
      cy.get("cipublic-link").should(($links) => {
        // return an array of texts from all of the links
        const texts = $links.map((i, el) => Cypress.$(el).text());
        // jquery map returns jquery object and .get() convert this to simple array
        const linkDetails = texts.get();
        // array should have length above 10
        expect(linkDetails).to.have.length.above(10);
      });
    });

    it("Link to be visible", () => {
      cy.get("cipublic-link").should(($links) => {
        expect($links).to.be.visible;
      });
    });

    it("Check for a property", () => {
      cy.get("cipublic-link").should(($links) => {
        expect($links).to.have.prop("variant", "primary");
      });
    });

    it("Element not to have text", () => {
      cy.get("cipublic-link").should(($links) => {
        expect($links).to.not.have.text("Testing");
      });
    });
  });

  context("Explicit Assertions: Chai expect bdd/tdd examples", () => {
    it("Boolean check", () => {
      expect(true, "it is true").to.be.true;
    });

    it("Deep equals check to compare properties inside object", () => {
      const o = { foo: "bar" };
      expect(o, "deep equality").to.deep.equal({ foo: "bar" });
    });

    it("Regular expression match", () => {
      expect("Health and Wellness").to.match(/wellness$/i);
    });

    it("Check to be a string and has some characters", () => {
      expect("4AB001C", "org id").to.be.a("string").and.not.be.empty;
    });

    it("Response code to be within range check", () => {
      expect(204, "status code").to.be.within(200, 399);
    });

    it("Given string is part of a string array", () => {
      expect("Medical").to.be.oneOf(["Medical", "Dental", "Pharmacy"]);
    });

    it("Generic predicate function check using the satisfy assertion", () => {
      expect("Health").to.satisfy(
        (s) => typeof s === "string" && s.length === 6
      );
    });
  });

  context("Explicit Assertions: assert examples", () => {
    it("Check for type - object", () => {
      const Coverage = {
        type: "Medical",
        code: "MED",
      };
      assert.isObject(Coverage, "value is object");
    });

    it("Check if value is undefined", () => {
      assert.isUndefined(undefined, "val is undefined");
    });

    it("Check if value x greater than y", () => {
      assert.isAbove(6, 1, "6 greater than 1");
    });

    it("Check x equals y", () => {
      assert.equal(3, 3, "vals equal");
    });

    it("Check deep equals", () => {
      assert.deepEqual({ id: "1" }, { id: "1" });
    });
  });
});
