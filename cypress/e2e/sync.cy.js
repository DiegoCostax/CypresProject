/// <reference types = "Cypress" />


describe ('Work with basic elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    
    
    it('Resposta Demorada', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
        
    })
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
        //.should('not.exist')
        .should('exist')
        .type('funciona')

     
    })
    it('Uso do find', () => {
        cy.get("#buttonlist").click()
        cy.get("#lista li")
        .find('span')
        .should('contain', 'Item 1')
        cy.get("#lista li span")
        .should('contain', 'Item 2')
        
    })
    it('Uso do timeOut', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout: 30000}).should('exist')
    });
     it('Click retry', () => {
        cy.get('#buttonCount')
        .click()
        .should("have.value", '1')

     });
     it('should vs then', () => {
        cy.get('#buttonListDOM').then($el =>{
            
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')

     });
})
