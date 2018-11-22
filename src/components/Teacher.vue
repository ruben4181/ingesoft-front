<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="item"
                v-for="(item, i) in rutas" :key="i">
                    {{item.name}}
            </router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div class="profile">
            <div class="profilecard">
                <div class="smallcard">
                    <div class="imgcontainer">
                        <img src="imgs/avatar.png" alt="Avatar" class="avatar">
                    </div>
                    <h3>{{teacher.Firstname}} {{teacher.Lastname}}</h3>
                    <h4>{{teacher.Teacher_department}}</h4>
                </div>
                <div class="smallcard">
                    <h5>Enviale un e-mail a {{teacher.Firstname}}</h5>
                    <button class="btn default">Enviar correo</button>
                </div>
                <div class="smallcard">
                    <button class="btn warning"
                    @click="showDelTeacherModal()">
                        Eliminar
                    </button>
                    <router-link :to="{name:'UpdateTeacher', params:{
                        ID_program:id_program, Program_name:Program_name, rutas:rutas,
                        Teacher:teacher
                    }}">
                        <button class="btn default">
                            Actualizar datos
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="container-right">
                <div class="smallcard">
                    <h4>Estudios</h4>
                    <div class="smallcard"
                    v-for="(degree, i) in teacher.Degrees" :key="i">
                        <h5>{{degree.Degree_name}}</h5>
                        <h6>{{degree.Degree_college}}. {{degree.Degree_city}}, {{degree.Degree_year.substr(0,4)}}</h6>
                        <h6>{{degree.Degree_extra_info}}</h6>
                    </div>
                    <h4>Proyectos/Reconocimientos</h4>
                    <div class="smallcard"
                    v-for="(achievement, i2) in teacher.Achievements" :key="i2">
                        <h5>{{achievement.Achievement_name}}</h5>
                        <h6>{{achievement.Achievement_description}}</h6>
                        <h6>{{achievement.Achievement_year.substr(0,4)}}</h6>
                    </div>
                </div>
            </div>
        </div>
        <modal name="confirm-delteacher" height="auto" :adaptive="true" :scroll="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">¿Desea eliminar este profesor?</h3>
                </div>
                <div class="modal-body">
                    <p>Si lo elimin los datos relevantes se veran comprometidos para siempre
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="delTeacher()">
                        Eliminar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelDelTeacher()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="teacher-deleted" height="auto" :adaptive="true" :scroll="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Profesor eliminado</h3>
                </div>
                <div class="modal-body">
                    <p>El profesor ha sido eliminado correctamente
                    </p>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Teachers', params:{
                        ID_program:id_program, Program_name:Program_name, rutas:rutas 
                        }}">
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

        this.teacher=this.$route.params.Teacher;
        this.Program_name=this.$route.params.Program_name;
        this.id_program=this.$route.params.ID_program;
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
        this.rutas.push({name:'Teacher', params:{ID_program:this.id_program, Program_name:this.Program_name, rutas:this.rutas}});
    },
    data: function(){
        return {
            teacher:null,
            Program_name:"",
            id_program:1,
            rutas:[]
        }
    }, methods:{
        delTeacher : function(){
            this.$modal.hide('confirm-delteacher');
            axios({
                method: 'post',
                url: 'http://localhost:8080/delTeacher',
                withCredentials: true,
                crossdomain: true,
                data: this.teacher,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.show('teacher-deleted');
        },
        showDelTeacherModal : function(){
            this.$modal.show('confirm-delteacher');
        },
        cancelDelTeacher : function(){
            this.$modal.hide('confirm-delteacher');
        }
    }
}
</script>
