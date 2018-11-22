<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="item"
            v-for="(item, i) in rutas" :key="i">
                {{item.name}}
            </router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div class="leftcolumn">
            <div id="feeds">
                <router-link :to="{name:'Teacher', params: {ID_program:id_program, Program_name:Program_name, Teacher:item, rutas:rutas}}"
                        v-for="(item, index) in teachers"
                        :key="index">
                        <div class="smallcard">
                            <h5>{{item.Firstname}} {{item.Lastname}}</h5>
                        </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="smallcard">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{Program_name}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <router-link :to="{name:'Courses', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                <button class="btn default">
                    Ver Syllabus</button>
                </router-link>
            </div>
            <div class="smallcard">
                <h2>Modo editor</h2>
                <p>Ingresa un nuevo profesor para este programa haciendo click más abajo</p>
                <router-link :to="{name: 'NewTeacher', params: { ID_program: id_program, 
                Program_name: Program_name, rutas:rutas}}">
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
            teachers:[],
            rutas:[]
        }
    },
    methods:{
        getTeachers : function(){
            this.id_program=this.$route.params.ID_program;
            this.Program_name=this.$route.params.Program_name;
            this.rutas=this.$route.params.rutas;
            var i=0;
            for(i; i<this.rutas.length; i++){
                if(this.rutas[i].name=='Teachers'){
                    break;
                }
            }
            console.log("Name: "+this.name+"  i:  "+i);
            if(i<this.rutas.length){
                this.rutas.splice(i, this.rutas.length-i);
            }
            this.rutas.push({name:'Teachers', params:{ID_program:this.id_program, Program_name:this.Program_name, rutas:this.rutas}});
            axios.get('http:localhost:8080/getTeachers/'+this.id_program).then(response=>(this.teachers=response.data));
        }
    }
}
</script>
