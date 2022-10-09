describe('Login Page', () => {
  it('Login Page Load', () => {
    cy.visit('/login')
  })
  it('Login Without Data', () => {
    cy.visit('/login')
    cy.get('button[type=submit]').click()
    cy.get('span').should('contain', 'Este campo es obligatorio.')
  })
  it('Login Fail', () => {
    cy.visit('/login')
    cy.get('input[name=email]').type("admin@itpsm.edu.sv")
    cy.get('input[name=password]').type("passord")
    cy.get('button[type=submit]').click()
    cy.get('div').should('contain', 'Su correo electrónico o contraseña es incorrecto. Revise e intente nuevamente.')
  })
  it('Login Successful', () => {
    cy.visit('/login')
    cy.get('input[name=email]').type("admin@itpsm.edu.sv")
    cy.get('input[name=password]').type("password")
    cy.get('button[type=submit]').click()
    cy.get('h4').should('contain', 'Bienvenido')
  })
})
