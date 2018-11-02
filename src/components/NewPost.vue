<template>
    <div id="app" class="card">
        <div class="navbar">
            <a href="#" class="active">Nuevo Post</a>
            <a href="#">Nuevo evento</a>
            <a href="#" style="float:right;">Iniciar Sesion</a>
        </div>
        <div id="container">
            <h3>Titulo</h3>
            <textarea-autosize
                v-model="Post.Post_title"
                :min-height="30">
            </textarea-autosize>
            <h3>Abstract</h3>
            <textarea-autosize
                v-model="Post.Post_abstract"
                :min-height="30">
            </textarea-autosize>
            <h3>Contenido</h3>
            <textarea-autosize
                v-model="Post.Post_body"
                :min-height="30">
            </textarea-autosize>
            <router-link :to="{name:'Posts', params:{ID_program:this.Post.ID_program, Program_name:this.Program_name}}">
                <button class="btn default" @click="sendNewPost()">
                    Enviar nuevo Post
                </button>
            </router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    created(){
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        axios.defaults.headers.post['Content-Type']='application/json';
        this.auth=true;
        this.Program_name=this.$route.params.Program_name;
        this.Post.ID_program=this.$route.params.ID_program;
        
        console.log(this.Program_name);
        console.log(this.Post.ID_program);
    },
    data(){
        return {
            urlApi:"http://localhost:8080",
            Program_name:"",
            ID_program:1,
            auth:false,
            Post:{
                ID_post:1,
                Post_title:"",
                Post_abstract: "",
                Post_body:"",
                ID_user:4,
	            ID_program:1
            }
        }
    },
    methods:{
        sendNewPost: function(){
            axios({
                method: 'post',
                url: 'http://localhost:8080/newPost',
                withCredentials: true,
                crossdomain: true,
                data: this.Post,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        }
    }
}

</script>