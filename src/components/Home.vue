<template>
    <div>
        <agile :speed="3000" :autoplay="true" :pauseonhover="true">
            <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
            <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
            <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
        </agile>
        <h3>Bienvenidos</h3>
        <p>Este sitio web se encuentra en construccion, disculpa las molestias<br>
        Contactanos para mas informacion:<br>Ruben Vargas: ruben4181@gmail.com<br>
        Brayan Vera: verabrayan@gmail.com<br>Nicolas Alvarez: alvareznico@gmail.com<br>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
import VueAgile from 'vue-agile';
Vue.use(VueAgile);

export default {
    data() {
        return {
            title: "Hello World"
        }
    }
}
</script>
