
export default {
    getOwners: function(state){
        if (state.owners.length > 0) return state.owners
        else return JSON.parse(localStorage.getItem('owners'))
    },
    
    getTodos: function(state){
        if (state.todos.length > 0) return state.todos
        else return JSON.parse(localStorage.getItem('todos'))
    }
}