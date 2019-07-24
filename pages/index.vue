<template>

  <v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>
      <v-card> 
        <v-tooltip bottom color="blue"><v-card-title slot="activator" class="headline amber lighten-4 indigo--text text--darken-3">Ma liste des tâches</v-card-title><span>Pour voir les détails, cliquez sur la tâche.</span></v-tooltip>
        <!-- Registration -->
        <v-card-text>
            <v-form v-if="!account">
            <v-text-field
                v-model="owner"
                label="Votre Prénom"
                required>
            </v-text-field>
  
            <v-btn color="green" class="white--text" @click="validateAccount">Connectez-vous</v-btn>
            <v-btn color="deep-orange lighten-4" @click="createAccount">Créez votre compte</v-btn>
            </v-form> 
            <p v-if="warning" style="color: red; margin-bottom: 10px;"><strong>Vous ne semblez pas être déjà identifié. Veuillez créer votre compte.</strong></p>

          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
           
            <div v-if="currentOwner">
              <div>
                <h3>Bienvenue à {{ currentOwner }} !!!</h3>
                <p>Vous n'êtes pas {{ currentOwner }} ? <v-chip @click="changeOwner">Identifiez-vous ici</v-chip></p>
              </div>
              <div v-if="!currentOwner && !account">
                <h3>Bienvenue à {{ owner }} !</h3>
                <p>Vous n'êtes pas {{ owner }} ? <v-chip @click="changeOwner">Identifiez-vous ici</v-chip></p>
              </div> 
              <all-todos :todos="todos" :filteredTodos="filteredTodos" :filtering="filtering" :selectedOwner="selectedOwner"></all-todos>
            


            <footer-actions :notodo="notodo" :getpage="getpage" :putpage="putpage" :deletepage="deletepage" :addpage="addpage" :todo="todo"></footer-actions>
              
              
            </div>
          
        </v-card-text>
          
        <v-card-text>

        </v-card-text>
        
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import { getters } from 'vuex'
import { mutations } from 'vuex'

import WelcomeCard from '../components/WelcomeCard'
import FooterActions from '../components/FooterActions'
import AllTodos from '../components/AllTodos'

export default {
    data(){
      return {
        welcomeMessage: 'Tous les utilisateurs identifiés peuvent déposer leurs tâches et en noter l\'avancement. Bienvenue à tous !',
        owner: '',
        account: false,
        filtering: false,
        warning: false,
        selectedOwner: '',
        filteredTodos: [],
        getpage: false,
        putpage: false,
        deletepage: false,
        addpage: true
      }
    },
    computed: {
      invitation(){

        if (!this.todos) return 'N\'hésitez pas à créer une tâche !'
        else return
      },
      notodo(){
        if (this.todos.length === 0) return true
      },
      todos: {
        get(){
          return this.$store.getters.getTodos
        },
        set(value){
          this.$store.dispatch('saveNewOrder', value)
        }
      },
      owners(){
        return this.$store.getters.getOwners
      },
      currentOwner: {
        get(){
          return this.$store.state.currentOwner
        },
        set(value){
          this.$store.commit('CHANGE_CURRENTOWNER', value)
        }
      }
    },

    methods: {
      
      display(todo){
        console.log(todo)
      },
      getPage: function(todo) {
        console.log('From the homepage', todo)
        this.$router.push( `/get/${todo.title}` )
      },

      goToFullPage(todo){
        console.log('Go to full page', todo)
        let title = todo.title
        return this.$router.push(`/get/${title}`)
      },
      
      validateAccount() {
        let owners = this.$store.state.owners
        if ( owners.includes(this.owner) ) this.account = true
        else this.warning = true 
        this.currentOwner = this.owner
        this.filtering = false
      },
      createAccount(){
        let newOwner = this.owner
        this.$store.commit('ADD_OWNER', newOwner)
        this.account = true
        this.warning = false
        this.filtering = false
      },
      changeOwner(){
        this.account = false
        this.filtering = false
      },
      filterTodosByOwner(owner){
        console.log('filteringTodos...', owner)
        this.filteredTodos = this.todos.filter(t => t.owner === owner)
        this.filtering = true
        this.selectedOwner = owner
        this.currentOwner = owner
      }
    },
    mounted(){
      this.$store.commit('RESET_WITH_STORAGE')
    },
    components: {
      AllTodos,
      WelcomeCard,
      FooterActions
    } 

}
</script>

<style>
#sel {
  display: block;
  width: 100%;
  padding: 1%;
  border: solid 1px gray;
  box-shadow: 1px 1px 1px 1px gray;
}

.list-item {
  margin: 2px 0;
  border: solid 1px gray;
  padding: 3px;
  cursor: pointer;
}
</style>

