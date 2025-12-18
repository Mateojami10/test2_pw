<template>
    <div class="view-container">
     <JuegoCasino />
    </div>
  
</template>

<script>
import JuegoCasino from '@/components/JuegoCasino.vue';
export default {
    name: 'JuegoCasinoView',
    components: {
        JuegoCasino
    }
}
</script>

<style scoped>
.view-container {
    /**se muestra horizontalmente centrado */
    display: flex;
    justify-content: center;
    border: 2px solid black;
}

</style>