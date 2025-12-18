<template>
    <div class="casino-container">
        <h1>Juego de Casino</h1>

        <div v-if="!juegoterminado && !juegoganado">
            <p>Intento: {{ intento }}/5</p>
            <p>Puntaje: {{ puntaje }}</p>
            
                <div class="cartas-container">
                    <CartasCasino :imagen="carta1.imagen" :texto="carta1.texto" />
                    <CartasCasino :imagen="carta2.imagen" :texto="carta2.texto" />
                    <CartasCasino :imagen="carta3.imagen" :texto="carta3.texto" />
                </div>
                <div class="botones">
                    <button @click="jugar">Jugar</button>
                </div>
        </div>
        <!--pantalla cuando pierde el juego-->
        <div v-if="juegoterminado && !juegoganado" class="fin">
            <p>Has utilizado todos tus intentos.</p>
            <p>Has perdido el juego</p>
            <button @click="nuevoJuego">Nuevo Juego</button>
        </div>
        <!--pantalla cuando gana el juego-->
        <div v-if="juegoganado" class="gano">
            <p>Has ganado el juego con un puntaje de: {{ puntaje }}</p>
            <h2>¡Felicidades!</h2>
            <button @click="nuevoJuego">Nuevo Juego</button>    

        </div>
    </div>  
  
</template>

<script>
import CartasCasino from './CartasCasino.vue'; 
import { consumirApiFacade } from '@/clients/YesNoClient';
export default {
    name: 'JuegoCasino',
    components: {
        CartasCasino
    },
    data() {
        return {
            carta1: {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
                texto: 'xxxxxxxxxxx'
            },
            carta2: {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
                texto: 'xxxxxxxxxxx'
            },
            carta3: {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
                texto: 'xxxxxxxxxxx'
            },
            puntaje: 0,
            intento: 0,
            juegoterminado: false,
            juegoganado: false
        };
    },
    methods: {
        async jugar() {
            //verifica si el juego ha terminado o ganado
            if (this.juegoterminado || this.juegoganado) {
                return;
            }

            this.intento += 1;

            //se va a consumir el API 3 veces con el objetivo de obtener una nueva imagen y el valor del texto oculto por cada instancia del componente
            //La imagen debe ser reemplazada por el atributo image del json de respuesta del API.
            //El texto oculto debe ser reemplazado por el atributo answer del json de respuesta del API.
            for (let i = 1; i <= 3; i++) {
                const respuesta = await consumirApiFacade();
                this[`carta${i}`].imagen = respuesta.image;
                this[`carta${i}`].texto = respuesta.answer;
            }

            //lógica para calcular el puntaje basado en las respuestas obtenidas
            let respuestasCorrectas = 0;
            //si coinciden 3 textos en yes gana 5 puntos
            if (this.carta1.texto === 'yes' && this.carta2.texto === 'yes' && this.carta3.texto === 'yes') {
                respuestasCorrectas = 3;
            }  
            //si coinciden 2 textos en yes gana 3 puntos
            else if (
                (this.carta1.texto === 'yes' && this.carta2.texto === 'yes') ||
                (this.carta1.texto === 'yes' && this.carta3.texto === 'yes') ||
                (this.carta2.texto === 'yes' && this.carta3.texto === 'yes')
            ) {
                respuestasCorrectas = 2;
            }
            //si coincide 1 texto en yes gana 1 punto
            else if (
                this.carta1.texto === 'yes' ||
                this.carta2.texto === 'yes' ||
                this.carta3.texto === 'yes'
            ) {
                respuestasCorrectas = 1;
            }
            //si no hay respuestas en yes no gana puntos
            else {
                respuestasCorrectas = 0;
            }
            this.puntaje += respuestasCorrectas;
            //el juego termina después de 5 intentos o cuando el puntaje es mayor o igual a 10
            if (this.intento >= 5 || this.puntaje >= 10) {
                this.juegoterminado = true;
                if (this.puntaje >= 10) {
                    this.juegoganado = true;
                } else {
                    this.juegoganado = false;
                }
            }
            


        },
        nuevoJuego() {
            //reinicia los valores del juego para comenzar un nuevo juego
            this.carta1 = {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
                texto: 'xxxxxxxxxxx'
            };
            this.carta2 = {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
                texto: 'xxxxxxxxxxx'
            };
            this.carta3 = {
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
                texto: 'xxxxxxxxxxx'
            };
            this.puntaje = 0;
            this.intento = 0;
            this.juegoterminado = false;
            this.juegoganado = false;
    }
    }

}
</script>

<style scoped>
    .botones {
        margin-top: 20px;
        text-align: center;
    }

</style>