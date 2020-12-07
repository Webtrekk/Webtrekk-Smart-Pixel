/// <reference types="cypress" />

context('Vue', () => {
    beforeEach(() => {
        cy.smartVisit('localhost:8080', {});
    });

    // https://on.cypress.io/interacting-with-elements

    it('pagerequest', () => {
        cy.window().then(win => {
            console.log('win', win.trackRequests);
        });
    });
});
