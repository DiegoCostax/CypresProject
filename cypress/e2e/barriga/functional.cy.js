/// <reference types="cypress" />

import locators from "../../support/locators"
import '../../support/commandsContas'
import '../../support/commands'

describe('Test Functional', () => {
    beforeEach(() => {
        cy.login('a@a', 'a')
        
    })

    beforeEach(() =>{
        cy.get(locators.MENU.HOME).click()
        cy.resetApp()
    })
    
    
    
    
    it('inserir conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de testes')
        cy.get(locators.MESSAGE).should('contain', 'inserida com sucesso')
    })
    it('alterando conta', ()=>{
    cy.acessarMenuConta()
    cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(locators.CONTAS.NOME)
    .clear()
    .type('Conta alterada')
    cy.get(locators.CONTAS.BTN_SALVAR).click()
    cy.get(locators.MESSAGE).should('contain', 'Conta atualizada')
    
    })
    it('não deve repetir nome da conta', () => {
        cy.acessarMenuConta()
        cy.get(locators.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })
    it('deve criar uma transação', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(locators.MOVIMENTACAO.VALOR).type('123')
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type('inter')
        cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')

        cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc' , '123')).should('exist')

    })
    it('validar o saldo', () => {
        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')

        cy.get|(locators.MENU.EXTRATO).click()
        cy.get(locators.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value','Movimentacao 1, calculo saldo' )
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')

        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')

    })
    it('deve remover a movimentação', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')
    });
 })
