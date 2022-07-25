import visibilityFilter from "./visibilityFilter";
import { VisibilityFilters } from '../actions'

describe("visibilityFilter Unit Test", () => {

    //verify should return SHOW_ALL for action filter SHOW_ALL
    it("should return SHOW_ALL for action as SHOW_ALL and type as SET_VISIBILITY_FILTER", () => {   
        const action = { type: "SET_VISIBILITY_FILTER",filter: VisibilityFilters.SHOW_ALL }
        const output = visibilityFilter(VisibilityFilters.SHOW_ALL,action)
        console.log(output);
        expect(output).toBe('SHOW_ALL')
    })

    //verify should return SHOW_ACTIVE for action filter SHOW_ACTIVE
    it("should return SHOW_ACTIVE for action as SHOW_ACTIVE and type as SET_VISIBILITY_FILTER", () => {   
        const action = { type: "SET_VISIBILITY_FILTER",filter: VisibilityFilters.SHOW_ACTIVE }
        const output = visibilityFilter(VisibilityFilters.SHOW_ALL,action)
        expect(output).toBe('SHOW_ACTIVE')
    })

     //verify should return SHOW_COMPLETED for action filter SHOW_COMPLETED
    it("should return SHOW_COMPLETED for action as SHOW_COMPLETED and type as SET_VISIBILITY_FILTER", () => {   
        const action = { type: "SET_VISIBILITY_FILTER",filter: VisibilityFilters.SHOW_COMPLETED }
        const output = visibilityFilter(VisibilityFilters.SHOW_ALL,action)
        expect(output).toBe('SHOW_COMPLETED')
    })

    //verify should return SHOW_ALL for all other action filter
    it("should return SHOW_ALL type as other than SET_VISIBILITY_FILTER", () => {   
        const action = { type: "NA"}
        const output = visibilityFilter(VisibilityFilters.SHOW_ALL,action)
        expect(output).toBe('SHOW_ALL')
    })
})

