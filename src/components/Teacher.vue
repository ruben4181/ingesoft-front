<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'Teachers', params:{ID_program:teacher.ID_program, Program_name:Program_name}}">Atras</router-link>
            <router-link :to="{name:'Login'}" style="float:right;">Iniciar sesion</router-link>
        </div>
        <div class="profile">
            <div class="profilecard">
                <div class="imgcontainer">
                    <img src="imgs/avatar.png" alt="Avatar" class="avatar">
                </div>
                <h3>{{teacher.Firstname}} {{teacher.Lastname}}</h3>
                <h4>{{teacher.Teacher_department}}</h4>
            </div>
            <div class="container-right">
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
</template>
<script>
export default {
    created: function(){
        this.teacher=this.$route.params.Teacher;
        this.Program_name=this.$route.params.Program_name;
    },
    data: function(){
        return {
            teacher:null,
            Program_name:""
        }
    }
}
</script>
