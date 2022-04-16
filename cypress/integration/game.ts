beforeEach(() => {
  cy.intercept('GET', 'https://gist.githubusercontent.com/**/*', {
    fixture: 'word-api-response.json',
  });
  cy.visit('/game');
});

it('should have toolbar with return buttton', () => {
  cy.get('mat-toolbar[color="primary"] button[mat-icon-button]').contains(
    'Return'
  );
});

it('should have chars', () => {
  cy.get('app-char').should('have.length', 6);
});

it('should guess a char', () => {
  cy.get('mat-chip').should('not.exist');
  cy.get('app-error-count-display').contains('0 / 7 errors');
  cy.get('mat-card:nth-of-type(2) button').should('be.disabled');

  cy.get('input').type('v');
  cy.get('mat-card:nth-of-type(2) button').should('not.be.disabled');

  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('mat-card:nth-of-type(2) button').should('be.disabled');

  cy.get('mat-chip').contains('v');
  cy.get('app-char span').first().contains('v');
  cy.get('app-error-count-display').contains('0 / 7 errors');
});

it('should win', () => {
  cy.get('input').type('values');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}game/win`);
});

it('should loose', () => {
  cy.get('input').type('x');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('1 / 7 errors');

  cy.get('input').type('y');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('2 / 7 errors');

  cy.get('input').type('z');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('3 / 7 errors');

  cy.get('input').type('w');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('4 / 7 errors');

  cy.get('input').type('h');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('5 / 7 errors');

  cy.get('input').type('b');
  cy.get('mat-card:nth-of-type(2) button').click();
  cy.get('app-error-count-display').contains('6 / 7 errors');

  cy.get('input').type('d');
  cy.get('mat-card:nth-of-type(2) button').click();

  cy.url().should('eq', `${Cypress.config().baseUrl}game/over`);
});
