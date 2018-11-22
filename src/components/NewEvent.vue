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
                v-model="Event.Event_title"
                :min-height="30">
            </textarea-autosize>
            <h3>Abstract</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Event.Event_abstract"
                :min-height="30">
            </textarea-autosize>
            <h3>Contenido</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Event.Event_body"
                :min-height="30">
            </textarea-autosize>
            <h3>Fecha</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Event.Event_date"
                :min-height="30">
            </textarea-autosize>
            <textarea-autosize class="textarea-field" style="width:100%;"
                v-model="Event.Event_time"
                :min-height="30">
            </textarea-autosize>
            <button class="btn default" @click="showNewEventModal">
                Enviar nuevo Evento
            </button>
        </div>
        <modal name="confirm-newpost" height="auto" :adaptive="true" :scroll="true">
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
                    @click="sendNewEvent()">
                        Enviar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewEvent()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="newpost-added" height="auto" :adaptive="true" :scroll="true">
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
                    <router-link :to="{name:'Posts', params:{ID_program:this.Event.ID_program, Program_name:this.Program_name, rutas:rutas}}">
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
        this.Event.ID_program=this.$route.params.ID_program;
        
        console.log(this.Program_name);
        console.log(this.Event.ID_program);
    },
    data(){
        return {
            urlApi:"http://localhost:8080",
            Program_name:"",
            ID_program:1,
            auth:false,
            Event:{
                ID_event:1,
                Event_title:"",
                Event_abstract: "",
                Event_date_relased:"",
                Event_time_relased:"",
                Event_date:"",
                Event_time:"",
                Event_body:"",
                ID_user:4,
	            ID_program:1
            }
        }
    },
    methods:{
        sendNewEvent: function(){
            this.$modal.hide('confirm-newpost');
            axios({
                method: 'post',
                url: 'http://localhost:8080/newEvent',
                withCredentials: true,
                crossdomain: true,
                data: this.Event,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.show('newpost-added');
        },
        showNewEventModal : function(){
            this.$modal.show("confirm-newpost");
        },
        cancelNewEvent : function(){
            this.$modal.hide("confirm-newpost");
        }
    }
}

</script>