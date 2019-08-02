<template>
<div>
    <p>{{ welcomeMessage }}</p>
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

