<template>
  <v-layout row  justify-center  align-center>
    <v-flex xs12 md10>

      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Effacer une tâche</v-card-title>
        <v-card-text>
          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
          
          <hr class="my-3">
          
        </v-card-text>
        
      </v-card>
      <sub-header :headerMessage="headerMessage"></sub-header>
      
      <v-card>
        <v-card-title class="headline">{{ headline }}</v-card-title>
          <v-card-actions>
              <div class="text-xs-right"><v-chip id="del" color="red" v-on:click="deleteThisTodo(todo)">Confirmer la suppression</v-chip></div>
          </v-card-actions>
      <footer-actions :notodo="notodo" :getpage="getpage" :putpage="putpage" :deletepage="deletepage" :addpage="addpage" :todo="todo"></footer-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import WelcomeCard from '../../components/WelcomeCard'
import FooterActions from '../../components/FooterActions'
import SubHeader from '../../components/SubHeader'
export default {

    data(){
        return {
          success: false,
          welcomeMessage: 'Supprimer une tâche... est un moyen de pouvoir ajouter une autre tâche.',
          notodo:false,
          getpage: true,
          putpage: false,
          deletepage: false,
          addpage: false
        }
    },
    computed: {
        headerMessage() {
          return `Tâche à supprimer pour ${this.todo.owner}`
        },
        title() {
          return this.$route.params.index
        },
        
        todo(title){
            return this.$store.state.todos.find(t => t.title === this.title)
        },
        headline(){
            return `La tâche "${this.todo.title}" va être supprimée.`
        },

    },
    
    methods: {
        deleteThisTodo: function(title){
          this.$store.dispatch('deleteTodo', this.title)
          this.success = true
          setTimeout(this.$router.push('/'), 5000)
        }
    },
    components: {
      WelcomeCard,
      SubHeader,
      FooterActions
    }
    
}
</script>