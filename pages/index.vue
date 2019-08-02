<template>

  <v-layout row justify-center align-center>
    <v-flex xs12 md10>
      <v-card> 
        <v-tooltip bottom color="blue"><v-card-title slot="activator" class="headline amber lighten-4 indigo--text text--darken-3">Ma liste des tâches</v-card-title><span>Pour voir les détails, cliquez sur la tâche.</span></v-tooltip>
        
        <v-card-text>
            <v-form v-if="!currentOwner">
              <v-text-field v-model="owner" label="Votre Prénom" required></v-text-field>
    
              <v-btn color="green" class="white--text" @click="validateAccount">Connectez-vous</v-btn>
              <v-btn color="deep-orange lighten-4" @click="createAccount">Créez votre compte</v-btn>
            <p v-if="warning" style="color: red; margin-bottom: 10px;"><strong>Vous ne semblez pas être déjà identifié. Veuillez créer votre compte.</strong></p>
            </v-form> 

          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>

          <hr class="my-3">

          <div v-if="currentOwner">
            <div>
              <h3>Bienvenue à {{ currentOwner }} !</h3>
              <p>Vous n'êtes pas {{ currentOwner }} ? <v-chip @click="changeOwner">Identifiez-vous ici</v-chip></p>
            </div>
            
            <all-todos :filtering="filtering" :selectedOwner="selectedOwner" :act="act"></all-todos>
          <v-layout row wrap align-left>
            <v-btn large round color="gray" v-for="owner in owners" :key="owner.id" @click="filterNow(owner)">{{ owner }}</v-btn>
            <v-btn large round color="green" class="white--text" @click="filtering = false">Liste complète</v-btn>
          </v-layout>
          
          <footer-actions :notodo="notodo" :getpage="getpage" :putpage="putpage" :deletepage="deletepage" :addpage="addpage" :todo="todo"></footer-actions>
   
          </div>
          
        </v-card-text>
        
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import { getters, mutations } from 'vuex'
import WelcomeCard from '../components/WelcomeCard'
import FooterActions from '../components/FooterActions'
import AllTodos from '../components/AllTodos'

export default {
    data(){
      return {
        welcomeMessage: 'Tous les utilisateurs identifiés peuvent déposer leurs tâches et en noter l\'avancement. Bienvenue à tous !',
        owner: '',
        todo: {},
        account: false,
        filtering: false,
        warning: false,
        selectedOwner: '',
        act: false,
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
        if (this.todos) return false
        if ( !this.todos || this.todos.length === 0 ) return true
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
          if (this.$store.state.currentOwner) {
            this.warning = false
            return this.$store.state.currentOwner
          }
          //else return this.warning = true 
        },
        set(value){
          this.$store.dispatch('changeCurrentOwner', value)
        }
      }
    },

    methods: {

      validateAccount() {
        let owners = this.$store.state.owners
        if ( owners.includes(this.owner) ) {
          this.currentOwner = this.owner
          this.account = true
        }
        else this.warning = true
      },
      createAccount(){
        let newOwner = this.owner
        let owners = this.$store.state.owners
        if ( !owners.includes(newOwner) ) this.$store.dispatch('addOwner', newOwner)
        this.currentOwner = newOwner
        this.account = true
        this.warning = false
        this.filtering = false
      },
      changeOwner(){
        this.currentOwner = ''
        this.account = false
        this.warning = false
        this.filtering = false
      },
      filterNow(owner){
        this.filtering = true
        this.act = !this.act
        this.selectedOwner = owner
      },
      reorderTodos(todos){
        this.$store.dispatch('reorderTodos', todos)
      }
    },
    mounted(){
      this.$store.dispatch('resetOwnersWithStorage')
      //this.$store.dispatch('resetTodosWithStorage')
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

