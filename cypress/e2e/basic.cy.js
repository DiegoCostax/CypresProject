/// <reference types = "Cypress" />
/* global cy */

describe ('Cypress basics', () => {
    it.only('Should visit a page and assert title', () =>{
       cy.visit('https://wcaquino.me/cypress/componentes.html')


       
        cy.title().should('be.equal', 'Campo de treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo')

        let syncTitle 

        cy.title().then(title =>{
            console.log(title)

            cy.get("#formNome").type(title)

            syncTitle = title
        })

    })
    it('Should Interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
        
    });
}) 