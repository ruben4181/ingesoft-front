<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'name'}">Atras</router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div class="leftcolumn">
            <div class="smallcard">
                <h2>Regresa al inicio</h2>
                <router-link :to="{name:'Home'}">
                    <button class="btn default">
                        Atras
                    </button>
                </router-link>
            </div>
            <div id="feeds">
                <router-link :to="{name:'Teacher', params: {Teacher:item}}"
                        v-for="(item, index) in teachers"
                        :key="index">
                        <div class="smallcard">
                            <h5>{{item.Firstname}} {{item.Lastname}}</h5>
                        </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="card">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{Program_name}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <router-link :to="{name:'Courses', params:{ID_program:id_program, Program_name:Program_name}}">
                <button class="btn default">
                    Ver Syllabus</button>
                </router-link>
            </div>
            <div class="card">
                <h2>Modo editor</h2>
                <p>Ingresa un nuevo profesor para este programa haciendo click más abajo</p>
                <router-link :to="{name: 'NewTeacher', params: { ID_program: this.id_program, 
                Program_name: this.Program_name}}">
                    <button class="btn default">
                        Ingresar nuevo profesor
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
        this.getTeachers()
    },
    data: function(){
        return {
            id_program:1,
            Program_name:"",
            teachers:[]
        }
    },
    methods:{
        getTeachers : function(){
            this.id_program=this.$route.params.ID_program;
            this.Program_name=this.$route.params.Program_name;
            axios.get('http:localhost:8080/getTeachers/'+this.id_program).then(response=>(this.teachers=response.data));
        }
    }
}
</script>
