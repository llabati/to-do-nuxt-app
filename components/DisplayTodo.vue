<template>
    <v-card-text>
            <v-list two-line style="margin-bottom: 20px">
                <v-list-tile v-if="get">
                 <p class="inline-small"><strong>Titre : </strong></p><p class="inline-large"><strong>{{ todo.title }}</strong></p><br>
               </v-list-tile>
               <v-list-tile v-if="put">
                <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" v-bind:placeholder="todo.title" v-model="title" ref="puttitle" @blur="updateTitle"></v-text-field></v-list-tile-content>
               </v-list-tile>
               <v-list-tile v-if="add">
                <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Donner un titre" v-model="title" ref="addtitle" @blur="retrieveTitle()"></v-text-field></v-list-tile-content>
               </v-list-tile>
               <v-list-tile v-if="get">
                 <p class="inline-small"><strong>Description : </strong></p><p class="inline-large">{{ todo.content }}</p>
               </v-list-tile>
               <v-list-tile v-if="put">
                  <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" v-bind:placeholder="todo.content" v-model="content" ref="putcontent" @blur="updateContent"></v-text-field></v-list-tile-content>
               </v-list-tile> 
               <v-list-tile v-if="add">
                  <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Ajouter la description" v-model="content" ref="addcontent" @blur="retrieveContent"></v-text-field></v-list-tile-content>
               </v-list-tile>        
               <v-list-tile v-if="get">
                 <p class="inline-small"><strong>Responsable : </strong></p><p class="inline-large" style="color: red;">{{ todo.owner }}</p>
               </v-list-tile>  
               <v-list-tile v-if="put">
                 <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" v-bind:placeholder="todo.owner"  v-model="owner" ref="putowner" @blur="updateOwner"></v-text-field></v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="add">
                 <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Indiquer le responsable" v-model="owner" ref="addowner" @blur="retrieveOwner"></v-text-field></v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="!add">
                 <div class="inline-small" style="padding-top: 10px"><p><strong>Avancement : </strong></p></div><v-progress-circular :rotate="-90" :size="60" :width="10" :value="todo.advancement" color="blue">{{ todo.advancement }}</v-progress-circular>
                  <div class="inline-large" style="margin-left: 3%;" v-if="put">
                    <p>Modifier l'avancement:</p>
                    <v-btn v-if="todo.advancement === 0" @click="setAdvancement(20)">20</v-btn>
                    <v-btn v-if="todo.advancement < 40" @click="setAdvancement(40)">40</v-btn>
                    <v-btn v-if="todo.advancement < 60" @click="setAdvancement(60)">60</v-btn>
                    <v-btn v-if="todo.advancement < 80" @click="setAdvancement(80)">80</v-btn>
                    <v-btn v-if="todo.advancement < 100" @click="setAdvancement(100)">100</v-btn> 
                    </div>
                </v-list-tile>
                <v-list-tile>
                <v-list-tile-content v-if="add"><p>Evaluer l'avancement : </p>
                  <div>
                    <v-btn @click="setAdvancement(0)">0</v-btn>
                    <v-btn @click="setAdvancement(20)">20</v-btn>
                    <v-btn @click="setAdvancement(40)">40</v-btn>
                    <v-btn @click="setAdvancement(60)">60</v-btn>
                    <v-btn @click="setAdvancement(80)">80</v-btn>
                    <v-btn @click="setAdvancement(100)">100</v-btn> 
                    </div>
                </v-list-tile-content>
               </v-list-tile>
               <v-list-tile v-if="get">
                 <p class="inline-small"><strong>Date de réalisation : </strong></p><p class="inline-large">{{ todo.day }} / {{ todo.month }} / {{ todo.year }}</p>
                 <p>{{ howManyDays }}</p>
               </v-list-tile>  
               <v-list-tile v-if="put">
                    <p class="inline-small">Modifier la date</p>
                    <v-list-tile-content style="margin-bottom: 10px;">
                      <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="day"  placeholder="Jour" v-model="day" @blur="updateDay"></div>
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="month"  placeholder="Mois (en chiffres)" v-model="month" @blur="updateMonth"></div>
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="year"  placeholder="2019" v-model="year" @blur="updateYear"></div>
                      </div>
                      <!--<v-chip class="float-right" @click="setDate">Valider la date</v-chip> -->
                    </v-list-tile-content>
                </v-list-tile>    
                <v-list-tile v-if="add">
                    <p class="inline-small" style="color: #222">Fixer la date de réalisation</p>
                    <v-list-tile-content style="margin-bottom: 10px;">
                      <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="day"  placeholder="Jour" v-model="day" @blur="retrieveDay"></div>
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="month"  placeholder="Mois (en chiffres)" v-model="month" @blur="retrieveMonth"></div>
                      <div style="display: inline-block;" ><input style="border: solid 1px gray" ref="year"  placeholder="2019" v-model="year" @blur="retrieveYear"></div>
                      </div>
                    </v-list-tile-content>
                </v-list-tile>             
                    
            </v-list>
            <v-chip v-if="put" class="link white--text" color="orange" v-on:click="setChange(todo)">Modifier</v-chip>
            <v-chip v-if="add" class="link white--text" color="orange" v-on:click="setNewTodo">Ajouter</v-chip>
        </v-card-text>
</template>

<script>
import { compareToNow } from '../middleware/computDate'
export default {
    props: {
        ind: String,
        todo: Object,
        get: Boolean,
        put: Boolean,
        add: Boolean
    },
    data(){
        return {
            title: '',
            content: '',
            owner:'',
            advancement: 0,
            day: 10,
            month: 10,
            year: 2019,
            newTodo : {},
            update: {},
        }
    },
    computed: {
      howManyDays(todo) {
        return compareToNow(this.todo)
      }
      
    },
    methods: {
        setChange: function(){
          
          console.log('TODO avant commit update')
          
          this.update.ind = this.ind,
          this.update.title = this.title,
          this.update.owner = this.owner,
          this.update.content = this.content,
          this.update.advancement = this.advancement,
          this.update.day = this.day,
          this.update.month = this.month,
          this.update.year = this.year 
          console.log('juste avant commit', this.update)
          this.$store.dispatch('updateTodo', this.update)
          console.log('juste après commit', this.update)
        },
        setAdvancement(value){
          this.advancement = value
          console.log(this.advancement)
          this.$emit('addingAdvancement', this.advancement)
        },
        retrieveTitle(){
          this.$emit('addingTitle', this.title)
        },
        retrieveContent(){
          this.$emit('addingContent', this.content)
        },
        retrieveOwner(){
          this.$emit('addingOwner', this.owner)
        },
        
        retrieveDay(){
          this.$emit('addingDay', this.day)
        },
        retrieveMonth(){
          this.$emit('addingMonth', this.month)
        },
        retrieveYear(){
          this.$emit('addingYear', this.year)
        },

        updateTitle(){
          this.$emit('addingTitle', this.title)
        },
        updateContent(){
          this.$emit('addingContent', this.content)
        },
        updateOwner(){
          this.$emit('addingOwner', this.owner)
        },
        
        updateDay(){
          this.$emit('addingDay', this.day)
        },
        updateMonth(){
          this.$emit('addingMonth', this.month)
        },
        updateYear(){
          this.$emit('addingYear', this.year)
        },

        setNewTodo(){
          this.newTodo.title = this.title
          this.newTodo.content = this.content
          this.newTodo.owner = this.owner
          this.newTodo.advancement = this.advancement
          this.newTodo.day = this.day
          this.newTodo.month = this.month
          this.newTodo.year = this.year
          console.log('SetNewTodo')
          //this.$emit('addingTodo', this.newTodo)
          this.$store.dispatch('addNewTodo', this.newTodo)
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

