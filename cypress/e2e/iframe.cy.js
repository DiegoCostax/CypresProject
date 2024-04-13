/// <reference types="cypress" />



describe('Work with iFrames', () => {

    it('deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        //com cy.get eu busquei o iframe e fiz a assertiva, que traz uma function que recebe os contents do Body do Iframe, assim acessando os textField e validando o texto
        cy.get('#frame1').then( iframe=> {
           const body = iframe.contents().find('body')
           cy.wrap(body).find('#tfield')
           .type('funciona?')
           .should('have.value', 'funciona?')

        })


    })
    it('deve testar frame diretamente', () => {
        //o cypress não reconhece o Alert Externo do iframe, assim teve que ocorrer o acesso direto no Iframe
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        //ele traz a mensagem exibida pelo alert e ja valida diretamente com o cypress
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
           })

    })

})

