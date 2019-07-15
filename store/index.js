/*import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    //storage: window.localStorage
    modules: [ 'index', 'todos' ]
})  */

export const state = () => ({
    owners: [],
    currentOwner: ''
})

export const mutations = {
    ADD_OWNER: function(state, newOwner){
        state.currentOwner = newOwner
        if (!state.owners.includes(newOwner)) state.owners.push(newOwner)
        console.log('ADD_OWNER', state.currentOwner, state.owners)
    },
    CHANGE_CURRENTOWNER(state, owner){
        state.currentOwner = owner
    }
}

//export const plugins = [ vuexLocal.plugin ]
