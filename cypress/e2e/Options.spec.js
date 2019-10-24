describe('Password customisation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays only lowercase letters if the only option ticked is lowercase letters', () => {
    cy.get('label')
      .eq(1)
      .click();

    cy.get('input[type="checkbox"]')
      .should('have.length', 4)
      .each(($el, i) => {
        if (i === 0) {
          // eslint-disable-next-line no-unused-expressions
          expect($el).to.be.checked;
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        expect($el).to.not.be.checked;
      });

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 24)
      .then(val => {
        expect(val).to.match(/[a-z]/g);
      });
  });

  it('displays only uppercase letters if the only option ticked is uppercase letters', () => {
    cy.get('label')
      .eq(0)
      .click();

    cy.get('input[type="checkbox"]')
      .should('have.length', 4)
      .each(($el, i) => {
        if (i === 1) {
          // eslint-disable-next-line no-unused-expressions
          expect($el).to.be.checked;
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        expect($el).to.not.be.checked;
      });

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 24)
      .then(val => {
        expect(val).to.match(/[A-Z]/g);
      });
  });

  it('displays only numbers if the only option ticked is numbers', () => {
    cy.get('label')
      .first()
      .click()
      .next()
      .click()
      .next()
      .click();

    cy.get('input[type="checkbox"]')
      .should('have.length', 4)
      .each(($el, i) => {
        if (i === 2) {
          // eslint-disable-next-line no-unused-expressions
          expect($el).to.be.checked;
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        expect($el).to.not.be.checked;
      });

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 24)
      .then(val => {
        expect(val).to.match(/[0-9]/g);
      });
  });

  it('displays only symbols if the only option ticked is symbols', () => {
    cy.get('label')
      .first()
      .click()
      .next()
      .click()
      .next()
      .next()
      .click();

    cy.get('input[type="checkbox"]')
      .should('have.length', 4)
      .each(($el, i) => {
        if (i === 3) {
          // eslint-disable-next-line no-unused-expressions
          expect($el).to.be.checked;
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        expect($el).to.not.be.checked;
      });

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 24)
      .then(val => {
        expect(val).to.match(/[^a-zA-Z0-9]/g);
      });
  });

  it('displays no password if there is no option selected', () => {
    cy.get('label')
      .first()
      .click()
      .next()
      .click();

    cy.get('input[type="checkbox"]')
      .should('have.length', 4)
      .each(($el, i) => {
        // eslint-disable-next-line no-unused-expressions
        expect($el).to.not.be.checked;
      });

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 0);
  });

  it('changes password length if length option is changed', () => {
    cy.get('label:last-child()').click();
    cy.focused()
      .type('{rightarrow}')
      .type('{backspace}');

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', 4);
  });
});
