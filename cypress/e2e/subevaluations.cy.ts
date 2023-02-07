describe('empty spec', () => {
  
})

/* ==== Test Created with Cypress Studio ==== */
it('Subevaluaciones', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/login');
  cy.get('.space-y-6 > :nth-child(1) > .mt-1 > .appearance-none').clear('champlin.andrew@yahoo.com');
  cy.get('.space-y-6 > :nth-child(1) > .mt-1 > .appearance-none').type('champlin.andrew@yahoo.com');
  cy.get('.relative > :nth-child(1) > .mt-1 > .appearance-none').clear('QE2MPLBM');
  cy.get('.relative > :nth-child(1) > .mt-1 > .appearance-none').type('QE2MPLBM');
  cy.get('span').click();
  cy.get('[href="/dashboard/mis-secciones"] > span').click();
  cy.wait(10000)
  cy.get('div > .MuiButtonBase-root').click();
  cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').clear('E');
  cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').type('Eval1');
  cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').clear('2');
  cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').type('23');
  cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').clear('0002-12-12');
  cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').type('2022-12-12');
  cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').clear('2');
  cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').type('23');
  cy.get('.self-end > .inline-flex > span').click();
  cy.wait(10000)
  cy.get('.relative > .flex > .h-5').check();
  cy.get('#__next > :nth-child(1) > :nth-child(1)').click();
  cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').clear();
  cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').type('Subeval');
  cy.get('#headlessui-combobox-button-\\:r3\\: > .h-5').click();
  cy.get('#headlessui-combobox-option-\\:r7\\:').click();
  cy.get('.self-end > .inline-flex > span').click();
  /* ==== End Cypress Studio ==== */
});