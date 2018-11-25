<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="item"
            v-for="(item, i) in rutas" :key="i">
                {{item.name}}
            </router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div class="header">
            <h3>{{Program_name}}</h3>
        </div>
        <div class="leftcolumn">
            <div id="feeds">
                <router-link :to="{name:'Course', params:{ID_program:id_program, rutas:rutas, Course:course}}"
                    v-for="(course, i) in courses" :key="i">
                    <div class="smallcard">
                        <h3>{{course.Course_name}}</h3>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="smallcard">
                <h2>Conoce tus futuros docentes</h2>
                <p>Observa el perfil de los docentes inscritos en {{ Program_name}}</p>
                <router-link :to="{name:'Teachers', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                    <button class="btn default">Ver Docentes</button>
                </router-link>
            </div>
            <div class="smallcard">
            <h3>¿Deseas agregar un nuevo curso?</h3>
            <p>Crea un curso nuevo para este programa clickando más abajo</p>
            <router-link :to="{name:'NewCourse', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                <button class="btn default">
                    Nuevo curso
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
        this.getCourses();
        console.log(this.id_program)
    },
    data: function(){
        return {
            id_program:1,
            Program_name:"",
            courses:[],
            rutas:[]
        }
    },
    methods:{
        getCourses: function(){
            this.id_program=this.$route.params.ID_program;
            this.Program_name=this.$route.params.Program_name;
            this.rutas=this.$route.params.rutas;
            var i=0;
            for(i; i<this.rutas.length; i++){
                if(this.rutas[i].name=='Courses'){
                    break;
                }
            }
            if(i<this.rutas.length){
                this.rutas.splice(i, this.rutas.length-i);
            }
            this.rutas.push({name:'Courses', params:{ID_program:this.id_program, Program_name:this.Program_name, rutas:this.rutas}});
            
            axios.get('http://localhost:8080/getCourses/'+this.id_program).then(response=>(this.courses=response.data));
        }
    }
}
</script>
