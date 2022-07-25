// I have completed challenge 2 in QA_Challenge_UnitAndUI and complete all challenge in QA_chatbot
//I have to compelet the unit testing part which I can complete by weekend because of production release in my current work. 
//unit testing is pending. Please validate the rest and will share the unit testing code in this weekend.
import TodoList from "./TodoList";
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'

const todos_state = [
  { id: 1, text: 'Buy groceries1', completed: false },
  { id: 2, text: 'Buy groceries2', completed: true }
]

const mock_toggleTodofn=jest.fn()

describe("TodoList Unit Test", () => {

  //verify listitems count should be 2 as todos_state const
  it("should render extact list count", () => {
    render(<TodoList todos={todos_state} toggleTodo={mock_toggleTodofn}
    />)
    const listItems = screen.getAllByRole(/listitem/i)
    expect(listItems.length).toBe(2)
  })

  //verify list should be present
  it("should render list", () => {
    render(<TodoList todos={todos_state} toggleTodo={mock_toggleTodofn}
    />)
    const list = screen.getAllByRole(/list/i)
    expect(list[0]).toBeInTheDocument()
  })
  
  //verify listitem should contain tag, text, style as provided
  it("should render list items as proper text and style", () => {
    render(<TodoList todos={todos_state} toggleTodo={mock_toggleTodofn}
    />)
    const listItems = screen.getAllByRole(/listitem/i)
    expect(listItems[0]).toHaveTextContent('Buy groceries1')
    expect(listItems[0]).toHaveAttribute('style', 'text-decoration: none;')

    expect(listItems[1]).toHaveTextContent('Buy groceries2')
    expect(listItems[1]).toHaveAttribute('style', 'text-decoration: line-through;')
  })

  

});
