<template>
    <div id="app" class="card">
        <div class="navbar">
            <router-link :to="{name:'Home'}" class="active">Atras</router-link>
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
            <router-link :to="{name:'Events', params:{ID_program:this.Event.ID_program, Program_name:this.Program_name}}">
                <button class="btn default" @click="sendNewEvent()">
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
        this.Event.ID_program=this.$route.params.ID_program;
        this.Event.ID_event=this.$route.params.ID_event;
        this.fullOldEvent();
    },
    data(){
        return {
            urlApi:"http://localhost:8080/",
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
            axios({
                method: 'post',
                url: 'http://localhost:8080/updateEvent',
                withCredentials: true,
                crossdomain: true,
                data: this.Event,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        },
        fullOldEvent: function(){
            axios.get(this.urlApi+'getEvent/'+this.Event.ID_event).then(response=>(this.Event=response.data));
        }
    }
}
</script>