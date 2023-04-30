beforeEach(() => {
  cy.visit('/');
  cy.intercept('GET', 'https://gist.githubusercontent.com/**/*', {
    fixture: 'word-api-response.json',
  });
});

it('should have title', () => {
  cy.get('h1').contains('Awesome Hangman');
});

it('should have start button', () => {
  const button = 'button[mat-raised-button][color="primary"]';
  cy.get(button).contains('Start').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}game`);
});
