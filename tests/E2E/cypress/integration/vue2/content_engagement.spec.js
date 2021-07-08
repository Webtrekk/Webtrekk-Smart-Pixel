/// <reference types="cypress" />
import {parseTrackrequest} from '../../support';

context('Vue2 Content Engagement', () => {
    beforeEach(() => {
        cy.smartIntercept();
    });

    it('content engagement scroll and view', () => {
        cy.visit('/apps/vue2/content-engagement');
        const trackData = [];
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
            cy.scrollTo('bottom');
        });
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
            cy.scrollTo('bottom');
            const pageview = trackData[0];
            const contentEngagement0 = trackData[1];
            const contentEngagement25 = trackData[2];

            // Pageview
            expect(pageview.eid).to.match(/^\d{19}$/);
            expect(pageview.p[1]).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(pageview.pageName).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(pageview.pu).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(pageview.fns).to.equal('1');
            expect(pageview.one).to.equal('1');

            // Content Engagement 0%
            expect(contentEngagement0.eid).to.match(/^\d{19}$/);
            expect(contentEngagement0.p[1]).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement0.pageName).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement0.pu).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement0.ck921).to.equal('Demo content');
            expect(contentEngagement0.ck922).to.equal('0');
            expect(contentEngagement0.ck923).to.equal('0');

            // Content Engagement 25%
            expect(contentEngagement25.eid).to.match(/^\d{19}$/);
            expect(contentEngagement25.p[1]).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement25.pageName).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement25.pu).to.match(/.*apps\/vue2\/content-engagement$/);
            expect(contentEngagement25.ck921).to.equal('Demo content');
            expect(contentEngagement25.ck922).to.equal('25');
            expect(contentEngagement25.ck923).to.equal('25');
        });
    });
});
