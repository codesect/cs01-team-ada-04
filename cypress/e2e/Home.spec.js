describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows a randomly generated password on page load', () => {
    cy.get('input[name="generatedPassword"]')
      .should('be.visible')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'readonly', 'readonly');

    cy.get('input[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 20);
  });

  it('generates a new password on button click', () => {
    cy.get('input[name="generatedPassword"]')
      .invoke('val')
      .then($val => {
        cy.get('button').click();
        cy.get('input[name="generatedPassword"]')
          .invoke('val')
          .should('not.eq', $val);
      });
  });
});
