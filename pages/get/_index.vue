<template>
  
<v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>

      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Consulter une tâche</v-card-title>
        <v-card-text>
          <p>Découvrir une tâche... c'est presque la résoudre.</p>
          <div class="text-xs-right">
            <em><small>Ludovic Labati</small></em>
          </div>
          <hr class="my-3">
          
        </v-card-text>
        
      </v-card>
      <v-toolbar>
       <v-toolbar-title>Caractéristiques</v-toolbar-title>
   </v-toolbar>
   <v-card>
       <v-card-text>
           <!-- component "SimpleTodo" ??? -->
           <v-list v-if="todo">
               <v-list-tile>
                 <p class="inline-small"><strong>Titre : </strong></p><p class="inline-large"><strong>{{ todo.title }}</strong></p>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small">Description : </p><p class="inline-large">{{ todo.content }}</p>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small">Responsable : </p><p class="inline-large" style="color: red;">{{ todo.owner }}</p>
                </v-list-tile>
            </v-list>
            <!--<v-chip color="orange"><nuxt-link class="link" :to="`/put/${todo.title}`"><v-icon left>update</v-icon>Modifier cette tâche</nuxt-link></v-chip>
            <v-chip color="green" right><nuxt-link class="link" :to="'/'">Retour à la liste des tâches</nuxt-link></v-chip> -->
        </v-card-text>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mutations } from 'vuex'
export default {
  computed: {
    ind(){
      return this.$route.params.index
    },
    todo(){
      return this.$store.state.todos.find(t => t.title === this.ind)
    }
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


