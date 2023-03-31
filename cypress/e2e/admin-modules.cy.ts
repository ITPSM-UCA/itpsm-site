const randomCode = (min: number, max: number): string => {
  let random = Math.floor(Math.random() * (max - min) ) + min
  return random.toString().substring(0, 5)
}

describe('Modules Page', () => {
  it('Modules Page -> Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
  })
  it('Modules Page -> Table Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
    cy.get('tbody')
      .should('have.class', 'MuiTableBody-root')
      .find('tr')
      .should('have.length', 1)
  })
  it('Modules Page -> Form Load', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
    cy.contains('Nuevo módulo')
    .click()
    cy.get('h1')
      .should('contain', 'Módulos')
  })
  it('Modules Page -> Create Module', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
    cy.contains('Nuevo módulo')
    .click()
    cy.get('input[name=code]')
      .type(randomCode(Math.pow(10, 3), Math.pow(10, 6)))
    cy.get('input[name=name]')
      .type('Cypress Create Module')
    cy.contains('Guardar módulo')
      .click()
    cy.get('h4')
      .should('contain', '¡Exito!')
  })
  it('Modules Page -> Create Module -> Enter an existent code', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
    cy.contains('Nuevo módulo')
    .click()
    cy.get('input[name=code]')
      .type('200058')
    cy.get('input[name=name]')
      .type('Cypress Create Module')
    cy.contains('Guardar módulo')
      .click()
    cy.get('h4')
      .should('contain', 'Error...')
  })
  it('Modules Page -> Edit Module', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .type('admin@itpsm.edu.sv')
    cy.get('input[name=password]')
      .type('password')
    cy.get('button[type=submit]')
      .click()
    cy.get('h4')
      .should('contain', 'Bienvenido')
    cy.visit('dashboard/modulos')
    cy.contains('span[class="material-icons MuiIcon-root"]', 'edit')
      .first()
      .click()
    cy.get('input[name=name]')
      .clear()
      .type('Cypress Edit Module')
    cy.contains('Guardar módulo')
      .click()
    cy.get('h4')
      .should('contain', '¡Exito!')
  })
})

export {}