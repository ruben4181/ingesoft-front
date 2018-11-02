<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{name:'Posts', params:{ID_program:Post.ID_program, Program_name:Program_name}}">
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
            <h3>{{Post.Post_title}}</h3>
            <p>{{Post.Post_body}}</p>
            <div class="card">
            </div>
            <div v-if="auth==true">
                <button class="btn warning"
                @click="showDelPost()">
                    Eliminar post
                </button>
                <button class="btn info">
                    Editar post
                </button>
            </div>
        </div>
        <modal name="confirm-delete" height="auto">
            <div>
                <h3>¿Seguro deseas eliminar el post '{{Post.Post_title}}'?</h3>
                <p>Despues que elimines este post no lo podras recuperar de ninguna forma</p>
                <div style="height=100%;">
                <button class="btn warning"
                    @click="delPost()" style="width:50%;float:left;">
                        Borrar
                    </button>
                    <button class="btn default" style="width:50%;float:right;"
                    @click="cancelDelPost()">
                        Cancelar
                    </button>
                </div>
            </div>
        </modal>
        <modal name="post-deleted" height="auto">
            <div>
                <h3>Post borrado exitosamente</h3>
                <router-link :to="{name:'Posts', params:{ID_program:this.Post.ID_program, Program_name:this.Program_name}}">
                    <button class="btn default" style="height:100%">
                        Volver a la pagina principal
                    </button>
                </router-link>
            </div>
        </modal>
    </div>
</template>
<script>
import axios from 'axios';

export default { 

    created: function(){
        this.Post.ID_post=this.$route.params.ID_post;
        this.Program_name=this.$route.params.Program_name;
        this.getPost();
    },
    data() {
        return {
            urlApi:"http://localhost:8080/",
            auth:true,
            Program_name:"",
            isDeletingPost:false,
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
        getPost(){
            axios.get(this.urlApi+'getPost/'+this.Post.ID_post).then(response=>(this.Post=response.data));
        },
        delPost(){
            axios({
                method: 'post',
                url: 'http://localhost:8080/delPost',
                withCredentials: true,
                crossdomain: true,
                data: this.Post,
                headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            this.$modal.hide('confirm-delete');
            this.$modal.show('post-deleted');
        },
        showDelPost(){
            this.$modal.show('confirm-delete');
        },
        cancelDelPost(){
            this.$modal.hide('confirm-delete');
        }
    }
}
</script>
