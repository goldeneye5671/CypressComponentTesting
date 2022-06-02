/// <reference types="cypress"/>

import Stepper from "../../src/components/Stepper"

const stepperSelector = '[data-testid=stepper]'
const incrementSelector = '[aria-label=increment]'
const decrementSelector = '[aria-label=decrement]'

describe('InputField.cy.ts', () => {
  it('stepper should default to 0', () => {
    cy.mount(<Stepper />);
    cy.get(stepperSelector).should('contain.text', 0);
  });

  it ("Supports an 'initial' prop to set the value", () => {
    cy.mount(<Stepper initial={100}/>);
    cy.get(stepperSelector).should('contain.text', 100);
  });

  it ("Should be able to increase the count value", () => {
    cy.mount(<Stepper />);
    cy.get(incrementSelector).click();
    cy.get(stepperSelector).should('contain.text', 1);
  });

  it("Should be able to decrement the count value", () => {
    cy.mount(<Stepper />);
    cy.get(decrementSelector).click();
    cy.get(stepperSelector).should('contain.text', -1);
  });

  it("Can be incremented or decremented from an initial value at the same time", () => {
    cy.mount(<Stepper initial={25}/>);
    cy.get(incrementSelector).click();
    cy.get(stepperSelector).should("contain.text", 26);
    cy.get(decrementSelector).click();
    cy.get(stepperSelector).should("contain.text", 25);
  });

  it("Fires a change event with the incremented value when clicked", () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<Stepper onChange={onChangeSpy} />)
    cy.get(incrementSelector).click();
    cy.get('@onChangeSpy').should('have.been.called.with', 1)
  })
})