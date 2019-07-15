<template>
  <v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>

      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Effacer une tâche</v-card-title>
        <v-card-text>
          <p>Supprimer une tâche... est un moyen de pouvoir ajouter une autre tâche.</p>
          <div class="text-xs-right">
            <em><small>Ludovic Labati</small></em>
          </div>
          <hr class="my-3">
          
        </v-card-text>
        
      </v-card>
      <v-toolbar>
          <v-toolbar-title>Tâche à supprimer pour {{ todo.owner }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-alert success v-if="success">Cette tâche vient d'être supprimée.</v-alert>
      </v-toolbar>
      <v-card>
        <v-card-title class="headline">{{ headline }}</v-card-title>
          <v-card-actions>
              <div class="text-xs-right"><v-chip id="del" color="red" v-on:click="deleteThisTodo(todo)">Confirmer la suppression</v-chip></div>
          </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {

    data(){
        return {
            title: this.$route.params.index,
            success: false
        }
    },
    computed: {
        
        todo(title){
            return this.$store.state.todos.todos.find(t => t.title === this.title)
        },
        headline(){
            return `La tâche "${this.todo.title}" va être supprimée.`
        }
    },
    
    methods: {
        deleteThisTodo: function(title){
          this.$store.commit('todos/DELETE_TODO', this.title)
          this.success = true
          setTimeout(this.$router.push('/'), 5000)
        }
    }
    
}
</script>