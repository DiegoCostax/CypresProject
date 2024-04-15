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
    describe("With links", () =>{
        beforeEach(() =>{
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('check Popup url', () => {
            cy.contains('Popup2')
            .should('have.prop','href')
            .and('equal','https://wcaquino.me/cypress/frame.html' )
        })
        it('Should acess popup dinamically', () => {
            cy.contains('Popup2').then($a =>{
                //extraindo o href para entrada direta na validação do popup sem encaminhar para visit
                const href = $a.prop('href')
                cy.visit(href)
                cy.get("#tfield").type('funciona')
            })

        })
        it('Should force link on same page', () => {
             cy.visit('https://wcaquino.me/cypress/componentes.html')
            cy.contains('Popup2')
            .invoke('removeAttr' , 'target')//Remove o atributo target que faz abrir em outra página, então abre diretamente no Iframe
            .click()
            cy.get("#tfield").type('funciona')
            
        });
    })

})

