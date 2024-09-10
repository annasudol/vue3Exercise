// https://on.cypress.io/api
describe('Test App', () => {
  it('displays h1', () => {
    cy.visit('/')
    cy.contains('h1', 'Sequence of tasks for a specific machines');
  })
  it('displays h2', () => {
    cy.visit('/')
   cy.contains('h2', 'Hours');
  });

  it('displays vertical tiles in a table', () => {
    cy.readFile('cypress/fixtures/data.json').then((t) => {
      cy.visit('/')
      const tasks = t.map(v=> v.tasks).flat().map(t=> t.taskName);
      cy.wrap([...new Set(tasks)]).each((t) => {
        cy.contains('.g-gantt-row-label', t)
      })
    })
  })
  it('displays elements in table', () => {
    cy.readFile('cypress/fixtures/data.json').then((t) => {
      cy.visit('/')
      const tasksIds = t.map(v=> v.tasks).flat().map(t=> t.taskId);
      cy.wrap([...new Set(tasksIds)]).each((t) => {
        cy.contains(`#${t}`, t)
      })
    })
  })
})
