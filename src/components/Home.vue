<template>
    <div>
        <div class="navbar">
            <a class="active" href="#home">Inicio</a>
            <a href="#news">Noticias</a>
            <a style="float: right;">Iniciar sesion</a>
            <div class="dropdown">
                <button class="dropbtn">Ver Programas 
                <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                <div class="header">
                    <h2>Programas Postgrado Facultad de Ingenieria</h2>
                </div>   
                <div class="row">
                    <div class="column">
                        <h3>Especializaciones</h3>
                        <router-link 
                            :to="{ name: 'Posts', params: { ID_program:index+1, Program_name : item.Program_name } }"
                            v-for="(item, index) in getEspecializaciones()" :key="index">{{item.Program_name}}
                        </router-link>
                        <h3>Maestrias</h3>
                        <router-link 
                            :to="{ name: 'Posts', params: { ID_program:index+1, Program_name : item.Program_name } }"
                            v-for="(item, index) in getMaestrias()" :key="index">{{item.Program_name}}
                        </router-link>
                        <h3>Doctorados</h3>
                        <router-link 
                            :to="{ name: 'Posts', params: { ID_program:index+1, Program_name : item.Program_name } }"
                            v-for="(item, index) in getDoctorados()" :key="index">{{item.Program_name}}
                        </router-link>
                    </div>
                </div>
                </div>
            </div> 
        </div>
        <agile :speed="3000" :autoplay="true" :pauseOnHover="true">
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
import axios from 'axios';
import VueAgile from 'vue-agile';

Vue.use(VueAgile);
Vue.use(axios);

export default {
    created: function(){
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        axios.defaults.headers.post['Content-Type']='application/json';
        this.getPrograms();
    },
    data() {
        return {
            title: "Hello World",
            programs:[],
            selectedProgram:"",
            urlApi:"http://localhost:8080/",
        }
    }, methods:{
        getPrograms : function(){
            axios.get(this.urlApi+'getPrograms').then(response=>(this.programs=response.data));
        },
        updateProgamSelected(selectedProgram){
            const userId = 1;
        },
        getEspecializaciones(){
            var especializaciones=[];
            for(var i=0; i<this.programs.lenght; i++){
                if(this.programs[i].program_type="Especializacion"){
                    especializaciones.push(this.programs[i]);
                }
            }
            return especializaciones;
        },
        getMaestrias(){
            var maestrias=[];
            for(var i=0; i<this.programs.lenght; i++){
                if(this.programs[i].program_type="Maestria"){
                    maestrias.push(this.programs[i]);
                }
            }
            return maestrias;
        },
        getDoctorados(){
            var doctorados=[];
            for(var i=0; i<this.programs.lenght; i++){
                if(this.programs[i].program_type="Doctorado"){
                    doctorados.push(this.programs[i]);
                }
            }
            return doctorados;
        }
    }
}
</script>