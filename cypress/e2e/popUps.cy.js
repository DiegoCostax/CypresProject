/// <reference types="cypress" />



describe('Work with Popup', () => {

    it('deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win =>{
            //cy.stub vai chamar mockado uma função (no caso a chamada do PopUp pelo Open)
            cy.stub(win, 'open').as('winOpen');
        })
        cy.get('#ButtonPopUp').click()
        cy.get('@winOpen').should('be.called')
        
    })
    it('deve testar popup', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
           })

    })

})

