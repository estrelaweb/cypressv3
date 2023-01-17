Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Silva Santana')
    cy.get('#email').type('alinesantanaweb@hotmail.com')
    cy.get('#open-text-area').type('Text')
    cy.contains('button','Enviar').click()
   
})
