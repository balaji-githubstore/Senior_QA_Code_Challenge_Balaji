import Todo from "./Todo";
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'

const mockOnClick = jest.fn()

describe("Todo Unit Test", () => {

     //verify list tag is present
     it("should render list tag", () => {
          render(<Todo onClick={mockOnClick} completed={true} text={"Submit Unit Test Code"}
          />)
          const liElement = screen.getByRole(/li/i)
          expect(liElement).toBeInTheDocument()
     })

     //verify list tag contains given text
     it("should render list with assigned text", () => {
          render(<Todo onClick={mockOnClick} completed={true} text={"Submit Unit Test Code"}
          />)
          const liElement = screen.getByRole(/li/i)
          expect(liElement).toHaveTextContent('Submit Unit Test Code')
     })

      //verify for completed as true to have - sytle=text-decoration: line-through;  
     it("should render list with textDecoration as line-through with completed as true", () => {
          render(<Todo onClick={mockOnClick} completed={true} text={"Submit Unit Test Code"}
          />)
          const liElement = screen.getByRole(/li/i)
          expect(liElement).toHaveAttribute('style', 'text-decoration: line-through;')
     })

     //verify for completed as false to have - sytle=text-decoration: none; 
     it("should render list with textDecoration as none with completed as false", () => {
          render(<Todo onClick={mockOnClick} completed={false} text={"Submit Unit Test Code"}
          />)
          const liElement = screen.getByRole(/li/i)
          expect(liElement).toHaveAttribute('style', 'text-decoration: none;')
     })
})