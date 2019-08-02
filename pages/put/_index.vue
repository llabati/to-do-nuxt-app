<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 md10>
      
      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Mettre une tâche à jour</v-card-title>
        <v-card-text>
          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
          
          <hr class="my-3">
          
        </v-card-text>
      </v-card>
      <sub-header :headerMessage="headerMessage"></sub-header>
      
      <v-card>   
        <display-todo :todo="todo" :ind="ind" :get="get" :put="put" :add="add"></display-todo>
        
      <footer-actions :notodo="notodo" :getpage="getpage" :putpage="putpage" :deletepage="deletepage" :addpage="addpage" :todo="todo"></footer-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import WelcomeCard from '../../components/WelcomeCard'
import SubHeader from '../../components/SubHeader'
import FooterActions from '../../components/FooterActions'
import DisplayTodo from '../../components/DisplayTodo'
export default {
  data(){
    return {
      welcomeMessage: 'Mettre une tâche à jour... c\'est savourer par anticipation le moment où on la terminera.',
      title: '',
      owner: '',
      content: '',
      advancement: '',
      update: {},
      notodo: false,
      getpage: true,
      putpage: false,
      deletepage: false,
      addpage: false,
      get: true,
      put: true,
      add: false,
      updated: {}
    }
  },
  computed: {
    headerMessage(){
      return `Caractéristiques de " ${this.todo.title} "`
    },
    ind(){
      return this.$route.params.index
    },
    todo(){
      return this.$store.state.todos.find( t => t.title === this.ind )
    }
  },
  methods: {
    setTitle(){
      this.title = this.$store.state.title
    },
    setContent(){
      this.content = this.$store.state.content
    },
    setOwner(){
      this.owner = this.$store.state.owner
    },
    setAdvancement(){
      this.advancement = this.$store.state.advancement
    },
    setDay(){
      this.day = this.$store.state.day
    },
    setMonth(){
      this.month = this.$store.state.month
    },
    setYear(){
      this.year = this.$store.state.year
    },
    setChange: function(){
        this.updated.ind = this.ind,
        this.updated.title = this.title,
        this.updated.owner = this.owner,
        this.updated.content = this.content,
        updatad.advancement = this.advancement 
        let date = {}
        date.day = this.day
        date.month = this.month
        date.year = this.year
        this.updated.date = date
        this.$store.dispatch('addNewTodo', this.update)

      
      console.log('TODO JUST BEFORE UPDATE COMMIT', res)
      this.$store.dispatch('updateTodo', res)
      this.$router.push('/')
    }
  },
  components: {
    WelcomeCard,
    SubHeader,
    DisplayTodo,
    FooterActions
  }
}
</script>


