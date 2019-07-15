export const state = () => ({
    todos: []
})

export const mutations = {
    ADD_NEWTODO(state, newTodo){
        console.log('STORE TODOS', state.todos.todos)
        console.log('COMMIT NEWTODO', newTodo)
        state.todos.push(newTodo)
    },
    DELETE_TODO(state, title){
        console.log('DELETE_TODO', title)
        let deleted = state.todos.find(t => t.title === title)
        console.log(deleted)
        console.log(state.todos)
        let ind = state.todos.indexOf(deleted)
        state.todos.splice(ind, 1)
    }
}