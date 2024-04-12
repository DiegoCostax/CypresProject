/// <reference types="cypress" />



describe('Work with alerts', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on( 'window:alert', msg => {
            console.log(msg)
            expect(msg).to.equal("Alert Simples")
        });

    })


})