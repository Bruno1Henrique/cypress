/// <reference types="cypress"/>
import { format, prepareLocalStorage } from '../support/utils'

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
        cy.visit('https://devfinance-agilizei.netlify.app/#',{
            onBeforeLoad: (win) =>{
                prepareLocalStorage(win)
            }
        })
    });

    it('Cadastrar Entradas', () => {

        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(12) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        cy.get('#data-table tbody tr').should('have.length',3)
        
    });

    it('Cadastrar Saidas', () => {
        
        cy.get('#transaction .button').click() // id+ classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(-12) //atributos
        cy.get('[type=date]').type('2022-06-01') //atributos
        cy.get('button').contains('Salvar').click()// tipo e valor

        cy.get('#data-table tbody tr').should('have.length',3);
    });
    
    it('Remover entradas e saídas', () => {
     /*   const entrada = 'Mesada'
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

        //estrategia 1: voltar para o elemento pai, e avançar para um td img attr*/

        cy.get('td.description')
            .contains('Mesada')
            .parent()
            .find('img[onclick*= remove]')
            .click()

        //estrategia 2: buscar todos os irmaos e buscar o que tem img + attr

        cy.get('td.description')
          .contains('Suco Kapo')
          .siblings()
          .children('img[onclick*= remove]')
          .click()

          cy.get('#data-table tbody tr').should('have.length',0)
    

    /*it.only('Validar saldos com diversas transações', () => {
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
        cy.get('button').contains('Salvar').click()// tipo e valor*/


        //Capturar as linhas com as transaçõe
        //Capturar os textos dessas colunas
        //Formatar esses valores das colunas

        //Capturar o texto do total
        //Comparar o somatorio de entrdas e despesas e comparar com o total

        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')
            .each(($el, index, $list) =>{

                cy.get($el).find('td.income,td.expense').invoke('text').then(text=>{
                   if(text.includes('-')){
                       expenses = expenses + format(text)
                   } else {
                       incomes = incomes + format(text)
                   }
                   cy.log(`entradas`,incomes)
                   cy.log(`saídas`, expenses)

                })
            })
        cy.get('#totalDisplay').invoke('text').then(text =>{
            cy.log(`valor total`, format(text))

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect (formattedTotalDisplay).to.eq(expectedTotal)
        })

    })
})