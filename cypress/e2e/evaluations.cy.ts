  describe('Evaluations Page', () => {
  it('Login Successful', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('gulgowski.javonte@hotmail.com')
    cy.get('input[name=password]')
      .type('6BZKYGN3')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
  })
  it('Secciones Table Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('gulgowski.javonte@hotmail.com')
    cy.get('input[name=password]')
      .type('6BZKYGN3')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.contains('Aplicación de Técnicas Elementales de Cocina')
  })
  it('Evaluations form Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('gulgowski.javonte@hotmail.com')
    cy.get('input[name=password]')
      .type('6BZKYGN3')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.wait(10000)
    cy.contains('Aplicación de Técnicas Elementales de Cocina')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
  })
  it('Evaluations form use', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('gulgowski.javonte@hotmail.com')
    cy.get('input[name=password]')
      .type('6BZKYGN3')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.wait(10000)
    cy.contains('Aplicación de Técnicas Elementales de Cocina')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
    cy.get('input[name=name]')
      .type('test')
    cy.get('input[name=description]')
      .type('test')
    cy.get('input[name=date]')
      .type('2022-12-11')
    cy.get('input[name=percentage]')
      .type('2')
    cy.contains('Asociar Evaluacion')
      .click()
    cy.contains('span[class="material-icons MuiIcon-root"]', 'delete')
      .click()
  })
  it('Evaluations approval', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('gulgowski.javonte@hotmail.com')
    cy.get('input[name=password]')
      .type('6BZKYGN3')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('/dashboard/mis-secciones')
    cy.wait(10000)
    cy.contains('Aplicación de Técnicas Elementales de Cocina')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
    cy.get('input[name=name]')
      .type('test')
    cy.get('input[name=description]')
      .type('test')
    cy.get('input[name=date]')
      .type('2022-12-11')
    cy.get('input[name=percentage]')
      .type('2')
    cy.contains('Asociar Evaluacion')
      .click()
    cy.contains('Solicitar Aprobacion')
      .click()
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
    cy.contains('Aplicación de Técnicas Elementales de Cocina')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .click()
  })
})

export {}
