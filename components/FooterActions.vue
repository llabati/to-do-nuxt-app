<template>
    <div class="footer-item">
        <p>{{ invitation }}   
            <v-chip v-if="addpage" class="elevation-2 item-center" color="green"><nuxt-link class="link white--text" style="text-decoration: none; float: right;" to="/add"><strong>Nouvelle tâche</strong></nuxt-link></v-chip>
            <v-chip v-if="getpage" color="blue" right><nuxt-link class="link white--text" style="text-decoration: none;" :to="'/'">Retour à la liste</nuxt-link></v-chip>
            </p>
    </div>
</template>

<script>
export default {
    props: {
        notodo: Boolean,
        getpage: Boolean,
        putpage: Boolean,
        deletepage: Boolean,
        addpage: Boolean,
        todo: Object
    },
    computed: {
      invitation(){
        if (this.notodo) return 'N\'hésitez pas à créer une tâche !'
        else return
      },
    }
}
</script>

<style>
.footer-item {
    margin: 15px 0;
    text-align: center;
}
.item-center {
    margin: 0 auto;
}

</style>

