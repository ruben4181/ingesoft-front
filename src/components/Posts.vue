<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'Home'}">
                Inicio
            </router-link>
            <router-link :to="{name:'Posts', params:{ID_program:id_program, Program_name:Program_name}}" class="active">Posts</router-link>
            <router-link :to="{ name:'Events', params: {ID_program:this.id_program, Program_name:Program_name} }">Eventos</router-link>
            <a style="float: right;">Iniciar sesion</a>
        </div>
        <div class="header">
            <h3>{{Program_name}}</h3>
        </div>
        <div class="leftcolumn">
            <div id="feeds">
                <router-link :to="{name:'Post', params: {ID_post: item.ID_post, Program_name:Program_name}}"
                        v-for="(item, index) in posts"
                        :key="index">
                        <div class="card">
                            <h2>{{item.Post_title}}</h2>
                            <h5>Oct 24, 2018</h5>
                            <div class="fakeimg" style="height:150px;">Image</div>
                            <p>{{item.Post_abstract}}</p>
                        </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="card">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{Program_name}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <router-link :to="{name:'Courses', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                <button class="btn default">
                    Ver Syllabus</button>
                </router-link>
            </div>
            <div class="card">
                <h2>Conoce tus futuros docentes</h2>
                <p>Observa el perfil de los docentes inscritos en {{ Program_name}}</p>
                <router-link :to="{name:'Teachers', params:{ID_program:id_program, Program_name:Program_name, rutas:rutas}}">
                    <button class="btn default">Ver Docentes</button>
                </router-link>
            </div>
            <div class="card">
                <h2>Modo editor</h2>
                <p>Ingresa un post para esta seccion haciendo click más abajo</p>
                <router-link :to="{name: 'NewPost', params: { ID_program: this.id_program, 
                Program_name: this.Program_name}}">
                    <button class="btn default">
                        Crear Post
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
        this.getPosts();
    },
    data(){ return {
            title: "Hello World",
            posts: null,
            urlApi:"http://localhost:8080/",
            id_program:1,
            Program_name:"No program selected",
            rutas:[{name:'Home'}]
        }
    },
    methods: {
        getPosts : function(){
            this.id_program=this.$route.params.ID_program;
            this.Program_name=this.$route.params.Program_name;
            this.rutas.push({name:'Posts', params:{ID_program:this.id_program, Program_name:this.Program_name}});
            //axios.get(this.urlApi+'getPosts/'+this.selectedProgram.ID_program).then(response=>(this.posts=response.data));
            axios.get(this.urlApi+'getPosts/'+this.id_program).then(response=>(this.posts=response.data));
        }
    }
}
</script>
