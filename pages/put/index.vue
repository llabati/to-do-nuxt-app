<template>
  <v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md10>
      
      <v-card>
        <v-card-title class="headline amber lighten-4 indigo--text text--darken-3">Mettre une tâche à jour</v-card-title>
        <v-card-text>
          <p>Mettre une tâche à jour... c'est savourer par anticipation le moment où on la terminera.</p>
          <div class="text-xs-right">
            <em><small>Ludovic Labati</small></em>
          </div>
          <hr class="my-3">
          
        </v-card-text>
        <v-toolbar>
          <v-toolbar-title>Caractéristiques à modifier</v-toolbar-title>
      </v-toolbar>  
      <v-card>   
        <v-card-text>
            <v-list two-line>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Titre actuel de la tâche : </v-list-tile-title>
                    <v-list-tile-sub-title class="strong">{{ todo.titre }}</v-list-tile-sub-title></v-list-tile-content>
                    <v-list-tile-content><v-list-tile-action><v-text-field solo placeholder="Modifier le titre" v-model="titre"></v-text-field></v-list-tile-action></v-list-tile-content></v-list-tile>
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Responsable de la tâche : </v-list-tile-title>
                    <v-list-tile-sub-title class="strong">{{ todo.responsable }}</v-list-tile-sub-title></v-list-tile-content>
                    <v-list-tile-content><v-list-tile-actions><v-text-field solo placeholder="Modifier le responsable" v-model="responsable"></v-text-field></v-list-tile-actions></v-list-tile-content></v-list-tile>
                
                <v-list-tile><v-list-tile-content><v-list-tile-title class="strong">Etat d'avancement :</v-list-tile-title>
                    <v-list-tile-sub-title id="prog" class="strong"> {{ todo.avancement ? 'Fini' : 'En cours' }}</v-list-tile-sub-title></v-list-tile-content>
                    
                    <v-list-tile-actions><v-chip id="true" color="blue" v-show="todo.avancement===false" v-on:click="setToCompleted">Marquer comme fait</v-chip></v-list-tile-actions></v-list-tile> 
            </v-list>
            <v-chip class="link" color="orange" v-on:click="setChange(todo)">Modifier</v-chip>
        </v-card-text>
      </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

