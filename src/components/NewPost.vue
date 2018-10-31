<template>
    <div id="app">
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
            <button clss="btn default"
            @click="sendNewPost()">
                Enviar nuevo Post
            </button>
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
    },
    data(){
        return {
            urlApi:"http://localhost:8080",
            Program_name:"",
            ID_program:null,
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
           console.log(this.Post);
        }
    }
}

</script>