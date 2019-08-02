<template>
    <v-toolbar>
          <v-toolbar-title>{{ secondTitle }}</v-toolbar-title> 
          <v-spacer></v-spacer>
      </v-toolbar>
</template>

<script>
export default {
    props: {
        headerMessage: String,
        todo: Object,
        
    },
    computed: {  
        secondTitle(){
            return this.headerMessage 
        }
    }
}
</script>

