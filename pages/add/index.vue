<template>
  
<v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>
      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Ajouter une tâche</v-card-title>
        <v-card-text>
          <p>Ajouter une tâche... c'est en avoir supprimé d'autres avant.</p>
          <div class="text-xs-right">
            <em><small>Ludovic Labati</small></em>
          </div>
          
        </v-card-text>
        <v-toolbar>
              <v-toolbar-title>Caractéristiques de la tâche à ajouter</v-toolbar-title>
        </v-toolbar>
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
                <!-- component ActionItem -->
                <!--<v-list-tile>
                    <v-list-tile-content xs12>
                      <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
          
   
  
        
            
              
                    </v-list-tile-content>
                </v-list-tile>  -->
                <v-list-tile>
                    <v-list-tile-content>
                        <p>Responsable de la tâche: {{ owner }}<v-chip color="amber lighten-4" @click="changeOwner">Changer le responsable</v-chip></p>
                    </v-list-tile-content>
                    <v-list-tile-content v-if="change" xs12>
                      <v-text-field style="display: block; width: 100%;" ref="owner" solo label="Nouveau responsable" placeholder="Nouveau responsable" v-model="newOwner"></v-text-field>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>   
        </v-card-text>
        <v-card-actions>
            <v-chip color="green" class="white--text" v-on:click="addThisTodo">Confirmez l'ajout</v-chip>
            <v-chip color="primary" class="white--text" v-on:click="$router.push('/')">Retour à la liste</v-chip>
        </v-card-actions> 

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  
  data(){
    return {
      title: '',
      content: '',
      date: '',
      change: false,
      newOwner: ''
      
    //date: new Date().toISOString().substr(0, 10),
    //dateFormatted: formatDate(new Date().toISOString().substr(0, 10)),
    //menu1: false,
    }
  },
  computed: {
    owner() {
        if (this.newOwner === '')
        return this.$store.state.currentOwner
        else
        return this.newOwner
      }

    /*computedDateFormatted () {
      return this.formatDate(this.date)
    } */
  },
/*
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  }, */
  methods: {
    addThisTodo(){
      //console.log('before commit', this.$store.state.todos)
      let newTodo = {}
      newTodo.title = this.title
      newTodo.content = this.content
      newTodo.owner = this.owner
      this.$store.commit('ADD_NEWTODO', newTodo)
      //console.log('After commit newTodo', newTodo)
      this.title = ''
      this.content = ''

    },
    changeOwner(){
      this.change = true
    },/*
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    } */
  }
  
}
</script>

