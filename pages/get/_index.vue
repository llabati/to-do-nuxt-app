<template>
  
<v-layout row justify-center align-center>
    <v-flex xs12 md10>

      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Consulter une tâche</v-card-title>
        <v-card-text>
          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
          
          <hr class="my-3">
          
        </v-card-text>
        
      </v-card>
      <sub-header :headerMessage="headerMessage"></sub-header>
      
   <v-card>
     <display-todo :todo="todo" :ind="ind" :put="put" :get="get"></display-todo>
     <div>  
            <v-chip class="elevation-2" color="green"><nuxt-link class="link white--text" style="text-decoration: none; float: right;" :to="`/put/${this.todo.title}`"><strong>Mettre à jour</strong></nuxt-link></v-chip>
            <v-chip class="elevation-2" color="red"><nuxt-link class="link white--text" style="text-decoration: none; float: right;" :to="`/delete/${this.todo.title}`"><strong>Supprimer</strong></nuxt-link></v-chip>           
            <v-chip class="elevation-2" color="green" right><nuxt-link class="link white--text" style="text-decoration: none;" :to="'/'">Retour à la liste</nuxt-link></v-chip> 
     </div>
    </v-card>
    
    </v-flex>
  </v-layout>
</template>

<script>
//<v-icon center>delete</v-icon>
import { mutations } from 'vuex'
import WelcomeCard from '../../components/WelcomeCard'
import SubHeader from '../../components/SubHeader'
import DisplayTodo from '../../components/DisplayTodo'
import FooterActions from '../../components/FooterActions'
import { getNow, compareToNow } from '../../middleware/computDate'
export default {
  data(){
    return {
      welcomeMessage: 'Découvrir une tâche... c\'est presque la résoudre.',
      notodo: false,
      getpage: false,
      putpage: true,
      deletepage: true,
      addpage: false,
      one: true,
      two: false,
      put: false,
      get: true,
      add: false
    }
  },
  computed: {
    ind(){
      return this.$route.params.index
    },
    todo(){
      return this.$store.state.todos.find(t => t.title === this.ind)
    },
    headerMessage(){
      return `Caractéristiques de " ${this.ind} "`
    },
    howManyDays(todo) {
      return compareToNow(this.todo)
    }
  },
  
  components: {
    WelcomeCard,
    DisplayTodo,
    SubHeader,
    FooterActions
  }
}
</script>

<style>
.inline-small {
  display: 'inline-block';
  width: 25%;
}
.inline-large {
  display: 'inline-block';
  width: 70%;
}
</style>


