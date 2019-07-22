<template>
  
<v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>
      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Ajouter une tâche</v-card-title>
        <v-card-text>
          <welcome-card :welcomeMessage="welcomeMessage"></welcome-card>
          
          
        </v-card-text>
        <sub-header :headerMessage="headerMessage"></sub-header>
        <!--<v-toolbar>
              <v-toolbar-title>Caractéristiques de la tâche à ajouter</v-toolbar-title>
        </v-toolbar> -->
        <v-card-text>
            <v-list two-line>
                <!-- component ActionItem -->
                <v-list-tile>
                    <v-list-tile-content xs12>
                        <v-text-field style="display: block; width: 100%;" ref="title" solo label="Titre de la tâche" placeholder="Donnez un titre" v-model="title"></v-text-field>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- component ActionItem -->
                <v-list-tile>
                    <v-list-tile-content xs12>
                        <v-textarea ref="content" auto-grow rows="3" style="display: block; width: 100%;" solo placeholder="Décrivez la tâche" v-model="content"></v-textarea>
                    </v-list-tile-content>
                </v-list-tile>
                
                <v-list-tile>
                    <v-list-tile-content>
                        <p>Responsable de la tâche: {{ owner }}<v-chip color="amber lighten-4" @click="changeOwner">Changer le responsable</v-chip></p>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="change">
                    <v-list-tile-content>
                      <v-text-field v-show="change" style="display: block; width: 100%;" ref="owner" solo label="Nouveau responsable" v-model="newOwner"></v-text-field>
                    </v-list-tile-content>
                </v-list-tile>  

                <v-list-tile style="margin-top: 20px;">
                    <v-list-tile-content>
                        <p>Avancement de la tâche: {{ advancement }}</p>
                        <div>
                    <v-btn @click="setAdvancement(20)">20</v-btn>
                    <v-btn @click="setAdvancement(40)">40</v-btn>
                    <v-btn @click="setAdvancement(60)">60</v-btn>
                    <v-btn @click="setAdvancement(80)">80</v-btn>
                    </div>
                    </v-list-tile-content>
                    
                </v-list-tile>
            </v-list>   
        </v-card-text>
        <v-card-actions>
            <v-chip color="green" class="white--text" v-on:click="addThisTodo">Confirmez l'ajout</v-chip>
            <!--<v-chip color="blue" class="white--text" v-on:click="$router.push('/')">Retour à la liste</v-chip> -->
        </v-card-actions> 

      <footer-actions :notodo="notodo" :getpage="getpage" :addpage="addpage"></footer-actions>
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
      welcomeMessage: 'Ajouter une tâche... c\'est en avoir supprimé d\'autres avant.',
      headerMessage: 'Caractéristiques de la tâche à ajouter',
      one: false,
      two: false,
      title: '',
      content: '',
      date: '',
      change: false,
      newOwner: '', 
      advancement: 0,
      notodo: false,
      getpage: true,
      putpage: false,
      deletepage: false,
      addpage: false

    }
  },
  computed: {
    owner() {
        if (this.newOwner === '')
        return this.$store.state.currentOwner
        else
        return this.newOwner
      }
  },
  methods: {
    addThisTodo(){
      //console.log('before commit', this.$store.state.todos)
      let newTodo = {}
      newTodo.title = this.title
      newTodo.content = this.content
      newTodo.owner = this.owner
      newTodo.advancement = this.advancement
      this.$store.commit('ADD_NEWTODO', newTodo)
      //console.log('After commit newTodo', newTodo)
      this.title = ''
      this.content = ''

    },
    changeOwner(){
      this.change = true
    },
    setAdvancement(value){
      this.advancement = value
      }
  },
  components: {
    WelcomeCard,
    SubHeader,
    FooterActions
  }
  
}
</script>

