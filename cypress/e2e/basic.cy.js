/// <reference types = "Cypress" />
/* global cy */

describe ('Cypress basics', () => {
    it.only('Should visit a page and assert title', () =>{
       cy.visit('https://wcaquino.me/cypress/componentes.html')

       
        Cy.pause()
       cy.title()
       .should('be.equal', 'Campo de Treinamento')
       .and('contain','Campo').debug()
    })
    it('Should Interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
        
    });
}) 