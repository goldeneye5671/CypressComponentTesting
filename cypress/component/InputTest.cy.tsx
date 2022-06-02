/// <reference types="cypress"/>

import InputTest from "../../src/components/InputTest"


const inputComponent = "[data-testid='InputTest']";
const finalInputLabel = "[data-testid='final-value-input-label']";
const finalInput = "[data-testid='final-value-input']";
const showFinalValueBtn = "[data-testid='show-final-value-button']";
const hideFinalValueBtn = "[data-testid='hide-final-value-button']";
const finalValueDisplay = "[data-testid='final-value-display']";


describe('InputTest.cy.tsx', () => {
    it ("Should mount successfully", () => {
        cy.mount(<InputTest initial={""} />);
        cy.get(inputComponent).should("exist")
    })

    it ("Should display the correct value if rendered with a value in the initial prop", () => {
        cy.mount(<InputTest initial={"Test Value"} />);
        cy.get(finalInput).invoke('attr', 'value').should("deep.equal", "Test Value")
    })

    it ("Should not display the input text by default", () => {
        cy.mount(<InputTest initial={"Test Value"} />);
        cy.get(finalValueDisplay).should("not.exist")
    })

    it ("Should display the input text when the show button is clicked, and hide when the hide button is clicked", () => {
        cy.mount(<InputTest initial={"A Test Value"} />);
        cy.get(showFinalValueBtn).click()
        cy.get(finalValueDisplay).should("exist").should("contain.text", "A Test Value");
        cy.get(hideFinalValueBtn).click()
        cy.get(finalValueDisplay).should("not.exist")
    });

    it ("Should be able to be typed in", () => {
        cy.mount(<InputTest initial={""} />);
        cy.get(finalInput).type("Hello World!!");
        cy.get(finalInput).invoke("attr", "value").should("deep.equal", "Hello World!!");
    });

    it ("Should display the value typed in when clicking the show button and should change when typing in more text", () => {
        cy.mount(<InputTest initial={""} />);
        cy.get(finalInput).type("Hello");
        cy.get(finalInput).invoke("attr", "value").should("deep.equal", "Hello");
        cy.get(showFinalValueBtn).click();
        cy.get(finalValueDisplay).should("contain.text", "Hello")
        cy.get(finalInput).type(" World!!", {delay: 100});
        cy.get(finalInput).invoke("attr", "value").should("deep.equal", "Hello World!!");
        cy.get(finalValueDisplay).should("contain.text", "Hello World!!")
    })
})
