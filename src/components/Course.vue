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
            <div id="editor">
                <router-link :to="{name:'EditCourse', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas, Course:course}}">
                    <button class="btn default">
                        Editar
                    </button>
                </router-link>
                <button class="btn default" @click="showDelCourseModal()">
                    Eliminar
                </button>
            </div>
        </div>
        
    </div>
    <modal name="confirm-delcourse" height="auto" :adaptive="true">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">¿Deseas eliminar este curso?</h3>
            </div>
            <div class="modal-body">
                <p>
                    Si eliminas este curso no podras recuperarlo de ninguna forma. Los cambios se veran reflejados de 
                    manera inmediata en el sistema.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default"
                    @click="delCourse()">
                    Eliminar
                </button>
                <button class="btn btn-default">
                    Cancelar
                </button>
            </div>
        </div>
    </modal>
    <modal name="course-deleted" height="auto" :adaptive="true" :scroll="true">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Curso borrado</h3>
            </div>
            <div class="modal-body">
                <p>El curso fue borrado de manera exitosa</p>
            </div>
            <dir class="modal-footer">
                <router-link :to="{name:'Courses', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                    <button calss="btn btn-default">
                        Ok
                    </button>
                </router-link>
            </dir>
        </div>
    </modal>
</div>   
</template>
<script>
import axios from 'axios'

export default {
    created: function(){
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        axios.defaults.headers.post['Content-Type']='application/json';

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
    methods:{
        showDelCourseModal: function(){
            this.$modal.show('confirm-delcourse');
        },
        cancelDelCourseModal : function(){
            this.$modal.hide('confirm-delcourse');
        },
        delCourse : function(){
            this.$modal.hide('confirm-delcourse');
            axios({
                method: 'post',
                url: 'http://localhost:8080/delCourse',
                withCredentials: true,
                crossdomain: true,
                data: this.course,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.show('course-deleted');
        }
    }
}
</script>
