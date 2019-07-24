<template>
  
<v-layout
    row
    justify-center
    align-center>
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
     <display-todo :todo="todo" :ind="ind" :put="put"></display-todo>
       <!--<v-card-text>
           
           <v-list v-if="todo" two-line style="margin-bottom: 20px">
               <v-list-tile>
                 <p class="inline-small"><strong>Titre : </strong></p><p class="inline-large"><strong>{{ todo.title }}</strong></p>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small">Description : </p><p class="inline-large">{{ todo.content }}</p>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small">Responsable : </p><p class="inline-large" style="color: red;">{{ todo.owner }}</p>
                </v-list-tile>
               <v-list-tile>
                 <p class="inline-small">Date de réalisation : </p><p class="inline-large">{{ todo.date.day }} / {{ todo.date.month }} / {{ todo.date.year }}</p>
                 <p>{{ howManyDays }}</p>
               </v-list-tile>                
               <v-list-tile>
                 <div class="inline-small" style="padding-top: 10px"><p>Avancement : </p></div><v-progress-circular :rotate="-90" :size="60" :width="10" :value="todo.advancement" color="blue">{{ todo.advancement }}</v-progress-circular>
               </v-list-tile>
            </v-list>
            </v-card-text> -->
            <v-chip class="elevation-2" color="green"><nuxt-link class="link white--text" style="text-decoration: none; float: right;" :to="`/put/${this.todo.title}`"><strong>Mettre à jour</strong></nuxt-link></v-chip>           
            <v-chip color="red"><nuxt-link class="link white--text" style="text-decoration: none;" :to=" `/delete/${this.todo.title}` "><v-icon center>delete</v-icon></nuxt-link>Supprimer</v-chip>
            <v-chip color="green" right><nuxt-link class="link white--text" style="text-decoration: none;" :to="'/'">Retour à la liste</nuxt-link></v-chip> 
    </v-card>
    
    </v-flex>
  </v-layout>
</template>

<script>
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
      put: false
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


