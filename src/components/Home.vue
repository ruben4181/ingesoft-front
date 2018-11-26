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
                            :to="{ name: 'Posts', params: { ID_program:item.ID_program, Program_name : item.Program_name, Program:item } }"
                            v-for="(item, index) in especializaciones" :key="index">{{item.Program_name}}
                        </router-link>
                        <h3>Maestrias</h3>
                        <router-link 
                            :to="{ name: 'Posts', params: { ID_program:item.ID_program, Program_name : item.Program_name, Program:item } }"
                            v-for="(item, index3) in maestrias" :key="index3">{{item.Program_name}}
                        </router-link>
                        <h3>Doctorados</h3>
                        <router-link 
                            :to="{ name: 'Posts', params: { ID_program:item.ID_program, Program_name : item.Program_name, Program:item } }"
                            v-for="(item, index3) in doctorados" :key="index3">{{item.Program_name}}
                        </router-link>
                    </div>
                </div>
                </div>
            </div> 
        </div>
        <agile :speed="3000" :autoplay="true" :pauseOnHover="true">
            <div class="slide"><img src="imgs/img1.png" style="width:100%;"></div>
            <div class="slide"><img src="imgs/img1.png" style="width:100%;"></div>
            <div class="slide"><img src="imgs/img1.png" style="width:100%;"></div>
        </agile>
        <div>
            <div class="card">
            <h3>Edicion</h3>
                <p>Estas son tus opciones:
                </p>
                <router-link :to="{name:'NewProgram'}" class="link-nostyle">
                    <button class="btn default">
                        Nuevo Programa
                    </button>
                </router-link>
            </div>
            <div class="card">
                <h3>Especializaciones</h3>
                <p>La culminacion academica es un logro que no todos ostentan, por eso la Pontificia Universidad Javeriana 
                ofrece programas de Doctorado que te desafiaran mentalmente y podran a prueba tu tenacidad</p>
                <router-link class="link-nostyle" :to="{name:'Posts', params:{ID_program:item.ID_program, Program_name:item.Program_name,
                Program:item}}" 
                v-for="(item, index) in especializaciones" :key="index">
                    <div class="smallcard">
                        <h4>{{item.Program_name}}</h4>
                        <h5>{{item.Program_description}}</h5>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <h3>Maestrias</h3>
                <p>La culminacion academica es un logro que no todos ostentan, por eso la Pontificia Universidad Javeriana 
                ofrece programas de Doctorado que te desafiaran mentalmente y podran a prueba tu tenacidad</p>
                <router-link class="link-nostyle" :to="{name:'Posts', params:{ID_program:item.ID_program, Program_name:item.Program_name,
                Program:item}}" 
                v-for="(item, index) in maestrias" :key="index">
                    <div class="smallcard">
                        <h4>{{item.Program_name}}</h4>
                        <h5>{{item.Program_description}}</h5>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <h3>Doctorados</h3>
                <p>La culminacion academica es un logro que no todos ostentan, por eso la Pontificia Universidad Javeriana 
                ofrece programas de Doctorado que te desafiaran mentalmente y podran a prueba tu tenacidad</p>
                <router-link class="link-nostyle" :to="{name:'Posts', params:{ID_program:item.ID_program, Program_name:item.Program_name,
                Program:item}}" 
                v-for="(item, index) in doctorados" :key="index">
                    <div class="smallcard">
                        <h4>{{item.Program_name}}</h4>
                        <h5>{{item.Program_description}}</h5>
                    </div>
                </router-link>
            </div>
        </div>
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
            especializaciones:[],
            maestrias:[],
            doctorados:[],
            selectedProgram:"",
            urlApi:"http://localhost:8080/",
        }
    }, methods:{
        getPrograms : function(){
            axios.get(this.urlApi+'getPrograms').then(response=>{this.programs=response.data;this.fullHome();});
        },
        updateProgamSelected(selectedProgram){
            const userId = 1;
        },
        fullHome : function(){
            this.especializaciones=[];
            this.maestrias=[];
            this.doctorados=[];
            for(var i=0; i<this.programs.length; i++){
                if(this.programs[i].Program_category=="Especializacion"){
                    this.especializaciones.push(this.programs[i])
                }if(this.programs[i].Program_category=="Maestria"){
                    this.maestrias.push(this.programs[i]);
                }if(this.programs[i].Program_category=="Doctorado"){
                    this.doctorados.push(this.programs[i]);
                }
            }
            console.log(this.especializaciones);
            console.log(this.maestrias);
            console.log(this.doctorados);
        }
    }
}
</script>