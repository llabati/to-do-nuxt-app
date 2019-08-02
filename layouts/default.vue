<template>
  <v-app info>
    
    <v-toolbar :clipped-left="clipped" fixed app>
      <!--<v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      -->
      <v-toolbar-title class="deep-orange--text text--darken-4" v-text="title"/>
      
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    
    
  </v-app>
  
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        /*drawer: true,
        fixed: false,
        items: [
          { icon: 'view_list', title: 'Liste des tâches', to: '/' },
          { icon: 'search', title: 'Consulter', to: '/get' },
          { icon: 'playlist_add', title: 'Ajouter', to: '/add' },
          { icon: 'update', title: 'Mettre à jour', to: '/put' },
          { icon: 'cancel', title: 'Effacer', to: '/delete' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false, */
        title: 'A faire ! Une TodoList signée Ludovic Labati'
      }
    }
  }
</script>
