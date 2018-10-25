<template>
    <div id="app">
        <div class="header">
            <h3>{{title}}</h3>
        </div>
        <div class="leftcolumn">
            <div class="card">
                <h2>Regresa al inicio</h2>
                <button class="btn default">
                    Atras
                </button>
            </div>
            <div id="feeds">
                <a href="#" @click="seeMore(item)"
                        v-for="(item, index) in posts"
                        :key="index">
                        <div class="card">
                            <h2>{{item.Post_title}}</h2>
                            <h5>Oct 24, 2018</h5>
                            <div class="fakeimg" style="height:150px;">Image</div>
                            <p>{{item.Post_abstract}}</p>
                        </div>
                </a>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="card">
                <h2>Logros destacados</h2>
                <p>{{title}} ha tenido estupendos logros, más informacion dandlo click abajo</p>
                <button class="btn default">Ver logros</button>
            </div>
            <div class="card">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{title}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <button class="btn default"
                @click="location.href='http://www.google.com';">
                Ver Syllabus</button>
            </div>
            <div class="card">
                <h2>Conoce tus futuros docentes</h2>
                <p>Observa el perfil de los docentes inscritos en {{title}}</p>
                <button class="btn default">Ver Docentes</button>
            </div>
            <div class="card">
                <h2>Modo editor</h2>
                <p>Ingresa un post para esta seccion haciendo click más abajo</p>
                <button class="btn default"
                @click="newPost()">
                Crear Post
                </button>
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
            selectedProgram:{
                ID_program:1
            },
            urlApi:"http://localhost:8080/"
        }
    },
    methods: {
        getPosts : function(){
            axios.get(this.urlApi+'getPosts/'+this.selectedProgram.ID_program).then(response=>(this.posts=response.data));
        }
    }
}
</script>
