import App from "./App";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { VisibilityFilters } from '../actions'
import ReactDOMServer from 'react-dom/server';

const middlewares = []
const mockStore = configureStore(middlewares)

//mocking store with todos and visibility filter
const store = mockStore({
    todos: [{ id: 1, text: 'Buy groceries1', completed: false }],
    visibilityFilter: VisibilityFilters.SHOW_ALL
})

describe("App Unit Test", () => {

    //verify div tag
    it("should render div tag", () => {
        const app = App()
        expect(app.type).toBe('div');
    })

    //verify AddTodo connect function
    it("should render AddTodo under div tag", () => {
        const app = App()
        expect(app.props.children[0]).toMatchSnapshot("<AddTodo />")
    })

    //verify TodoList connect function
    it("should render TodoList under div tag", () => {
        const app = App()
        expect(app.props.children[1]).toMatchSnapshot("<TodoList />")
    })

      //verify Footer connect function
    it("should render Footer under div tag", () => {
        const app = App()
        expect(app.props.children[2]).toMatchSnapshot("<Footer />")
    })

    //verify all button
    it("should render all button", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        const buttons = screen.getAllByRole(/button/i)
        expect(buttons[0]).toHaveTextContent('Add Todo')
        expect(buttons[1]).toHaveTextContent('All')
        expect(buttons[2]).toHaveTextContent('Active')
        expect(buttons[3]).toHaveTextContent('Completed')
    })

     //verify one textbox
    it("should render one textbox", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        const textbox = screen.getByRole(/textbox/i)
        expect(textbox).toBeInTheDocument()
    })

})