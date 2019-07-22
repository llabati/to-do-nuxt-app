export const state = () => ({
    owners: [],
    currentOwner: '',
    todos: []
})

export const getters = {
    getOwners: function(state){
        console.log('GETTER OWNERS')
        if (state.owners.length > 0) return state.owners
        else return JSON.parse(localStorage.getItem('owners'))
    },
    getTodos: function(state){
        console.log('GETTER TODOS')
        if (state.todos.length > 0) return state.todos
        else return JSON.parse(localStorage.getItem('todos'))
    }
}

export const actions = { 
    /*resetWithStorage: function( { commit } ){
        JSON.parse(localStorage.getItem('owners'))
        .then( res => {
        commit("RESET_WITH_STORAGE", res )
        })
    }*/
    saveNewOrder( { commit }, payload) {
        console.log(payload)
        const todos = []
        payload.map(todo => {
          todos.push(todo)
        })
        
        commit('REORDER_TODOS', todos)
      }
}

export const mutations = {
    RESET_WITH_STORAGE: function(state){
        let retrieve = JSON.parse(localStorage.getItem('todos'))
        state.todos = retrieve
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
        //state.todos = JSON.parse(window.localStorage.getItem('todos'))
    },/*
    RESET_WITH_STORAGE: function(state, payload){
        //console.log('TODOS AVANT RESET STORAGE', state.todos)
        //console.log('STORAGE', localStorage.getItem('todos'))
        state.todos = payload
    },*/
    ADD_NEWTODO(state, newTodo){
        //console.log('STORE TODOS', state.todos)
        //console.log('COMMIT NEWTODO')
        console.log('STORE', state.owners, state.todos)
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
    UPDATE_TODO(state, res){
        console.log('UPDATE_TODO', res.ind, res.title, res.owner, res.content, res.advancement)
        let update = state.todos.find( t => t.title === res.ind)
            if (res.title !== '') update.title = res.title
          if (res.owner !== '') update.owner = res.owner
          if (res.content !== '') update.content = res.content
          if (res.advancement !== '') update.advancement = res.advancement  
        //state.todos.splice(ind, 1, todo)
        /*let updated = state.todos.find( t => t.title === ind )
        updated.title = update.title
        updated.owner = update.owner
        updated.content = update.content
        updated.advancement = update.advancement*/
        localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    REORDER_TODOS(state, todos){
        state.todos = [ ...todos]
        localStorage.setItem('todos', JSON.stringify(state.todos))
    }
}


