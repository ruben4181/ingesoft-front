<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'Home'}">
                Home
            </router-link>
            <router-link :to="{name:'NewProgram'}" class="active">
                NewProgram
            </router-link>
        </div>
        <div>
            <h3>Tipo de postgrado</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="program.Program_category" :min-height="20">    
            </textarea-autosize>
            <h3>Titulo del programa</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="program.Program_name" :min-height="20">    
            </textarea-autosize>
            <h3>Descripccion del programa</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="program.Program_description" :min-height="20">    
            </textarea-autosize>
            <h3>Username del Director de la carrera</h3>
            <textarea-autosize class="textarea-field" style="width:100%;"
                    v-model="username" :min-height="20">    
            </textarea-autosize>
            <button class="btn default"
            @click="showNewProgramModal()">
                Guardar
            </button>
        </div>
        <modal name="confirm-newprogram" height="auto" :adaptive="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">¿Deseas editar este programa?</h3>
                </div>
                <div class="modal-body">
                    <p>Los cambios efectuados se veran de forma inmediata</p>
                </div> 
                <div class="modal-footer">
                    <button class="btn btn-default"
                    @click="sendNewProgram()">
                        Enviar
                    </button>
                    <button class="btn btn-default"
                    @click="cancelNewProgramModal()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="program-added" height="auto" :adaptive="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Editado con exito</h3>
                </div>
                <div class="modal-body">
                    <p>
                        El nuevo programa se ha editado de forma exitosa al sistema</p>
                </div>
                <div class="modal-footer">
                    <router-link :to="{name:'Home'}">
                        <button class="btn btn-default">
                            OK
                        </button>
                    </router-link>
                </div>
            </div>
        </modal>
        <modal name="nousername" height="auto" :adaptive="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Error</h3>
                </div>
                <div class="modal-body">
                    <p>
                        El usuario escogido como director de carrera no existe en la base de datos</p>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created:function(){
        this.program=this.$route.params.Program;
    },
    data: function(){
        return{
            username:"",
            program:{
            ID_program:0,
            Program_category:"Maestria",
            Program_name:"",
            Program_description:"",
            ID_user:0
            }
        }
    },
    methods:{
        showNewProgramModal : function(){
            this.$modal.show('confirm-newprogram');
        },
        cancelNewProgramModal : function(){
            this.$modal.hide('confirm-newprogram');
        },
        sendNewProgram : function () {
            this.$modal.hide('confirm-newprogram');
            axios.get("http://localhost:8080/getUser/"+this.username).then(response=>{
                this.program.ID_user=response.data.ID_user;
                if (this.program.ID_user>0){
                    axios({
                        method: 'post',
                        url: 'http://localhost:8080/updateProgram',
                        withCredentials: true,
                        crossdomain: true,
                        data: this.program,
                        headers: { 
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    });
                    this.$modal.show('newprogram-added');
                }else{
                    this.$modal.show('nousername');
                }
             });
        }
    }
}
</script>
