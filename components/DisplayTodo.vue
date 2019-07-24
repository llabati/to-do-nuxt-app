<template>
    <v-card-text>
            <v-list two-line style="margin-bottom: 20px">
                <v-list-tile>
                 <p class="inline-small"><strong>Titre : </strong></p><p class="inline-large"><strong>{{ todo.title }}</strong></p><br>
               </v-list-tile>
               <v-list-tile v-if="put">
                <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier le titre" v-model="title"></v-text-field></v-list-tile-content>
               </v-list-tile>
               <v-list-tile>
                 <p class="inline-small"><strong>Description : </strong></p><p class="inline-large">{{ todo.content }}</p>
               </v-list-tile>
               <v-list-tile v-if="put">
                  <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier la description" v-model="content"></v-text-field></v-list-tile-content>
               </v-list-tile>         
               <v-list-tile>
                 <p class="inline-small"><strong>Responsable : </strong></p><p class="inline-large" style="color: red;">{{ todo.owner }}</p>
               </v-list-tile>  
               <v-list-tile v-if="put">
                 <v-list-tile-content><v-text-field solo style="display: block; width: 100%;" placeholder="Modifier le responsable" v-model="owner"></v-text-field></v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                 <div class="inline-small" style="padding-top: 10px"><p><strong>Avancement : </strong></p></div><v-progress-circular :rotate="-90" :size="60" :width="10" :value="todo.advancement" color="blue">{{ todo.advancement }}</v-progress-circular>
                </v-list-tile>
                <v-list-tile v-if="put">
                <v-list-tile-content  v-if="put"><p>Modifier l'avancement : </p>
                  <div>
                    <v-btn v-if="todo.advancement === 0" @click="changeAdvancement(20)">20</v-btn>
                    <v-btn v-if="todo.advancement < 40" @click="changeAdvancement(40)">40</v-btn>
                    <v-btn v-if="todo.advancement < 60" @click="changeAdvancement(60)">60</v-btn>
                    <v-btn v-if="todo.advancement < 80" @click="changeAdvancement(80)">80</v-btn>
                    <v-btn v-if="todo.advancement < 100" @click="changeAdvancement(100)">100</v-btn> 
                    </div>
                </v-list-tile-content>
               </v-list-tile>
                    
            </v-list>
            <v-chip v-if="put" class="link" color="orange" v-on:click="setChange(todo)">Modifier</v-chip>
        </v-card-text>
</template>

<script>
export default {
    props: {
        ind: String,
        todo: Object,
        put: Boolean
    },
    data(){
        return {
            title: '',
            content: '',
            owner:'',
            advancement: ''
        }
    },
    computed: {},
    methods: {
        setChange: function(){
          
          console.log('TODO avant commit update')
          let res = {
            ind: this.ind,
            title: this.title,
            owner: this.owner,
            content: this.content,
            advancement: this.advancement 
          }
        }
    }
}
</script>

