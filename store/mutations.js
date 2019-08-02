
export default {
    RESET_TODOS_WITH_STORAGE: function(state){
        let retrieveTodos = JSON.parse(localStorage.getItem('todos'))
        if (retrieveTodos) state.todos = retrieveTodos
        else state.todos = []
    },
    RESET_OWNERS_WITH_STORAGE: function(state, res){
        let retrieveOwners = JSON.parse(localStorage.getItem('owners'))
        if (!retrieveOwners) state.owners = []
        else state.owners = retrieveOwners
    },
    ADD_OWNER: function(state, newOwner){
        state.currentOwner = newOwner
        localStorage.setItem('currentOwner', state.currentOwner)
        if (!state.owners.includes(newOwner)) {
            state.owners.push(newOwner)
        }
        localStorage.setItem('owners', JSON.stringify(state.owners))
        console.log('ADD_OWNER', state.currentOwner, state.owners)
    },
    CHANGE_CURRENTOWNER(state, owner){
        state.currentOwner = owner
        localStorage.setItem('currentOwner', state.currentOwner)
    },
    RETRIEVE_TODOS: function(state){
        console.log('RETRIEVE TODOS', localStorage.getItem('todos'))
        state.todos = JSON.parse(window.localStorage.getItem('todos'))
    },
    ADD_NEWTODO(state, newTodo){
        console.log('STORE', state.todos)
        state.todos.push(newTodo)
        console.log('BEFORE LOCAL', state.todos)
        localStorage.setItem('todos', JSON.stringify(state.todos))
        
    },
    DELETE_TODO(state, title){
        console.log('DELETE_TODO', title)
        let deleted = state.todos.find(t => t.title === title)
        console.log(deleted)
        console.log(state.todos)
        let ind = state.todos.indexOf(deleted)
        state.todos.splice(ind, 1)
        localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    UPDATE_TODO(state, update){
        console.log('UPDATE_TODO', update)
        let corrected = state.todos.find( t => t.title === update.ind)
          if (update.title !== '') corrected.title = update.title
          if (update.owner !== '') corrected.owner = update.owner
          if (update.content !== '') corrected.content = update.content
          if (update.advancement !== '') corrected.advancement = update.advancement  
          if (update.day !== '') corrected.day = update.day
          if (update.month !== '') corrected.month = update.month
          if (update.year !== '') corrected.year = update.year
        
        localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    REORDER_TODOS(state, todos){
        state.todos = [ ...todos]
        localStorage.setItem('todos', JSON.stringify(state.todos))
    }
}
