/// <reference types="cypress" />

describe('Test Functional', () => {
    // let token
    before(() => {
        //antes de qualquer teste ele vai fazer um signin, vai colocar na variavel token
        cy.getToken('a@a', 'a')
        // .then(tkn =>{
        //     token = tkn
        // })

    })

    beforeEach(() => {
        // cy.get(locators.MENU.HOME).click()
        cy.resetRest()
    })




    it.only('inserir conta', () => {
            cy.request({
                url: '/contas',
                method: 'POST',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    nome:'Conta via rest'
                }
                //apelidei o cy request de inserção de conta como response
            }).as('response')

        //aqui eu procuro pelo response e faço as seguintes assertivas
        cy.get('@response').then(res => {
            //o status que vem na res é 200?
            expect(res.status).to.be.equal(201)
            //retornou algum id na res?
            expect(res.body).to.have.property('id')
            //houve retorno da resposta com a propriedade seguinte
            expect(res.body).to.have.property('nome','Conta via rest')
        })
    })
    it('alterando conta', () => {


    })
    it('não deve repetir nome da conta', () => {

    })
    it('deve criar uma transação', () => {

    })
    it('validar o saldo', () => {

    })
    it('deve remover a movimentação', () => {

    });
})
