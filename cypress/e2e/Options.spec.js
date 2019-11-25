/**
 * Helper function to change value of a slider. It sets the value of the DOM
 * node and fires a change event on it.
 *
 * We need this because `onChange` is not triggered with React using a simple
 * `.invoke('val', value).trigger('change');`
 *
 * https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js/46012210#46012210
 */
function setValueAndFireChange(input, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  ).set;

  nativeInputValueSetter.call(input, value);
  input.dispatchEvent(
    new Event('change', {
      value,
      bubbles: true,
    }),
  );
}

describe('Password customisation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
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

  it('changes password length if slider is changed', () => {
    const newLength = 5;

    cy.get('input[type="range"]').then(([rangeInput]) => {
      setValueAndFireChange(rangeInput, newLength);
    });

    cy.get('[name ="generatedPassword"]')
      .invoke('val')
      .should('have.length', newLength);
  });

  it('saves settings to localStorage on change', () => {
    const key = 'settings';
    const newLength = 5;

    expect(localStorage.getItem('settings')).to.eq(null);

    cy.get('label')
      .first()
      .click()
      .next()
      .click()
      .next()
      .click();

    cy.get('input[type="range"]').then(([rangeInput]) => {
      setValueAndFireChange(rangeInput, newLength);
    });

    cy.log(localStorage.getItem(key));

    cy.window().then(win => {
      const actual = win.localStorage.getItem(key);
      expect(actual).to.eq(
        JSON.stringify({
          hasLowercase: false,
          hasNumbers: true,
          hasSymbols: false,
          hasUppercase: false,
          length: newLength,
        }),
      );
    });

    cy.reload(true);

    cy.get('[name="generatedPassword"]')
      .invoke('val')
      .should('have.length', newLength);

    cy.get('input[type="checkbox"]')
      .eq(0)
      .should('not.be.checked');

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should('not.be.checked');

    cy.get('input[type="checkbox"]')
      .eq(2)
      .should('be.checked');

    cy.get('input[type="checkbox"]')
      .eq(3)
      .should('not.be.checked');

    cy.get('input[type="range"]').should('have.value', newLength.toString());
  });
});
