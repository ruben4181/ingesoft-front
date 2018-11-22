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
        <div class="card">
            <h3>{{course.Course_name}}</h3>
            <p>Creditos: {{course.Course_n_credits}}</p>
            <p>Descripcción: {{course.Course_description}}</p>
            <p>Requisitos: {{course.Course_requirements}}</p>
        </div>
    </div>
    <div class="rightcolumn">
        <div class="card">
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
export default {
    created: function(){
        this.id_program=this.$route.params.ID_program;
        this.Program_name=this.$route.params.Program_name;
        this.course=this.$route.params.Course;
        this.rutas=this.$route.params.rutas;
        var i=0;
            for(i; i<this.rutas.length; i++){
                if(this.rutas[i].name=='Course'){
                    break;
                }
            }
            if(i<this.rutas.length){
                this.rutas.splice(i, this.rutas.length-i);
            }
        this.rutas.push({name:'Course', paramas:{ID_program:this.id_program, Program_name: this.Program_name, 
            rutas:this.rutas, Course:this.course}});
    },
    data: function(){
        return {
            id_program:"",
            Program_name:"",
            course:null,
            rutas:[]
        }
    },
}
</script>
