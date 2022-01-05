describe("Tickets", () => {
    beforeEach(() => 
        cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("Deve ter no cabeçalho 'TICKETBOX", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });
    
    it("Deve preencher todos os campos de entrada de texto", () => {

        const firstName = "Jamile";
        const lastName = "Agnes";

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type("jamileagnes@gmail.com");
        cy.get('#requests').type("Engenheira de Qualidade de Software - Aprendendo automação de testes");
        cy.get('#signature').type(`${firstName} ${lastName}`);

    });

    it("Deve selecionar a quantidade de ingressos", () => {
        cy.get('#ticket-quantity').select("3");
    });

    it("Deve selecionar o tipo de bilhete 'VIP'", () => {
        cy.get('#vip').check();
    });

    it("Deve selecionar 'Social Media' e 'Friend' no chekbox", () => {
        cy.get('#friend').check();
        cy.get('#social-media').check();
    });

    it("Deve selecionar 'Social Media' e 'Friend' e desmarque o 'Friend'", () => {
        cy.get('#friend').check();
        cy.get('#social-media').check();
        cy.get('#friend').uncheck();
    });
    
    it("Deve alertar se e-mail invalido", () => {
        cy.get("#email")
          .as("email")
          .type("jamileagnes-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
          .clear()
          .type("jamileagnes@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("Deve preencher todo o formulario e em seguinda redefinir", () => {

        const firstName = "Jamile";
        const lastName = "Agnes";
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type("jamileagnes@gmail.com");
        cy.get('#requests').type("Engenheira de Qualidade de Software - Aprendendo automação de testes");
        cy.get('#signature').type(`${firstName} ${lastName}`);

        cy.get('#ticket-quantity').select("3");

        cy.get('#vip').check();

        cy.get('#social-media').check();

        cy.get('.agreement p')
          .should("contain",
          `I, ${fullName}, wish to buy 3 VIP tickets.`);

        cy.get('#agree').check();

        cy.get('button[type="submit"]')
          .as("submitButton")
          .should("not.be.disabled");
          
        cy.get('button[type="reset"]').click();

        cy.get('@submitButton').should("be.disabled");
    });

    it("Deve preencher campos obrigatorios usando comandos do suporte", () => {
        const customer = {
            firstName: "Agnes",
            lastName: "de Deus",
            email: "agnesdedeus@example.com"
        }

        cy.devePreencherCamposObrigatorios(customer);
   
        cy.get('button[type="submit"]')
        .as("submitButton")
        .should("not.be.disabled");

        cy.get('#agree').uncheck();

        cy.get('@submitButton').should("be.disabled");         

    });


})