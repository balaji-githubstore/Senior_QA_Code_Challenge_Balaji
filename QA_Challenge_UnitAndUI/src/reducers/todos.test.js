import todos from "./Todos";
import '@testing-library/jest-dom'


describe("todos Unit Test", () => {

   //count should be 1
   //id & text as given
   //completed should be false
   it("verify type as ADD_TODO with empty state to return one item with id, text and complete as false", () => {
      const action_addtodo = { id: 1, text: 'Buy groceries', type: "ADD_TODO" }
      const output = todos([], action_addtodo)
      
      // console.log(output); 
      expect(output.length).toBe(1)

      expect(output[0].id).toBe(1)
      expect(output[0].text).toBe('Buy groceries')
      expect(output[0].completed).toBe(false)
   })

   //count should be 3
   //id, text, completed as given for all state
   //id, text as given and completed should be false for action ADD_TODO
   it("verify type as ADD_TODO with state array to return all item with id, text and completed", () => {

      const state = [
         { id: 1, text: 'Buy groceries1', completed: false },
         { id: 2, text: 'Buy groceries2', completed: true }
      ]
      const action_addtodo = { id: 3, text: 'Buy groceries3', type: "ADD_TODO" }

      const output = todos(state, action_addtodo)
      console.log(output);

      expect(output.length).toBe(3)

      expect(output[0].id).toBe(1)
      expect(output[0].text).toBe('Buy groceries1')
      expect(output[0].completed).toBe(false)

      expect(output[1].id).toBe(2)
      expect(output[1].text).toBe('Buy groceries2')
      expect(output[1].completed).toBe(true)

      expect(output[2].id).toBe(3)
      expect(output[2].text).toBe('Buy groceries3')
      expect(output[2].completed).toBe(false)
   })

   //count should be 1
   //id & text as given
   //completed should be toggled for same action id
   it("verify type as TOGGLE_TODO with toggled completed for same action id", () => {
      const state = [
         { id: 1, text: 'Buy groceries1', completed: false }
      ]
      const action_toogletodo = {id: 1, type: "TOGGLE_TODO" }

      const output = todos(state, action_toogletodo)
      console.log(output);

      expect(output.length).toBe(1)

      expect(output[0].id).toBe(1)
      expect(output[0].text).toBe('Buy groceries1')
      expect(output[0].completed).toBe(true)
   })

   //count should be 1
   //id & text as given
   //completed should not be toggled for different action id
   it("verify type as TOGGLE_TODO with no toggled completed for different action id", () => {
      const state = [
         { id: 1, text: 'Buy groceries1', completed: false }
      ]
      const action_toogletodo = {id: 2, type: "TOGGLE_TODO" }

      const output = todos(state, action_toogletodo)
      console.log(output);

      expect(output.length).toBe(1)

      expect(output[0].id).toBe(1)
      expect(output[0].text).toBe('Buy groceries1')
      expect(output[0].completed).toBe(false)
   })

   //count should be 1
   //id, text & completed as given for other action type
   it("should return same state for any other type", () => {
      const state = [
         { id: 1, text: 'Buy groceries', completed: false }
      ]
      const action_random = { type: "RANDOM" }
      const output = todos(state, action_random)

      expect(output.length).toBe(1)
      expect(output[0].id).toBe(1)
      expect(output[0].text).toBe('Buy groceries')
      expect(output[0].completed).toBe(false)
   })
})