<template>
    <v-list>
      <span v-if="!filtering">Il y a <strong>{{ todos.length }} tâches</strong> en tout. Les tâches sur fond rouge deviennent urgentes.</span>
      <span v-if="filtering">Il y a <strong>{{ filteredTodos.length }} tâches </strong>pour <strong>{{ selectedOwner }}</strong>. Les tâches sur fond rouge sont urgentes.</span> 
      <draggable v-if="!filtering" v-model="todos">
        <v-list-tile v-for="(todo, index) in todos" :key="todo.id" class="list-item" :class="{ red: todo.day - new Date().getDate() <= 5 }">
          <v-list-tile-content @click="$router.push(`/get/${todo.title}`)"><span :class="{ done: todo.advancement === 100 }">{{ index + 1 }} -- {{ todo.title }}</span></v-list-tile-content>
          <div class="text-xs-right">
            <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
            <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
          </div>
        </v-list-tile>
      </draggable>
      <draggable v-if="filtering" v-model="filteredTodos">
      <v-list-tile v-for="(todo, index) in filteredTodos" :key="todo.id" class="list-item" :class="{ red: todo.day - new Date().getDate() <= 5 }" @click="$router.push(`/get/${todo.title}`)"><v-list-tile-content>{{ index + 1 }} -- {{ todo.title }}</v-list-tile-content>
        <div class="text-xs-right">
          <v-chip color="orange"><v-icon left>update</v-icon><nuxt-link class="link" style="text-decoration: none;" :to="`/put/${todo.title}`">Mettre à jour</nuxt-link></v-chip>
          <v-chip color="red"><nuxt-link class="link" :to=" `/delete/${todo.title}` "><v-icon center>delete</v-icon></nuxt-link></v-chip>
        </div>
      </v-list-tile>
      </draggable>
  <!--<v-layout row wrap align-left>
    <v-btn large round color="gray" v-for="owner in owners" :key="owner.id" @click="filterTodosByOwner(owner)">{{ owner }}</v-btn>
    <v-btn large round color="green" class="white--text" @click="filtering = false">Liste complète</v-btn>
  </v-layout> -->
    </v-list>
      
</template>

<script>
//
import draggable from 'vuedraggable'
import compareToNow from '../middleware/computDate'
export default {
  props: {
    selectedOwner: String,
    filtering: Boolean,
    act: Boolean
  },
    
    components: {
        draggable
    },
    data(){
      return {
        owner: '',
        todo: {},
        filteredTodos: []

      }
    },
    computed: {
      
      todos: {
        get(){
          return this.$store.getters.getTodos
        },
        set(value){
          this.$store.dispatch('saveNewOrder', value)
        }
      },
    },
    watch: {
      act(){
        return this.filterTodosByOwner(this.selectedOwner)
      }
    },

    methods: {
      getPage: function(todo) {
        this.$router.push( `/get/${todo.title}` )
      },
      changeOwner(){
        this.account = false
        this.filtering = false
      },
      filterTodosByOwner(selectedOwner){
        console.log('filteringTodos...', selectedOwner)
        this.filteredTodos = this.todos.filter(t => t.owner === selectedOwner)
        this.filtering = true
        //this.selectedOwner = owner
        this.currentOwner = owner
      },

      filterTodosByOwner(owner){
        this.filteredTodos = this.todos.filter(t => t.owner === owner)
        this.filtering = true
        this.selectedOwner = owner
        this.currentOwner = owner
      },
      saveNewOrder(payload){
        const todos = []
        payload.map(todo => {
          todos.push(todo)
        })
        this.$emit('reordering', todos)  
      }
    },
    mounted(){
      this.$store.dispatch('resetTodosWithStorage')
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
.done::after {
  content: ' TÂCHE TERMINEE !';
  font-weight: 600;
  color: green;
}
</style>

