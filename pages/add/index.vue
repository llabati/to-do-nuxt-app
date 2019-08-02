<template>
  
<v-layout  row  justify-center  align-center>
    <v-flex xs12 md10>
      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Ajouter une tâche</v-card-title>
        <v-card-text>
          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
          
          
        </v-card-text>
        <sub-header :headerMessage="headerMessage"></sub-header>
        <display-todo :todo="todo" :ind="ind" :get="get" :put="put" :add="add" v-on:addingTitle="setTitle" v-on:addingTodo="buildThisTodo"></display-todo>
        
      <footer-actions :notodo="notodo" :getpage="getpage" :addpage="addpage"></footer-actions>
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
      welcomeMessage: 'Ajouter une tâche... c\'est en avoir supprimé d\'autres avant.',
      headerMessage: 'Caractéristiques de la tâche à ajouter',
      one: false,
      two: false,
      title: '',
      content: '',
      owner: '',
      date: {},
      change: false,
      newOwner: '', 
      advancement: 0,
      day: '',
      month: '',
      year: '',
      notodo: false,
      getpage: true,
      putpage: false,
      deletepage: false,
      addpage: false,
      get: false,
      put: false,
      add: true,
      todo:{},
      ind: '',
      newTodo: {}
      //newTitle:''


    }
  },
  /*computed: {
    owner() {
        if (this.newOwner === '') return this.$store.state.currentOwner
        else return this.newOwner
      },
      newTitle(){
        if ( this.buildThisTodo ) return this.buildThisTodo(newTitle)
        else return ''
      },
      /*title(){
        return this.$store.state.title
      } 
      
  }, */
  methods: {
    setTitle(title){
      console.log('SETTITLE')
      this.title = title
      console.log('THISTITLE', this.title)
    },
    setContent(content){
      this.content = content
    },
    setOwner(owner){
      this.owner = owner
    },
    setAdvancement(advancement){
      this.advancement = advancement
    },
    setDay(day){
      this.day = day
    },
    setMonth(month){
      this.month = month
    },
    setYear(year){
      this.year = year
    },
    buildThisTodo(newTodo){
      /*this.newTodo.title = this.title
      this.newTodo.content = this.content
      this.newTodo.owner = this.owner
      this.newTodo.advancement = this.advancement
      this.newTodo.day = this.day
      this.newTodo.month = this.month
      this.newTodo.year = this.year */
      console.log('buildthistodo')
      this.newTodo = newTodo
      
    },
    addThisTodo(){
      console.log('ADD RECEIVING NEWTODO', this.newTodo, newTodo)
      this.$store.dispatch('addNewTodo', this.newTodo)
      /*let newTodo = {}
      newTodo.title = this.title
      newTodo.content = this.content
      newTodo.owner = this.owner
      newTodo.advancement = this.advancement
      newTodo.date = this.date 
      this.$store.dispatch('addNewTodo', newTodo)
      //this.title = ''
      //this.content = ''*/

    },
    
    changeOwner(){
      this.change = true
    },
    
  },
  components: {
    WelcomeCard,
    SubHeader,
    DisplayTodo,
    FooterActions
  }
  
}
</script>

