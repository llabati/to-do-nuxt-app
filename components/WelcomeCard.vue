<template>
<div>
    <p>{{ welcomeMessage }}</p>
    <!--<p>Tous les utilisateurs identifiés peuvent déposer leurs tâches et en noter l'avancement. <strong>Bienvenue à tous ! </strong></p> -->
            <div class="text-xs-right">
              <em><small>Ludovic Labati</small></em>
            </div>
</div>

</template>

<script>
export default {
    props: {
        welcomeMessage: String
    }
}
</script>

