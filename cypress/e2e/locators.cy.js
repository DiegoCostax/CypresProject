/// <reference types = "Cypress" />

describe ('Work with basic elements', () => {
    describe('Work with alerts', () => {
        beforeEach(() => {
            cy.reload()
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })
        it('using jquery selector', () => {
            cy.get("table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input")
            cy.get('[onclick*="Francisco"]')

            cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
        });
       

    })
})