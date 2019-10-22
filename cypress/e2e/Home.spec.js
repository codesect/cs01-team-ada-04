describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows a randomly generated password on page load', () => {
    cy.get('[name="generatedPassword"]')
      .should('be.visible')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'readonly', 'readonly');

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 20);
  });

  it('generates a new password on button click', () => {
    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .then($val => {
        cy.get('button:first-child()').click();
        cy.get('[name="generatedPassword"]')
          .invoke('val')
          .should('not.eq', $val);
      });
  });

  it.skip('copies the password to clipboard', async () => {
    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .then($val => {
        cy.get('button[aria-label="Copy password to clipboard"]').click();
        cy.get('[name="generatedPassword"]')
          .invoke('val')
          .should('eq', $val);

        cy.log(
          'Clipboard content is not available in Cypress yet...',
          navigator.clipboard.readText(),
        );
      });
  });
});
