/// <reference types="cypress" />



describe('Work with alerts', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        //cy.get('#alert').click()
        //cy.on( 'window:alert', msg => {
         //   console.log(msg)
           // expect(msg).to.equal("Alert Simples")
        //})
        cy.clickAlert('#alert', 'Alert Simples')

        
    })
    it('Alert mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on( 'window:alert', stub)
            cy.get('#alert').click().then(() =>{
                expect(stub.getCall(0)).to.be.calledWith("Alert Simples")
            })
        })
    it('Alert Confirmado', () => {
        cy.get('#confirm').click()

        cy.on( 'window:confirm', msg => {
            expect(msg).to.equal("Confirm Simples")
        })

        cy.on( 'window:alert', msg => {
            expect(msg).to.equal("Confirmado")
        })
     })
     it('Alert deny', () => {
        cy.get('#confirm').click()

        cy.on( 'window:confirm', msg => {
            expect(msg).to.equal("Confirm Simples")
            return false
        })

        cy.on( 'window:alert', msg => {
            expect(msg).to.equal("Negado")
        })

    })
        it('prompt', () => {
            cy.window().then(win => {
                cy.stub(win, "prompt").returns("42")
            })
            cy.get('#prompt').click()

            cy.on( 'window:confirm', msg => {
                  expect(msg).to.equal("Era 42?")
            })
    
              cy.on( 'window:alert', msg => {
                expect(msg).to.equal(":D")
             })
   })
        it.only('Desafio', () => {
            //Stub vai representar o evento 'Alerta'
            const stub = cy.stub().as('alerta')
            //Cy.on com o window + alert com stub, vai trazer no console a descrição do alerta ajudando assim a ter a validação do texto
            cy.on('window:alert', stub)
            cy.get('#formCadastrar').click()
            //then vai ser a assertiva do valor esperado de stub, que vai ser mostrado com o Getcall e validado pelo calledWith
            .then(() => expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio"))

            cy.get('#formNome').type('Diego')
            cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio"))

            cy.get('[data-cy=dataSobrenome]').type('Aquino')
            cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio"))
           
            cy.get('#formSexoMasc').click()
            cy.get('#formCadastrar').click()

            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        });
})
