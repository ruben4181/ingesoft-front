<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'name'}">Atras</router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
    </div>
</template>
<script>
export default {
    created: function(){

    },
    data: function(){
        return {
            teachers:[],
            
        }
    }
}
</script>
