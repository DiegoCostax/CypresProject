/// <reference types="cypress" />

describe( 'Helpers', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    

    it('wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')


        const promise = new Promise((resolve, reject) =>{
            setTimeout(()=> {
                resolve(10)
            }, 500)
        })

        cy.get("#buttonSimple").then(() => console.log('encontrei o primeiro '))
       // promise.then(num => console.log(num))
       cy.wrap(promise).then(ret => console.log(ret))
        cy.get("#buttonList").then(() => console.log('encontrei o segundo botão'))
    });


    it('its', () => {
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
         cy.wrap(obj).its('nome').should('be.equal', 'User')

         const obj2 = {nome: 'User', idade:20, endereco: {rua: 'dos bobos'}}
         cy.wrap(obj2).its('endereco').should('have.property', 'rua')
         cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
         cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')


         cy.visit('https://wcaquino.me/cypress/componentes.html')
         cy.title().its('length').should('be.equal', 20)
    })
    it('invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue}).invoke( "fn" ).should("eq", 1);
        cy.wrap({ fn: soma}).invoke( "fn" , 2, 5 ).should("eq", 7);

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get("#formNome").invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Dá pra ver?')

        cy.get('#resultado')
        .invoke('html', '<input type="button", value="hacked!"/>')


    });
})