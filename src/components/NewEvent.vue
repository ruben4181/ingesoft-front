<template>
    <div id="app" class="card">
        <div class="navbar">
            <a href="#" class>Nuevo Post</a>
            <a href="#" class="active">Nuevo evento</a>
            <a href="#" style="float:right;">Iniciar Sesion</a>
        </div>
        <div id="container" class="form-style-2">
            <h3>Titulo</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Post.Post_title"
                :min-height="30">
            </textarea-autosize>
            <h3>Abstract</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Post.Post_abstract"
                :min-height="30">
            </textarea-autosize>
            <h3>Contenido</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Post.Post_body"
                :min-height="30">
            </textarea-autosize>
            <button class="btn default" @click="console.log(datetimeEmpty)">
                Enviar nuevo Evento
            </button>
            <datetime
                type="datetime"
                v-model="datetimeEmpty"
                input-class="my-class"
                value-zone="America/Colombia"
                zone="America/Colombia"
                :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
                :phrases="{ok: 'Continue', cancel: 'Exit'}"
                :hour-step="2"
                :minute-step="15"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime"
                :week-start="1"
                use12-hour
                auto>
            </datetime>
        </div>
        <modal name="confirm-newpost" height="auto">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">¿Desea enviar este nuevo Post?</h3>
                </div>
                <div class="modal-body">
                    <p>Si confirma el envio de este Post sera enviado directamente a la seccion de Post y será visible para 
                        los usuarios de inmediato
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="sendNewPost()">
                        Enviar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewPost()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="newpost-added" height="auto">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Un nuevo post ha sido añadido</h3>
                </div>
                <div class="modal-body">
                    <p> 
                        Su post ha sido creado correctamente
                    </p>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Posts', params:{ID_program:this.Post.ID_program, Program_name:this.Program_name}}">
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
            this.$modal.hide('confirm-newpost');
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
            this.$modal.show('newpost-added');
        },
        showNewPostModal : function(){
            this.$modal.show("confirm-newpost");
        },
        cancelNewPost : function(){
            this.$modal.hide("confirm-newpost");
        }
    }
}

</script>