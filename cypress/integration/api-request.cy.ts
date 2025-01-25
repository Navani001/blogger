describe('api test suite', () => {

    let sessionReqSpec: Partial<Cypress.RequestOptions>;
    let fipFinderReqSpec: Partial<Cypress.RequestOptions>;
    let planSearchReqSpec: Partial<Cypress.RequestOptions>;

    before(() => {
        
        const baseUrl = 'https://p-gsg.digitaledge.cigna.com/igse/connecturedrx2';

        sessionReqSpec = {
            url: baseUrl,
            method: 'GET',
            failOnStatusCode: false,
            qs: {
                action: 'session-create'
            }
        }
        
        fipFinderReqSpec = {
            url: baseUrl,
            method: 'GET',
            failOnStatusCode: false,
            qs: {
                action: 'fip-finder',
                zip: 63043
            }
        }

        planSearchReqSpec = {
            url: baseUrl,
            method: 'POST',
            failOnStatusCode: false,
            qs: {
                action: 'plan-compare-search',
                zip: 63043,
                year: 2022,
                planType: 7
            }
        }
    })

    it('simple api request call', () => {
        cy.request(fipFinderReqSpec).then(apiResponse => {
            console.log(apiResponse);
            expect(apiResponse.status).to.be.eq(200);
            expect(apiResponse.statusText).to.be.eq('OK');
        })
    })

    it('nested api request call', () => {
        
        cy.request(fipFinderReqSpec).then(fipResponse => {
            cy.log(fipResponse.body);
            expect(fipResponse.status).to.be.eq(200);
            
            cy.request(sessionReqSpec).then(sessionResponse => {
                cy.log(sessionResponse.body);
                expect(fipResponse.status).to.be.eq(200);

                planSearchReqSpec.qs['fips'] = fipResponse.body[0].CountyFIPS;
                planSearchReqSpec.qs['sessionID'] = sessionResponse.body[0].SessionID;

                cy.request(planSearchReqSpec).then(planSearchResponse => {
                    cy.log(planSearchResponse.body);
                    expect(planSearchResponse.status).to.be.eq(200);
                    expect(planSearchResponse.body.MedicarePlans).to.have.length.greaterThan(0);
                })
            })

        })
        
    })
})