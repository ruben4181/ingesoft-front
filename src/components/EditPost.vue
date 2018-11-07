<template>
    <div id="app" class="card">
        <div class="navbar">
            <router-link :to="{name:'Home'}" class="active">Atras</router-link>
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
                    Editar nuevo Post
                </button>
            </router-link>
            <modal name="confirm-update" height="auto">
                <div class="modal-content">
                <div class="modal-header">
                    <h3>¿Deseas realizar la edicion?</h3>
                </div>
                <div class="modal-body">
                <p>Si confirmas la edicion los cambios se veran reflejados automaticamente para los usuarios de la pagina</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                        @click="delPost()" style="width:50%;float:left;">
                        Enviar
                    </button>
                    <button class="btn bnt-default" style="width:50%;float:right;"
                    @click="cancelDelPost()">
                        Cancelar
                    </button>
                </div>
                </div>
            </modal>
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
        this.Post.ID_post=this.$route.params.ID_post;
        this.fullOldPost();
    },
    data(){
        return {
            urlApi:"http://localhost:8080/",
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
                url: 'http://localhost:8080/updatePost',
                withCredentials: true,
                crossdomain: true,
                data: this.Post,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        },
        fullOldPost: function(){
            axios.get(this.urlApi+'getPost/'+this.Post.ID_post).then(response=>(this.Post=response.data));
        }
    }
}

</script>