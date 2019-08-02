
export default { 
    resetOwnersWithStorage: function( { commit } ){
        commit("RESET_OWNERS_WITH_STORAGE")
        },

    resetTodosWithStorage: function({ commit } ){
        commit("RESET_TODOS_WITH_STORAGE")
    },
    changeCurrentOwner: function({commit}, owner){
        commit("CHANGE_CURRENTOWNER", owner)
    },
    addOwner: function({commit}, newOwner){
        commit("ADD_OWNER", newOwner)
    },

    addNewTodo: function({commit}, newTodo){
        console.log('Store - action')
        commit('ADD_NEWTODO', newTodo)
    },
    reorderTodos(context, todos){
        context.commit('REORDER_TODOS', todos)
    },
    
    saveNewOrder( { commit }, payload) {
        const todos = []
        payload.map(todo => {
          todos.push(todo)
        })  
        commit('REORDER_TODOS', todos)
      },
    updateTodo(context, update){
        console.log('update todo', update)
        context.commit('UPDATE_TODO', update)
    },
    deleteTodo(context, title){
        context.commit('DELETE_TODO', title)
    }
    
}