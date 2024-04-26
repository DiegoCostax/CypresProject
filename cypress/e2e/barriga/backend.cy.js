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




    it('inserir conta', () => {
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
        cy.getContaByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
                method: 'PUT',
                // headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')

        })

    cy.get('@response').its('status').should('be.equal', 200)
})
    it('não deve repetir nome da conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    
    })
    it('deve criar uma transação', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    // headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })
    it('validar o saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            // headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            // headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            console.log(res.body[0])
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                // headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            // headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })
        

    })
    it('deve remover a movimentação', () => {
        it('Should remove a transaction', () => {
            cy.request({
                method: 'GET',
                url: '/transacoes',
                // headers: { Authorization: `JWT ${token}` },
                qs: { descricao: 'Movimentacao para exclusao' }
            }).then(res => {
                cy.request({
                    url: `/transacoes/${res.body[0].id}`,
                    method: 'DELETE',
                    // headers: { Authorization: `JWT ${token}` },
                }).its('status').should('be.equal', 204)
            })
        })
    });
