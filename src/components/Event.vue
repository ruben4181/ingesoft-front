<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'Events', params:{ID_program:this.Event.ID_program, Program_name:Program_name}}">
                Atras
            </router-link>
            <router-link style="float:right;" :to="{name:'Login', parmas:{ID_user:2}}">Iniciar sesion</router-link>
        </div>
        <div>
            <agile :speed="3000" :autoplay="true" :pauseOnHover="true">
                <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
                <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
                <div class="slide"><img src="imgs/img1.png" style="width:100%"></div>
            </agile>
        </div>
        <div class="card">
            <h3>{{Event.Event_title}}</h3>
            <p>{{Event.Event_body}}</p>
            <p>Fecha: {{Event.Event_date}} {{Event.Event_time}}</p>
            <div class="card">
            </div>
            <div v-if="auth==true">
                <button class="btn warning"
                @click="showDelEvent()">
                    Eliminar evento
                </button>
                <router-link :to="{name: 'EditEvent', params: {ID_event: Event.ID_event, ID_program: Event.ID_program, Prgram_name: Program_name}}">
                    <button class="btn info">
                        Editar evento
                    </button>
                </router-link>
            </div>
        </div>
        <modal name="confirm-delete" class="modal-content" height="auto">
            <div>
                <div class="modal-header">
                    <h3 class="modal-title">¿Seguro deseas eliminar el evento '{{Event.Event_title}}'?</h3>
                </div>
                <div class="modal-body">
                    <p>Despues que elimines este evento no lo podras recuperar de ninguna forma</p>
                </div>
                <div class="modal-footer">
                <button class="btn btn-default"
                    @click="delEvent()">
                        Borrar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelDelEvent()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="event-deleted" height="auto">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">Evento borrado exitosamente</h3>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Events', params:{ID_program:this.Event.ID_program, Program_name:this.Program_name}}">
                        <button class="btn default">
                            Volver a la pagina principal
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

        this.Event.ID_event=this.$route.params.ID_event;
        this.Program_name=this.$route.params.Program_name;
        this.getEvent();
    },
    data() {
        return {
            urlApi:"http://localhost:8080/",
            auth:true,
            Program_name:"",
            isDeletingPost:false,
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
        getEvent(){
            axios.get(this.urlApi+'getEvent/'+this.Event.ID_event).then(response=>(this.Event=response.data));
        },
        delEvent(){
            axios({
                method: 'post',
                url: 'http://localhost:8080/delEvent',
                withCredentials: true,
                crossdomain: true,
                data: this.Event,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.hide('confirm-delete');
            this.$modal.show('event-deleted');
        },
        showDelEvent(){
            this.$modal.show('confirm-delete');
        },
        cancelDelEvent(){
            this.$modal.hide('confirm-delete');
        }
    }
}
</script>