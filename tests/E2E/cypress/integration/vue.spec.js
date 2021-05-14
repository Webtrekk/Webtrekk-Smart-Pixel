/// <reference types="cypress" />
import {parseTrackrequest} from '../support';

context('Vue', () => {
    beforeEach(() => {
        cy.smartIntercept();
    });

    it('pagerequest', () => {
        cy.visit('http://localhost:4000/apps/vue3/');
        let trackData;
        cy.wait('@trackRequest').then(inception => {
            trackData = parseTrackrequest(inception);
            console.log(trackData);
        });
    });
});
