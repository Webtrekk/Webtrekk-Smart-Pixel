// / <reference types="cypress" />
import {parseTrackrequest} from '../../support';

context('Vue2 complete order process', () => {
    beforeEach(() => {
        cy.smartIntercept();
        Cypress.Cookies.preserveOnce('mapp_e2e_cart', 'mapp_e2e_token');
    });

    it('login', () => {
        cy.clearCookie('mapp_e2e_cart'); // get new cart
        const trackData = [];
        cy.visit('/apps/vue2/login');
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#login input[name="name"]').type('Mapp');
        cy.get('#login input[name="password"]').type('meh');
        cy.get('#login button[type="submit"]').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.contains('Your username is: Mapp').should('be.visible').then(() => {
            const pageRequest = trackData[0];
            const loginEvent = trackData[1];
            const followPage = trackData[2];

            expect(pageRequest.eid).to.match(/^\d{19}$/);
            expect(pageRequest.p[1]).to.match(/.*apps\/vue2\/login$/);
            expect(pageRequest.pageName).to.match(/.*apps\/vue2\/login$/);
            expect(pageRequest.pu).to.match(/.*apps\/vue2\/login$/);
            expect(pageRequest.fns).to.equal('1');
            expect(pageRequest.one).to.equal('1');
            expect(pageRequest.cp1).to.equal('Login');

            expect(loginEvent.eid).to.match(/^\d{19}$/);
            expect(loginEvent.p[1]).to.match(/.*apps\/vue2\/login$/);
            expect(loginEvent.pageName).to.match(/.*apps\/vue2\/login$/);
            expect(loginEvent.pu).to.match(/.*apps\/vue2\/login$/);
            expect(loginEvent.ct).to.equal('Login');
            expect(loginEvent.cd).to.equal('Mapp');

            expect(followPage.eid).to.match(/^\d{19}$/);
            expect(followPage.p[1]).to.match(/.*apps\/vue2\/account$/);
            expect(followPage.pageName).to.match(/.*apps\/vue2\/account$/);
            expect(followPage.pu).to.match(/.*apps\/vue2\/account$/);
            expect(followPage.cp1).to.equal('Account');
        });
    });

    it('account', () => {
        const trackData = [];
        cy.visit('/apps/vue2/account');
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.contains('Your username is: Mapp').should('be.visible').then(() => {
            const pageRequest = trackData[0];
            expect(pageRequest.eid).to.match(/^\d{19}$/);
            expect(pageRequest.p[1]).to.match(/.*apps\/vue2\/account$/);
            expect(pageRequest.pageName).to.match(/.*apps\/vue2\/account$/);
            expect(pageRequest.pu).to.match(/.*apps\/vue2\/account$/);
            expect(pageRequest.fns).to.equal('1');
            expect(pageRequest.one).to.equal('1');
            expect(pageRequest.cp1).to.equal('Account');
        });
    });

    it('shop list and add', () => {
        const trackData = [];
        cy.visit('/apps/vue2/shop');
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#product_1 button').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#product_2 button').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#product_2 button').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        }).then(() => {
            const pageRequest = trackData[0];
            const productList = trackData[1];
            const product1add = trackData[2];
            const product2add1 = trackData[3];
            const product2add2 = trackData[3];

            expect(pageRequest.eid).to.match(/^\d{19}$/);
            expect(pageRequest.p[1]).to.match(/.*apps\/vue2\/shop$/);
            expect(pageRequest.pageName).to.match(/.*apps\/vue2\/shop$/);
            expect(pageRequest.pu).to.match(/.*apps\/vue2\/shop$/);
            expect(pageRequest.fns).to.equal('1');
            expect(pageRequest.one).to.equal('1');

            expect(productList.eid).to.match(/^\d{19}$/);
            expect(productList.p[1]).to.match(/.*apps\/vue2\/shop$/);
            expect(productList.pageName).to.match(/.*apps\/vue2\/shop$/);
            expect(productList.pu).to.match(/.*apps\/vue2\/shop$/);
            expect(productList.ba).to.equal('1;2;3;4;5');
            expect(productList.cb760).to.equal('0;0;0;0;0');
            expect(productList.co).to.equal('129.99;99.99;79.99;169.99;99.99');
            expect(productList.ct).to.equal('webtrekk_ignore');
            expect(productList.plp).to.equal('1;2;3;4;5');
            expect(productList.qn).to.equal('1;1;1;1;1');
            expect(productList.st).to.equal('list');

            expect(product1add.eid).to.match(/^\d{19}$/);
            expect(product1add.p[1]).to.match(/.*apps\/vue2\/shop$/);
            expect(product1add.pageName).to.match(/.*apps\/vue2\/shop$/);
            expect(product1add.pu).to.match(/.*apps\/vue2\/shop$/);
            expect(product1add.ba).to.equal('1');
            expect(product1add.cb760).to.equal('0');
            expect(product1add.co).to.equal('129.99');
            expect(product1add.ct).to.equal('webtrekk_ignore');
            expect(product1add.qn).to.equal('1');
            expect(product1add.st).to.equal('add');

            expect(product2add1.eid).to.match(/^\d{19}$/);
            expect(product2add1.p[1]).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add1.pageName).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add1.pu).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add1.ba).to.equal('2');
            expect(product2add1.cb760).to.equal('0');
            expect(product2add1.co).to.equal('99.99');
            expect(product2add1.ct).to.equal('webtrekk_ignore');
            expect(product2add1.qn).to.equal('1');
            expect(product2add1.st).to.equal('add');

            expect(product2add2.eid).to.match(/^\d{19}$/);
            expect(product2add2.p[1]).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add2.pageName).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add2.pu).to.match(/.*apps\/vue2\/shop$/);
            expect(product2add2.ba).to.equal('2');
            expect(product2add2.cb760).to.equal('0');
            expect(product2add2.co).to.equal('99.99');
            expect(product2add2.ct).to.equal('webtrekk_ignore');
            expect(product2add2.qn).to.equal('1');
            expect(product2add2.st).to.equal('add');
        });
    });

    it('Single product multi add', () => {
        const trackData = [];
        cy.visit('/apps/vue2/shop/6');
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('input[name="quantity"').clear().type('5');
        cy.get('button').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
            const pageView = trackData[0];
            const productAdd = trackData[1];

            expect(pageView.eid).to.match(/^\d{19}$/);
            expect(pageView.p[1]).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(pageView.pageName).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(pageView.pu).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(pageView.ba).to.equal('6');
            expect(pageView.cb760).to.equal('0');
            expect(pageView.co).to.equal('49.99');
            expect(pageView.qn).to.equal('1');
            expect(pageView.st).to.equal('view');
            expect(pageView.cp1).to.equal('Single Product');

            expect(productAdd.eid).to.match(/^\d{19}$/);
            expect(productAdd.p[1]).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(productAdd.pageName).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(productAdd.pu).to.match(/.*apps\/vue2\/shop\/6$/);
            expect(productAdd.ba).to.equal('6');
            expect(productAdd.cb760).to.equal('0');
            expect(productAdd.co).to.equal('249.95');
            expect(productAdd.ct).to.equal('webtrekk_ignore');
            expect(productAdd.qn).to.equal('5');
            expect(productAdd.st).to.equal('add');
        });
    });

    it('Add order', () => {
        const trackData = [];
        cy.visit('/apps/vue2/');
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#openCart').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.get('#addOrder').click();
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
        });
        cy.wait('@trackRequest').then(inception => {
            trackData.push(parseTrackrequest(inception));
            const pageView = trackData[0];
            const openCartEvent = trackData[1];
            const orderRequest = trackData[2];
            const closeCartEvent = trackData[3];

            expect(pageView.eid).to.match(/^\d{19}$/);
            expect(pageView.p[1]).to.match(/.*apps\/vue2\/$/);
            expect(pageView.pageName).to.match(/.*apps\/vue2\/$/);
            expect(pageView.pu).to.match(/.*apps\/vue2\/$/);
            expect(pageView.cp1).to.equal('Homepage');
            expect(pageView.cp2).to.equal('Child');

            expect(openCartEvent.eid).to.match(/^\d{19}$/);
            expect(openCartEvent.p[1]).to.match(/.*apps\/vue2\/$/);
            expect(openCartEvent.pageName).to.match(/.*apps\/vue2\/$/);
            expect(openCartEvent.pu).to.match(/.*apps\/vue2\/$/);
            expect(openCartEvent.ct).to.equal('Open cart');

            expect(orderRequest.eid).to.match(/^\d{19}$/);
            expect(orderRequest.p[1]).to.equal('Thank you');
            expect(orderRequest.pageName).to.equal('Thank you');
            expect(orderRequest.pu).to.match(/.*apps\/vue2\/$/);
            expect(orderRequest.ba).to.equal('6;2;1');
            expect(orderRequest.cb760).to.equal('0;0;0');
            expect(orderRequest.cd).to.equal('Mapp');
            expect(orderRequest.co).to.equal('249.95;199.98;129.99');
            expect(orderRequest.oi).to.match(/\d+/);
            expect(orderRequest.ov).to.equal('579.92');
            expect(orderRequest.qn).to.equal('5;2;1');
            expect(orderRequest.st).to.equal('conf');

            expect(closeCartEvent.eid).to.match(/^\d{19}$/);
            expect(closeCartEvent.p[1]).to.match(/.*apps\/vue2\/$/);
            expect(closeCartEvent.pageName).to.match(/.*apps\/vue2\/$/);
            expect(closeCartEvent.pu).to.match(/.*apps\/vue2\/$/);
            expect(closeCartEvent.ct).to.equal('Close cart');
        });
    });
});
