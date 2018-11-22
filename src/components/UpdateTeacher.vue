<template>
    <div id="app" overscroll-y="auto">
        <div class="navbar">
            <router-link :to="item"
            v-for="(item, i) in rutas" :key="i">
                {{item.name}}
            </router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div id="container" class="card">
            <h3>Nombre de usuario</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Teacher.Username" aria-placeholder="Firstname"
                :min-height="30">
            </textarea-autosize>
            <h3>Departamento adscrito: </h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model.number="Teacher.ID_department"
                :min-height="30">
            </textarea-autosize>
            <div>
                <h3>Estudios</h3>
                <div class="smallcard" style="width:100%;"
                v-for="(degree, i) in Teacher.Degrees" :key="i">
                    <h5>{{degree.Degree_name}}</h5>
                    <button class="btn btn-default"
                    @click="delDegree(i)">
                        Eliminar
                    </button>
                </div>
                <div class="smallcard">
                    <button class="btn default" @click="showNewDegreeModal">
                            Agregar estudio
                    </button>
                </div>
            </div><br>
            <div>
                <h3>Proyectos/Reconocimintos</h3>
                <div class="smallcard" style="width:100%;"
                    v-for="(achievement, i) in Teacher.Achievements" :key="i">
                        <h5>{{achievement.Achievement_name}}</h5>
                        <button class="btn btn-default"
                        @click="delAchievement(i)">
                            Eliminar
                        </button>
                </div>
                <button class="btn default" @click="showNewAchievementModal">
                    Agregar proyecto/reconocimiento
                </button>
            </div>
            <div class="container">
                <button class="btn default" @click="showNewTeacherModal">
                    Ingresar nuevo profesor
                </button>
            </div>
            
        </div>
        <modal name="add-degree" height="auto" :adaptive="true" :scrollable="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Nuevo estudio</h3>
                </div>
                <div class="modal-body">
                    <h4>Titulo</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_name" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Universidad</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_college" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Ciudad</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_city" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Año</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_year" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Informacion extra</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_extra" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="addNewDegree()">
                        Guardar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewDegree()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="add-achievement" height="auto" :adaptive="true" :scrollable="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Nuevo estudio</h3>
                </div>
                <div class="modal-body">
                    <h4>Titulo</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="achievement_name" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Descripcción</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="achievement_description" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Año</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="achievement_year" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="addNewAchievement()">
                        Guardar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewAchievement()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="confirm-newteacher" height="auto">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">¿Desea agregar este profesor?</h3>
                </div>
                <div class="modal-body">
                    <p>Los cambios se veran reflejados de manera automatica
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="sendNewTeacher()">
                        Enviar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewTeacher()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="newteacher-added" height="auto">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Un nuevo profesor se ha agregado</h3>
                </div>
                <div class="modal-body">
                    <p> 
                        Su profesor ahora esta inscrito en el personal de Posgrados de la facultad de Ingenieria
                    </p>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Teachers', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                        <button class="btn btn-default">
                            Ok
                        </button>
                    </router-link>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    created: function(){
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        axios.defaults.headers.post['Content-Type']='application/json';

        this.id_program=this.$route.params.ID_program;
        this.Program_name=this.$route.params.Program_name;
        this.Teacher=this.$route.params.Teacher;
        console.log(this.Teacher);
        this.rutas=this.$route.params.rutas;
        var i=0;
        for(i; i<this.rutas.length; i++){
            if(this.rutas[i].name=='NewTeacher'){
                break;
            }
        }
        if(i<this.rutas.length){
            this.rutas.splice(i, this.rutas.length-i);
        }
    },
    data: function(){
        return {
            id_program:1,
            Program_name:"",

            degree_name:"",
            degree_college:"",
            degree_year:"",
            degree_city:"",
            degree_extra:"",

            achievement_name:"",
            achievement_description:"",
            achievement_year:"",

            isMTDegrees:true,
            isMTAchievements:true,
            
            Teacher:{
            Username:"",
            Email:"",
            Firstname:"",
            Lastname:"",
            ID_teacher:0,
            ID_user:4,
            ID_department:1,
            ID_program:1,
            Degrees:[],
            Achievements:[],
            Teacher_department:""
            },
            rutas:[]
        }
    },
    methods:{
        sendNewTeacher(){
            this.$modal.hide('confirm-newteacher');
            axios({
                method: 'post',
                url: 'http://localhost:8080/updateTeacher',
                withCredentials: true,
                crossdomain: true,
                data: this.Teacher,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.show('newteacher-added');
        },
        showNewTeacherModal : function(){
            this.$modal.show('confirm-newteacher');
        },

        showNewDegreeModal : function(){
            this.$modal.show('add-degree');
        },
        showNewAchievementModal : function(){
            this.$modal.show('add-achievement')
        },
        addNewDegree : function(){
            this.Teacher.Degrees.push({ID_degree:-1, ID_teacher:1, Degree_name:this.degree_name, 
            degree_college:this.degree_college, Degree_city:this.degree_city, Degree_year:this.degree_year, Degree_extra_info:this.degree_extra});
            this.isMTDegrees=false;
            this.degree_name="";
            this.degree_college="";
            this.degree_city="";
            this.degree_year="";
            this.degree_extra="";
            this.$modal.hide('add-degree');
        },
        delDegree: function(index){
            this.Teacher.Degrees.splice(index, 1);
        },
        addNewAchievement : function(){
            this.Teacher.Achievements.push({ID_achievement:-1, ID_teacher:1, Achievement_name:this.achievement_name, 
                Achievement_description:this.achievement_description, Achievement_year:this.achievement_year});
            this.isMTAchievements=false;
            this.achievement_name="";
            this.achievement_description="";
            this.achievement_year="";
            this.$modal.hide('add-achievement');
        },
        delAchievement:function(index){
            this.Teacher.Achievements.splice(index, 1);
        },
        cancelNewDegree(){
            this.$modal.hide('add-degree');
            this.degree_name="";
            this.degree_college="";
            this.degree_city="";
            this.degree_year="";
            this.degree_extra="";
        },cancelNewAchievement(){
            this.$modal.hide('add-achievement');
            this.achievement_name="";
            this.achievement_description="";
            this.achievement_year="";
        }
    }
}
</script>
