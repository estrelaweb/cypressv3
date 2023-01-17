/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        //Visita a página local//
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
    // Verifica se o título da pagina está correto // 
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário',function () {
        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste'
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva Santana')
        cy.get('#email').type('alinesantanaweb@hotmail.com')
        cy.get('#open-text-area').type(longText,{ delay:0 })
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
       
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva Santana')
        cy.get('#email').type('alinehotmail,com')
        cy.get('#open-text-area').type('Texto Default')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })
    
    it('Campo telefone continua vazio quando preenchido com o valor não numérico', function(){
        cy.get('#phone').type('abcdefg').should('have.value','');

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva Santana')
        cy.get('#email').type('alinehotmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Texto Default')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
       
        cy.get('#firstName').type('Aline')
        .should('have.value','Aline')
        .clear()
        .should('have.value','')

        cy.get('#lastName').type('Silva Santana')
        .should('have.value','Silva Santana')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('alinesantanaweb@hotmail.com')
        .should('have.value','alinesantanaweb@hotmail.com')
        .clear()
        .should('have.value','')

        cy.get('#open-text-area')
        .type('Texto Default')
        .should('have.value','Texto Default')
        .clear()
        .should('have.value','')


    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
       
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

   it('envia o formuário com sucesso usando um comando customizado',function(){

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
   })

   it('seleciona um produto (Youtube) por seu texto',function(){

    cy.get('#product')
    .select('youtube')
    .should('have.value','youtube')


   })

   it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
   })

   it('Seleciona um produto (Blog) por seu índice',function(){

    cy.get('#product')
    .select(1)
    .should('have.value','blog')

   })

   it('marca o tipo de atendimento feedback',function(){
     
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value','feedback')


   })

   it('marca cada tipo de atendimento do tipo radio',function(){
    cy.get('input[type="radio"]')
    .should('have.length',3)
    .each(function($radio){
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
})

   })

   it('Marca ambos checkbox depois desmarca o último',function(){
     
    cy.get('input[type = "checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

   })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva Santana')
        cy.get('#email').type('alinehotmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Texto Default')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('Seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
        expect ($input[0].files[0].name).to.equal('example.json')        })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input){
        expect ($input[0].files[0].name).to.equal('example.json') 
    })
   })


   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

   })

   it('verifica que a politica de privacidade abre em outra aba sem a necessidade de clicar',function() {
    cy.get('#privacy a').should('have.attr','target','_blank')
   })


   it('Acessar a página da politica de privacidade removendo o target e então clicando no link',function(){
    cy.get('#privacy a')
    .invoke('removeAttr','target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')

   })

})

    

  