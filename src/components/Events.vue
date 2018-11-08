<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{ name:'Posts', params: {} }">Posts</router-link>
            <a style="float: right;">Iniciar sesion</a>
            <a class="active" href="#">Eventos</a>
        </div>
        <div class="header">
            <h3>{{Program_name}}</h3>
        </div>
        <div class="leftcolumn">
            <div class="card">
                <h2>Regresa al inicio</h2>
                <router-link :to="{name:'Home'}">
                    <button class="btn default">
                        Atras
                    </button>
                </router-link>
            </div>
            <div id="feeds">
                <router-link :to="{name:'Post', params: {ID_event: item.ID_event}}"
                        v-for="(item, index) in events"
                        :key="index">
                        <div class="card">
                            <h2>{{item.Event_title}}</h2>
                            <h5>Publicado: {{item.Event_date_relased}} {{item.Event_time_relased}}</h5>
                            <div class="fakeimg" style="height:150px;">Image</div>
                            <p>{{item.Event_abstract}}</p>
                            <h5>Fecha: {{item.Event_date}} Hora: {{item.Event_time}}</h5>
                        </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="card">
                <h2>Logros destacados</h2>
                <p>{{Program_name}} ha tenido estupendos logros, más informacion dandlo click abajo</p>
                <button class="btn default">Ver logros</button>
            </div>
            <div class="card">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{Program_name}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <button class="btn default"
                @click="location.href='http://www.google.com';">
                Ver Syllabus</button>
            </div>
            <div class="card">
                <h2>Conoce tus futuros docentes</h2>
                <p>Observa el perfil de los docentes inscritos en {{ Program_name}}</p>
                <button class="btn default">Ver Docentes</button>
            </div>
            <div class="card">
                <h2>Modo editor</h2>
                <p>Ingresa un evento para esta seccion haciendo click más abajo</p>
                <router-link :to="{name: 'NewEvent', params: { ID_program: this.id_program, 
                Program_name: this.Program_name}}">
                    <button class="btn default">
                        Crear evento
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    created: function(){
        this.getPosts();
    },
    data(){ return {
            title: "Hello World",
            events: null,
            urlApi:"http://localhost:8080/",
            id_program:1,
            Program_name:"No program selected"
        }
    },
    methods: {
        getPosts : function(){
            this.id_program=this.$route.params.ID_program;
            console.log('ID_program', this.id_program);
            this.Program_name=this.$route.params.Program_name;
            //axios.get(this.urlApi+'getPosts/'+this.selectedProgram.ID_program).then(response=>(this.posts=response.data));
            axios.get(this.urlApi+'getEvents/'+this.id_program).then(response=>(this.events=response.data));
        }
    }
}
</script>