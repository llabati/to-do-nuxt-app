<template>
  <v-layout
    row
    justify-center
    align-center>
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
        <display-todo :todo="todo" :ind="ind" :put="put"></display-todo>
        <!--<v-card-text>
            <v-list two-line style="margin-bottom: 20px">
                <v-list-tile>
                 <p class="inline-small"><strong>Titre : </strong></p><p class="inline-large"><strong>{{ todo.title }}</strong></p><br>
               </v-list-tile>
               <v-list-tile>
                <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier le titre" v-model="title"></v-text-field></v-list-tile-content>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small"><strong>Description : </strong></p><p class="inline-large">{{ todo.content }}</p>
               </v-list-tile>
               <v-list-tile>
                  <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier la description" v-model="content"></v-text-field></v-list-tile-content>
               </v-list-tile>         
               <v-list-tile>
                 <p class="inline-small"><strong>Responsable : </strong></p><p class="inline-large" style="color: red;">{{ todo.owner }}</p>
               </v-list-tile>  
               <v-list-tile>
                 <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier le responsable" v-model="owner"></v-text-field></v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                 <div class="inline-small" style="padding-top: 10px"><p><strong>Avancement : </strong></p></div><v-progress-circular :rotate="-90" :size="60" :width="10" :value="todo.advancement" color="blue">{{ todo.advancement }}</v-progress-circular>
                <v-list-tile-content><p>Modifier l'avancement : </p>
                  <div>
                    <v-btn v-if="todo.advancement === 0" @click="changeAdvancement(20)">20</v-btn>
                    <v-btn v-if="todo.advancement < 40" @click="changeAdvancement(40)">40</v-btn>
                    <v-btn v-if="todo.advancement < 60" @click="changeAdvancement(60)">60</v-btn>
                    <v-btn v-if="todo.advancement < 80" @click="changeAdvancement(80)">80</v-btn>
                    <v-btn v-if="todo.advancement < 100" @click="changeAdvancement(100)">100</v-btn> 
                    </div>
                </v-list-tile-content>
               </v-list-tile>
                    
            </v-list>
            <v-chip class="link" color="orange" v-on:click="setChange(todo)">Modifier</v-chip>
        </v-card-text> -->
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
      put: true
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
    setToCompleted: function(todo){
            let btnTrue = this.$refs.true
            let progress = this.$refs.prog
            btnTrue.style.display='none'
            progress.textContent = "Fini"
            this.todo.advancement = 100;
            console.log('set to completed', this.todo)
            this.setChange(null, null, null, true)

        },
        changeAdvancement(value){
          this.advancement = value
        },
        setChange: function(){
          
          console.log('TODO avant commit update')
          let res = {
            ind: this.ind,
            title: this.title,
            owner: this.owner,
            content: this.content,
            advancement: this.advancement 
          }
          /*if (this.title !== '') this.todo.title = this.title
          if (this.owner !== '') this.todo.owner = this.owner
          if (this.content !== '') this.todo.content = this.content
          if (this.advancement !== '') this.todo.advancement = this.advancement  */
          console.log('TODO JUST BEFORE UPDATE COMMIT', res)
          this.$store.commit('UPDATE_TODO', res)
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


