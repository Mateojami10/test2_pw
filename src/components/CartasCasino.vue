<template>
    <div class="hijo">
        <img :src="imagen" alt="Carta de casino" width="250"/>
        <p>{{ texto }}</p>
    </div>
  
</template>

<script>
export default {
    name: 'CartasCasino',
    props: {
        imagen:String,
        texto: String
    }

}
</script>

<style scoped>
/**se muestra una imagen a lado de otra */
.hijo {
    display: inline-block;
    margin: 10px;
}

</style>