<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="item"
            v-for="(item, i) in rutas" :key="i">
                {{item.name}}
            </router-link>
        </div>
        <div class="container">
            <div class="card">
                <h3>Nombre del curso</h3>
                <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="Course.Course_name" aria-placeholder="Nombre curso" :min-height="20">    
                </textarea-autosize>
                <h3>Descripccion del curso</h3>
                <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="Course.Course_description" :min-height="20">
                </textarea-autosize>
                <h3>Numero de creditos</h3>
                <textarea-autosize class="texareafield" style="width:100%:"
                v-model.number="Course.Course_n_credits" :min-height="20">
                </textarea-autosize>
                <h3>Requisitos</h3>
                <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="Course.Course_requirements" :min-height="20">
                </textarea-autosize>
                <button class="btn default"
                @click="showNewCourseModal()">Agregar curso</button>
            </div>
        </div>
        <modal name="newcourse-added" height="auto" :adaptive="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Nuevo curso añadido</h3>
                </div>
                <div class="modal-body">
                    <p>
                        El curso {{Course.Course_name}} se ha añadido correctamente
                    </p>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Courses', params:{ID_program:id_program, Program_name:Program_name,
                    rutas:rutas}}">
                        <button class="btn btn-default">
                            Ok
                        </button>
                    </router-link>
                </div>
            </div>
        </modal>
        <modal name="confirm-newcourse" height="auto" :adaptive="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">¿Deseas agregar este curso?</h3>    
                </div>
                <div class="modal-body">
                    <p>
                        El curso se agregara y se vera reflejado en el Syllabus del programa de inmediato
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="sendNewCourse()">
                        Agregar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewCourseModal()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    created:function(){
        this.id_program=this.$route.params.ID_program;
        this.Program_name=this.$route.params.Program_name;
        this.rutas=this.$route.params.rutas;
        var i=0;
        for(i; i<this.rutas.length; i++){
            if(this.rutas[i].name=='Teacher'){
                break;
            }
        }
        if(i<this.rutas.length){
            this.rutas.splice(i, this.rutas.length-i);
        }
        this.rutas.push({name:'NewCourse', params:{ID_program:this.id_program, Program_name:this.Program_name, 
            rutas:this.rutas}});
    },
    data: function(){
        return{
            id_program:1,
            Program_name:"",
            rutas:[],
            Course:{
                ID_course:1,
                Course_name:"",
                Course_description:"",
                Course_n_credits:0,
                Course_requirements:"",
                ID_program:1
            }
            
        }
    },
    methods:{
        sendNewCourse(){
            this.$modal.hide('confirm-newcourse');
            this.Course.ID_program=this.id_program;
            axios({
                method: 'post',
                url: 'http://localhost:8080/newCourse',
                withCredentials: true,
                crossdomain: true,
                data: this.Course,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.show('newcourse-added');
        },
        showNewCourseModal(){
            this.$modal.show('confirm-newcourse');
        },
        cancelNewCourseModal(){
            this.$modal.hide('confirm-newcourse');
        },
    }
}
</script>
