// / <reference types="cypress" />
import {parseTrackrequest} from '../../support';

context('Vue2 Directives', () => {
    beforeEach(() => {
        cy.smartIntercept();
    });

    it('test directives', () => {
        cy.visit('/apps/vue2/directive');
        cy.wait(1000);
        cy.get('@trackRequest.all').then((interceptions) => {
            expect(interceptions).to.have.length(0);
        });

        cy.get('#pageDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.cc1).to.equal('Directive campaign test');
            expect(request.cd).to.equal('Directive customer test');
            expect(request.cp1).to.equal('Directive page test');
            expect(request.cs1).to.equal('Directive session test');
            expect(request.fns).to.equal('1');
            expect(request.one).to.equal('1');
        });

        cy.get('#noModifiers').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.cp1).to.equal('no modifiers');
            expect(request.cd).to.equal('no mod customer');
            expect(request.uc709).to.equal('testcity');
        });

        cy.get('#productViewDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('Directive product view test');
            expect(request.co).to.equal('99.9');
            expect(request.qn).to.equal('1');
            expect(request.st).to.equal('view');
        });

        cy.get('#productBasketDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('Directive product basket test');
            expect(request.co).to.equal('99.9');
            expect(request.qn).to.equal('1');
            expect(request.st).to.equal('add');
        });

        cy.get('#productConfirmationDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('Directive product confirmation test');
            expect(request.co).to.equal('99.9');
            expect(request.qn).to.equal('1');
            expect(request.st).to.equal('conf');
        });

        cy.get('#productListDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('Directive product list test');
            expect(request.co).to.equal('99.9');
            expect(request.qn).to.equal('1');
            expect(request.st).to.equal('list');
            expect(request.ct).to.equal('webtrekk_ignore');
        });

        cy.get('#productsDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('product_1;product_2');
            expect(request.co).to.equal('99.9;49.9');
            expect(request.qn).to.equal('9;3');
            expect(request.st).to.equal('add');
            expect(request.cb760).to.equal('0;0');
        });

        cy.get('#productsDirNoStatus').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('product_1;product_2');
            expect(request.co).to.equal('99.9;49.9');
            expect(request.qn).to.equal('9;3');
            expect(request.st).to.equal('view');
            expect(request.cb760).to.equal('0;0');
        });

        cy.get('#actionDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ct).to.equal('Directive action test');
            expect(request.ck1).to.equal('Action parameter');
        });

        cy.get('#teaserDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ck520).to.equal('Main Page Banner');
            expect(request.ck521).to.equal('Directive teaser test');
            expect(request.ck523).to.equal('1');
            expect(request.ck526).to.equal('Women Collection');
            expect(request.ck527).to.equal('campaign');
            expect(request.ct).to.equal('webtrekk_ignore');
        });

        cy.get('#teaserWithSelectorDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ck520).to.equal('Main Page Banner');
            expect(request.ck521).to.equal('Directive teaser with selector test');
            expect(request.ck523).to.equal('1');
            expect(request.ck526).to.equal('Women Collection');
            expect(request.ck527).to.equal('campaign');
            expect(request.ct).to.equal('webtrekk_ignore');
        });

        cy.get('#productListExtensionDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ba).to.equal('Directive productlist extension test');
            expect(request.cb760).to.equal('0');
            expect(request.co).to.equal('49.99');
            expect(request.qn).to.equal('1');
            expect(request.st).to.equal('list');
            expect(request.plp).to.equal('1');
            expect(request.ct).to.equal('webtrekk_ignore');
        });

        cy.get('#contentEngagementDir').click();
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ck921).to.equal('Directive content engagement test');
            expect(request.ck922).to.equal('0');
            expect(request.ck923).to.equal('0');
            expect(request.ct).to.equal('webtrekk_ignore');
        });
        cy.wait('@trackRequest').then(inception => {
            const request = parseTrackrequest(inception);
            expect(request.eid).to.match(/^\d{19}$/);
            expect(request.p[1]).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pageName).to.match(/.*apps\/vue2\/directive$/);
            expect(request.pu).to.match(/.*apps\/vue2\/directive$/);
            expect(request.ck921).to.equal('Directive content engagement test');
            expect(request.ck922).to.equal('100');
            expect(request.ck923).to.equal('100');
            expect(request.ct).to.equal('webtrekk_ignore');
        });
    });
});
