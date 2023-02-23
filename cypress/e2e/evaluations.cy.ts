  describe('Evaluations Page', () => {
  it('Login Successful', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('zack.wuckert@rowe.biz')
    cy.get('input[name=password]')
      .type('FAQVQZHX')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
  })
  it('Secciones Table Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('zack.wuckert@rowe.biz')
    cy.get('input[name=password]')
      .type('FAQVQZHX')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.contains('Inglés técnico')
  })
  it('Evaluations form Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('zack.wuckert@rowe.biz')
    cy.get('input[name=password]')
      .type('FAQVQZHX')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.wait(10000)
    cy.contains('Inglés técnico')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
  })
  it('Evaluations form use', () => {
    cy.visit('http://localhost:3000/login');


    /* ==== Generated with Cypress Studio ==== */
    cy.get('.space-y-6 > :nth-child(1) > .mt-1 > .appearance-none').clear('zack.wuckert@rowe.biz');
    cy.get('.space-y-6 > :nth-child(1) > .mt-1 > .appearance-none').type('zack.wuckert@rowe.biz');
    cy.get('.relative > :nth-child(1) > .mt-1 > .appearance-none').clear('FAQVQZHX');
    cy.get('.relative > :nth-child(1) > .mt-1 > .appearance-none').type('FAQVQZHX');
    cy.get(':nth-child(4) > .w-full').click();
    cy.wait(4000);
    cy.get('[href="/dashboard/mis-secciones"] > span').click();
    cy.wait(4000);
    cy.get('div > .MuiButtonBase-root > .MuiIconButton-label > .material-icons').click();
    cy.wait(4000);
    cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').clear('te');
    cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').type('test1');
    cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').clear('te');
    cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').type('test1');
    cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').clear('0002-03-03');
    cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').type('2023-03-03');
    cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').clear('1');
    cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').type('10');
    cy.get('.self-end > .inline-flex > span').click();
    cy.wait(4000);
    cy.get('#tab\\:r1\\:1').click();
    cy.wait(4000);
    cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').clear('te');
    cy.get(':nth-child(2) > :nth-child(1) > .mt-1 > .appearance-none').type('test2');
    cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').clear('te');
    cy.get(':nth-child(3) > :nth-child(1) > .mt-1 > .appearance-none').type('test2');
    cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').clear('0002-03-03');
    cy.get(':nth-child(4) > :nth-child(1) > .mt-1 > .appearance-none').type('2023-03-03');
    cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').clear('1');
    cy.get(':nth-child(5) > :nth-child(1) > .mt-1 > .appearance-none').type('10');
    cy.get('.h-5').click();
    cy.wait(4000);
    cy.get('#headlessui-combobox-option-\\:r9\\: > .block').click();
    cy.wait(4000);
    cy.get('.self-end > .inline-flex > span').click();
    cy.wait(4000);
    /* ==== End Cypress Studio ==== */
  })
  it('Evaluations approval', () => {
    // cy.visit('/login')
    // cy.get('input[name=email]')
    //   .type('zack.wuckert@rowe.biz')
    // cy.get('input[name=password]')
    //   .type('FAQVQZHX')
    // cy.get('button[type=submit]')
    //   .click()
    // cy.get('h4')
    //   .should('contain', 'Bienvenido')
    // cy.visit('/dashboard/mis-secciones')
    // cy.wait(10000)
    // cy.contains('Inglés técnico')
    // cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
    //   .click()
    // cy.get('input[name=name]')
    //   .type('test')
    // cy.get('input[name=description]')
    //   .type('test')
    // cy.get('input[name=date]')
    //   .type('2022-12-11')
    // cy.get('input[name=percentage]')
    //   .type('2')
    // cy.contains('Asociar Evaluacion')
    //   .click()
    // cy.contains('Solicitar Aprobacion')
    //   .click()
  })
  it('Evaluations admin approval', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/aprobaciones')
    cy.wait(10000)
    cy.contains('Inglés técnico')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
  })
})

export {}
