/// <reference types="cypress"/>

// I have completed challenge 2 in QA_Challenge_UnitAndUI and complete all challenge in QA_chatbot
//I have to compelet the unit testing part which I can complete by weekend because of production release in my current work. 
//unit testing is pending. Please validate the rest and will share the unit testing code in this weekend.
describe("Todo App UI Test Suite", () => {

  //task picking from cypress.json
  const tasks = Cypress.config()["tasks"]
  const completed_task = Cypress.config()["completed_task"]
  const pending_task = Cypress.config()["pending_task"]

  //verify the url is working fine
  it("Should get response 200", () => {

    cy.request("http://localhost:3000/").then((resp) => {
      // status code is 200
      expect(resp.status).to.eq(200)
    })
  });

  //verify UI components on the web page
  it("Should navigate to the todo application with all UI components", () => {

    cy.visit("http://localhost:3000/");
    cy.get('button').contains("Add Todo")
    cy.get('button').contains("All").should('have.disabled')
    cy.get('button').contains("Active")
    cy.get('button').contains("Completed")
    cy.get('input')
    cy.contains("Show:")
  });

  //verify title
  it("Should title be 'Redux Todos Example'", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should('eq', 'Redux Todos Example')
  });

  //verify whether adding task is reflected as list with proper text
  it("Should list the Added Task", () => {
    cy.visit("http://localhost:3000/");

    //adding task based on the array
    tasks.forEach(task => {
      cy.get("input").type(task)
      cy.get('button').contains("Add Todo").click()
    });

    //verify all task name in the list
    tasks.forEach(task => {
      cy.get('li').contains(task).should('have.text', task)
    });

  });

  //verify whether pending task and completed task with strikethrough is reflecting under All section
  it("Should show pending and completed strikethrough task under All Section by default", () => {
    cy.visit("http://localhost:3000/");

    //adding task based on the array
    tasks.forEach(task => {
      cy.get("input").type(task)
      cy.get('button').contains("Add Todo").click()
    });

    //click on completed task
    completed_task.forEach(task => {
      cy.get('li').contains(task).click()
    });

    //verify strikethrough for completed task
    completed_task.forEach(task => {
      cy.contains(task).should('have.attr', 'style', 'text-decoration: line-through;')
    });

    //verify all task name in the list
    tasks.forEach(task => {
      cy.get('li').contains(task).should('have.text', task)
    });

  });

  //verify only pending task shown under Active section
  it("Should show pending task under Active Section", () => {
    cy.visit("http://localhost:3000/");

    //adding task based on the array
    tasks.forEach(task => {
      cy.get("input").type(task)
      cy.get('button').contains("Add Todo").click()
    });

    //click on completed task
    completed_task.forEach(task => {
      cy.get('li').contains(task).click()
    });

    //click on active
    cy.get('button').contains("Active").click()

    //verifying the pending task in the Active section
    pending_task.forEach(task => {
      cy.get('li').contains(task).should('have.text', task)
    });

  });

  //verify only completed task with strikethrough shown under Completed section
  it("Should Show task completed with strikethrough under Completed Section", () => {
    cy.visit("http://localhost:3000/");

    //adding task based on the array
    tasks.forEach(task => {
      cy.get("input").type(task)
      cy.get('button').contains("Add Todo").click()
    });

    //click on completed task
    completed_task.forEach(task => {
      cy.get('li').contains(task).click()
    });

    //click on Completed
    cy.get('button').contains("Completed").click()

    //verifying the completed list in the completed section

    completed_task.forEach(task => {
      cy.get('li').contains(task).should('have.text', task)
      cy.contains(task).should('have.attr', 'style', 'text-decoration: line-through;')
    });
  });

  //verify All section shows all task when navigated from Completed section
  it("Should show pending and completed strikethrough task under All Section on navigation", () => {
    cy.visit("http://localhost:3000/");

    //adding task based on the array
    tasks.forEach(task => {
      cy.get("input").type(task)
      cy.get('button').contains("Add Todo").click()
    });

    //click on completed task
    completed_task.forEach(task => {
      cy.get('li').contains(task).click()
    });

    //click on active
    cy.get('button').contains("Active").click()
    cy.get('button').contains("All").click()

    //verify strikethrough for completed task
    completed_task.forEach(task => {
      cy.contains(task).should('have.attr', 'style', 'text-decoration: line-through;')
    });

    //verify all task name in the list
    tasks.forEach(task => {
      cy.get('li').contains(task).should('have.text', task)
    });

  });


});
