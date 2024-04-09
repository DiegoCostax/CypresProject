/// <reference types="cypress" />

describe( 'Helpers', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    

    it('wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')


        
    });





})