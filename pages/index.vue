<template>

  <v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>
      <v-card>
        <v-tooltip bottom color="blue"><v-card-title slot="activator" class="headline amber lighten-4 indigo--text text--darken-3">Ma liste des tâches</v-card-title><span>Pour voir les détails, cliquez sur la tâche.</span></v-tooltip>

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
            <p v-if="warning" style="color: red; margin-bottom: 10px;"><strong>Vous ne semblez pas être déjà indentifié. Veuillez créer votre compte.</strong></p>
          
            <p>Tous les utilisateurs identifiés peuvent déposer leurs tâches et en noter l'avancement. <strong>Bienvenue à tous ! </strong></p>
            <div class="text-xs-right">
              <em><small>Ludovic Labati</small></em>
            </div>
            <div v-if="account">
              <div v-if="currentOwner">
                <h3>Bienvenue à {{ currentOwner }} !</h3>
                <p>Vous n'êtes pas {{ currentOwner }} ? <v-chip @click="changeOwner">Identifiez-vous ici</v-chip></p>
              </div>
              <div v-else>
                <h3>Bienvenue à {{ owner }} !</h3>
                <p>Vous n'êtes pas {{ owner }} ? <v-chip @click="changeOwner">Identifiez-vous ici</v-chip></p>
              </div>
              <v-list v-if="!filtering">
                <span>Il y a <strong>{{ todos.length }} tâches</strong> en tout.</span>
                <!-- component "SimpleTodo"  -->
                <v-list-tile v-for="(todo, index) in todos" :key="todo.id" style="cursor: pointer;" 
                @click="$router.push(`/get/${todo.title}`)"
                ><v-list-tile-content>{{ index + 1 }} -- {{ todo.title }}</v-list-tile-content>
                  <div class="text-xs-right">
                    <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
                    <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
                  </div>
                </v-list-tile>
              </v-list>
              <v-list v-else>
                <span>Il y a <strong>{{ filteredTodos.length }} tâches </strong>pour <strong>{{ selectedOwner }}</strong>.</span>  
                <!-- component "SimpleTodo"  -->
                <v-list-tile v-for="(todo, index) in filteredTodos" :key="todo.id" style="cursor: pointer;" @click="$router.push(`/get/${todo.title}`)"><v-list-tile-content>{{ index + 1 }} -- {{ todo.title }}</v-list-tile-content>
                  <div class="text-xs-right">
                    <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
                    <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
                  </div>
                </v-list-tile>
              </v-list>
                
            <v-layout row wrap align-left>
              <v-btn large round color="gray" v-for="owner in owners" :key="owner.id" @click="filterTodosByOwner(owner)">{{ owner }}</v-btn>
              <v-btn large round color="green" class="white--text" @click="filtering = false">Liste complète</v-btn>
            </v-layout>
              <div>
                <p>{{ invitation }}
                  <v-chip class="elevation-2" color="green"><nuxt-link class="link white--text" style="text-decoration: none; float: right;" to="/add"><strong>Nouvelle tâche</strong></nuxt-link></v-chip>
                </p>
              </div>
              
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
export default {
    data(){
      return {
        owner: '',
        account: false,
        filtering: false,
        warning: false,
        selectedOwner: '',
        filteredTodos: []

      }
    },
    computed: {
      invitation(){
        console.log('TODOS FOR INVITATION', this.todos)
        if (!this.todos) return 'N\'hésitez pas à créer une tâche !'
        else return
      },
      todos() {
        //console.log(this.$store)
        //console.log('GET TODOS', this.$store.state.todos.todos)
        return this.$store.getters.getTodos
      },
      owners(){
        return this.$store.getters.getOwners
        //if (this.$store.state.owners.length > 0) return this.$store.state.owners
        //else return JSON.parse(localStorage.getItem('owners'))
      },
      currentOwner(){
        return this.$store.state.currentOwner
      }
    },
    watch: {
      filtering(){
        console.log('Filtering')
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
      },
      getData(){
        //todos
        this.$store.dispatch('todos/resetWithStorage')
        //owners
        this.$store.dispatch('resetWithStorage')
      }
    },/*
    created(){
      this.$store.dispatch('resetWithStorage')
      //console.log('CREATED BEFORE STORAGE', localStorage.getItem('owners'))
      //this.$store.commit('todos/RETRIEVE_TODOS')
      //console.log(localStorage.getItem('owners'))
      //this.owner = this.localStorage.getItem('owner')
      //this.getData()
    },*/
    mounted(){
      this.$store.commit('RESET_WITH_STORAGE')
      //this.$store.dispatch('todos/resetWithStorage')
      //console.log('MOUNTED AFTER STORAGE', window.localStorage.getItem('todos'))
      //this.todos = JSON.parse(window.localStorage.getItem('todos'))
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
</style>

