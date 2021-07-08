import '@cypress/code-coverage/support';

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

export function parseTrackrequest(inception) {
    let url = inception.request.url;
    url = url.split('wt?')[1];
    url = Object.fromEntries(new URLSearchParams(url));
    url.p = url.p.split(',');
    url.pageName = url.p[1];
    return url;
}

// eslint-disable-next-line no-unused-vars,handle-callback-err
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
