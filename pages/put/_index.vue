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
          <!--<p>Mettre une tâche à jour... c'est savourer par anticipation le moment où on la terminera.</p>
          <div class="text-xs-right">
            <em><small>Ludovic Labati</small></em>
          </div> -->
          <hr class="my-3">
          
        </v-card-text>
      </v-card>
      <sub-header :headerMessage="headerMessage"></sub-header>
      <!--  <v-toolbar>
          <v-toolbar-title>Caractéristiques de {{ todo.title }}</v-toolbar-title>
      </v-toolbar>  -->
      <v-card>   
        <v-card-text>
            <v-list two-line>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Titre actuel de la tâche : </v-list-tile-title>
                    <v-list-tile-sub-title class="strong"><!--{{ todo.title }}--></v-list-tile-sub-title></v-list-tile-content>
                    <v-list-tile-content><v-text-field solo placeholder="Modifier le titre" v-model="title"></v-text-field></v-list-tile-content></v-list-tile>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Responsable : </v-list-tile-title>
                    <v-list-tile-sub-title class="strong"><!--{{ todo.owner }}--></v-list-tile-sub-title></v-list-tile-content>
                    <v-list-tile-content><v-text-field solo placeholder="Modifier le responsable" v-model="owner"></v-text-field></v-list-tile-content></v-list-tile>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Description : </v-list-tile-title>
                  <v-list-tile-sub-title class="strong"><!--{{ todo.content }}--></v-list-tile-sub-title></v-list-tile-content>
                  <v-list-tile-content><v-text-field solo placeholder="Modifier la description" v-model="content"></v-text-field></v-list-tile-content></v-list-tile>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Modifier l'avancement : </v-list-tile-title>
                  <div>
                    <v-btn v-if="todo.advancement === 0" @click="changeAdvancement(20)">20</v-btn>
                    <v-btn v-if="todo.advancement < 40" @click="changeAdvancement(40)">40</v-btn>
                    <v-btn v-if="todo.advancement < 60" @click="changeAdvancement(60)">60</v-btn>
                    <v-btn v-if="todo.advancement < 80" @click="changeAdvancement(80)">80</v-btn>
                    <v-btn v-if="todo.advancement < 100" @click="changeAdvancement(100)">100</v-btn> 
                    </div>
                    <!--<v-list-tile-sub-title class="strong">{{ todo.advancement }}</v-list-tile-sub-title></v-list-tile-content>
                    <v-list-tile-content><v-input label="Modifier l'avancement" value="number" v-model="advancement"></v-input></v-list-tile-content> --></v-list-tile-content></v-list-tile>

                
                    
                    <!--<v-chip id="true" color="blue" v-show="todo.advancement===false" v-on:click="setToCompleted">Marquer comme fait</v-chip> -->
            </v-list>
            <v-chip class="link" color="orange" v-on:click="setChange(todo)">Modifier</v-chip>
        </v-card-text>
      <footer-actions :notodo="notodo" :getpage="getpage" :putpage="putpage" :deletepage="deletepage" :addpage="addpage" :todo="todo"></footer-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import WelcomeCard from '../../components/WelcomeCard'
import SubHeader from '../../components/SubHeader'
import FooterActions from '../../components/FooterActions'
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
      addpage: false
    }
  },
  computed: {
    headerMessage(){
      return `Caractéristiques de ${this.todo.title}`
    },
    ind(){
      console.log(this.$route.params.index)
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
    FooterActions
  }
}
</script>


