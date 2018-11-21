<template>
    <div id="app" overscroll-y="auto">
        <div class="navbar">
            <router-link :to="{name:'name'}">Atras</router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div id="container" class="card">
            <h3>Nombres</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Teacher.Firstname" aria-placeholder="Firstname"
                :min-height="30">
            </textarea-autosize>
            <h3>Apellidos</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Teacher.Lastname" aria-placeholder="Lastname"
                :min-height="30">
            </textarea-autosize>
            <h3>Departamento adscrito: </h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model.number="Teacher.ID_department"
                :min-height="30">
            </textarea-autosize>
            <div class="smallcard">
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
            <div class="smallcard">
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
                    @click="this.$modal.hide('add-degree')">
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
                        v-model="degree_name" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Descripcción</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_college" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                    <h4>Año</h4>
                    <textarea-autosize class="textarea-field" style="width:100%;"
                        v-model="degree_city" aria-placeholder="Firstname"
                        :min-height="20">
                    </textarea-autosize>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="addNewAchievement()">
                        Guardar
                    </button>
                    <button class="btn btn-default"
                    @click="this.$modal.hide('add-achievement')">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
export default {
    created: function(){

    },
    data: function(){
        return {
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
            }
        }
    },
    methods:{
        showNewTeacherModal : function(){
            
        },

        showNewDegreeModal : function(){
            this.$modal.show('add-degree');
        },
        showNewAchievementModal : function(){
            this.$modal.show('add-achievement')
        },
        addNewDegree : function(){
            this.Teacher.Degrees.push({ID_degree:1, ID_teacher:1, Degree_name:this.degree_name, 
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
            this.Teacher.Achievements.push({ID_achievement:1, ID_teacher:1, Achievement_name:this.achievement_name, 
                Achievement_description:this.achievement_description, Achievement_year:this.achievement_year});
            this.isMTAchievements=false;
            this.achievement_name="";
            this.achievement_description="";
            this.achievement_year="";
            this.$modal.hide('add-achievement');
        },
        delAchievement:function(index){
            this.Teacher.Achievements.splice(index, 1);
        }
    }
}
</script>
