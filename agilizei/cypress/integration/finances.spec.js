/// <reference types="cypress"/>

//cy.viewport
//arquivos de config
//configs por linha de comando


context('Dev Finances Agilizei', () => {
    /* Hookes: Trechos que executam e depois do testes
    before > antes de todos os testes
    beforeEach > antes de cada teste
    after > depois de todos os testes
    afterEach > depois de cada testes*/

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
        cy.get('#data-table tbody tr').should('have.length',0);
    });

    it('Cadastrar Entradas', () => {

        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(12) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        cy.get('#data-table tbody tr').should('have.length',1);
        
    });

    it('Cadastrar Saidas', () => {
        
        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(-12) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        cy.get('#data-table tbody tr').should('have.length',1);
    });
    
    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada'
        const saida = 'KinderOvo'

        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        //estrategia 1: voltar para o elemento pai, e avançar para um td img attr

        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*= remove]')
            .click()

        //estrategia 2: buscar todos os irmaos e buscar o que tem img + attr

        cy.get('td.description')
          .contains(saida)
          .siblings()
          .children('img[onclick*= remove]')
          .click()

          cy.get('#data-table tbody tr').should('have.length',0);
    });

});