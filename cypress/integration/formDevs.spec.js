describe ('Form Devs', () => {
    beforeEach(() => cy.visit('../../formulario.html'))

    it.only('fills the forms and submit', () =>{
        cy.get('#nome').as('name').type('Bruno')
        cy.get('#sobrenome').as('lastName').type('Pedroso')
        cy.get('#email').as('email').type('bruno@c4.com')
        cy.get('input[type="radio"][value="fullstack"]').as('fullStackRadio').check()
        cy.get('#senioridade').as('seniority').select('Sênior')
        cy.get('input[type="checkbox"][value="HTML"]').as('htmlCheckBox').check()
        cy.get('input[type="checkbox"][value="CSS"]').as('cssCheckBox').check()
        cy.get('input[type="checkbox"][value="Javascript"]').as('jsCheckBox').check()
        cy.get('.botao').click()

        cy.get('@name').should('be.empty')
        cy.get('@lastName').should('be.empty')
        cy.get('@email').should('be.empty')
        cy.get('@fullStackRadio').should('not.be.checked')
        cy.get('input[type="radio"][value="frontend"]').should('be.checked')
        cy.get('@seniority').find('option').contains('Selecione').should('be.selected')
        cy.get('@htmlCheckBox').should('not.be.checked')
        cy.get('@cssCheckBox').should('not.be.checked')
        cy.get('@jsCheckBox').should('not.be.checked')
        cy.get('input[type="checkbox"][value="PHP"]').should('not.be.checked')
        cy.get('input[type="checkbox"][value="C#"]').should('not.be.checked')
        cy.get('input[type="checkbox"][value="Python"]').should('not.be.checked')
        cy.get('input[type="checkbox"][value="Java"]').should('not.be.checked')
    })

        it('fills the form and submit it using a custom command', ()=>{
            cy.fillFormAndSubmit()
            cy.assertFormInitialState()
        })

        it('has a title and subtitle', () =>{
            cy.get('#titulo').should('be.visible').and('have.text','Cadastro de DEVs')
            cy.get('#subtitulo').should('be.visible').and('have.text','Complete suas informações')
            cy.get('#fundo-branco').prev().screenshot('header')

    })
})