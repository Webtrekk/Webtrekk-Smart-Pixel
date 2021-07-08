// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('smartIntercept', () => {
    cy.intercept('GET', '**/123123123123123/wt?**').as('trackRequest');
});

Cypress.Commands.add('requestsCountByUrl', url =>
    cy.wrap().then(() => {
        const requests = cy.state('requests') || [];
        console.log("A", requests);
        return requests.filter(req => req.xhr.url === url).length;
    })
);
