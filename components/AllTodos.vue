<template>
    <v-list>
                <span v-if="!filtering">Il y a <strong>{{ todos.length }} tâches</strong> en tout. Les tâches sur fond rouges deviennent urgentes.</span>
                <span v-if="filtering">Il y a <strong>{{ filteredTodos.length }} tâches </strong>pour <strong>{{ selectedOwner }}</strong>. Les tâches sur fond rouge sont urgentes.</span> 
                <draggable v-if="!filtering" v-model="todos" group="todos">
                <v-list-tile v-for="(todo, index) in todos" :key="todo.id" class="list-item" :class="{ red: todo.date.day - new Date().getDate() < 5 }"
                @click="$router.push(`/get/${todo.title}`)"
                ><v-list-tile-content>{{ index + 1 }} -- {{ todo.title }}</v-list-tile-content>
                  <div class="text-xs-right">
                    <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
                    <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
                  </div>
                </v-list-tile>
                </draggable>
                <draggable v-if="filtering" v-model="filteredTodos">
                <v-list-tile v-for="(todo, index) in filteredTodos" :key="todo.id" class="list-item" :class="{ red: todo.date.day - new Date().getDate() < 5 }" 
                @click="$router.push(`/get/${todo.title}`)"><v-list-tile-content>{{ index + 1 }} -- {{ todo.title }}</v-list-tile-content>
                  <div class="text-xs-right">
                    <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
                    <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
                  </div>
                </v-list-tile>
                </draggable>
            <v-layout row wrap align-left>
              <v-btn large round color="gray" v-for="owner in owners" :key="owner.id" @click="filterTodosByOwner(owner)">{{ owner }}</v-btn>
              <v-btn large round color="green" class="white--text" @click="filtering = false">Liste complète</v-btn>
            </v-layout>
    </v-list>
      
</template>

<script>
import draggable from 'vuedraggable'
import compareToNow from '../middleware/computDate'
export default {
    props: {
        //red: todo.date.day - new Date().getDate() < 5 }
        //todos: Array,
        //filteredTodos: Array,
        //filtering: Boolean,
        //selectedOwner: String
    },
    components: {
        draggable
    },
    data(){
      return {
        owner: '',
        account: false,
        filtering: false,
        warning: false,
        selectedOwner: '',
        filteredTodos: []
        
      }
    },
    computed: {
      invitation(){

        if (!this.todos) return 'N\'hésitez pas à créer une tâche !'
        else return
      },
      notodo(){
        if (this.todos.length === 0) return true
      },
      todos: {
        get(){
          return this.$store.getters.getTodos
        },
        set(value){
          this.$store.dispatch('saveNewOrder', value)
        }
      },/*
      restDays(){
          compareToNow(todo)
      },
      urgent(){
          if(this.restDays < 5) return true
          else return false
      },*/
      owners(){
        return this.$store.getters.getOwners
      },
      currentOwner: {
        get(){
          return this.$store.state.currentOwner
        },
        set(value){
          this.$store.commit('CHANGE_CURRENTOWNER', value)
        }
      }
    },

    methods: {
      
      getPage: function(todo) {
        console.log('From the homepage', todo)
        this.$router.push( `/get/${todo.title}` )
      },

      
      changeOwner(){
        this.account = false
        this.filtering = false
      },
      filterTodosByOwner(owner){
        console.log('filteringTodos...', owner)
        this.filteredTodos = this.todos.filter(t => t.owner === owner)
        this.filtering = true
        this.selectedOwner = owner
        this.currentOwner = owner
      }
    },
    mounted(){
      this.$store.commit('RESET_WITH_STORAGE')
    }

}

</script>
<style>

.list-item {
  margin: 2px 0;
  border: solid 1px gray;
  padding: 3px;
  cursor: pointer;
}
.red {
    border: dashed 2px red;
    color: white;
}
</style>

