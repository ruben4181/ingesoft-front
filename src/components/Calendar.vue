<template>
    <div id="app">
        <div class="navbar">
            <router-link :to="{ name:'Posts', params: {ID_program:this.id_program, Program_name:this.Program_name}}">Posts</router-link>
            <a style="float: right;">Iniciar sesion</a>
            <router-link :to="{ name:'Events', params: {ID_program:this.id_program, Program_name:this.Program_name}}">Events</router-link>
        </div>
        <div class="header">
            <h3>{{Program_name}}</h3>
            <h6>Programacion de actividades</h6>
        </div>
        <div class="leftcolumn">
            <div class="card">
                <h2>Regresa al inicio</h2>
                <router-link :to="{name:'Home'}">
                    <button class="btn default">
                        Atras
                    </button>
                </router-link>
            </div>
            <div id="feeds">
                <router-link :to="{name:'Event', params: {ID_event: item.ID_event}}"
                        v-for="(item, index) in events"
                        :key="index">
                        <div class="card">
                            <h2>{{item.Event_title}}</h2>
                            <h5>Publicado: {{item.Event_date_relased}} {{item.Event_time_relased}}</h5>
                            <div class="fakeimg" style="height:150px;">Image</div>
                            <p>{{item.Event_abstract}}</p>
                            <h5>Fecha: {{item.Event_date}} Hora: {{item.Event_time}}</h5>
                        </div>
                </router-link>
            </div>
        </div>
        <div class="rightcolumn">
            <div class="card">
                <h2>Logros destacados</h2>
                <p>{{Program_name}} ha tenido estupendos logros, más informacion dandlo click abajo</p>
                <button class="btn default">Ver logros</button>
            </div>
            <div class="card">
                <h2>¿Quieres conocer el plan de estudios?</h2>
                <p>{{Program_name}} es tu mejor opcion<br>Haz click en el siguiente enlace para 
                mas informacion acerca del syllabus del programa</p>
                <button class="btn default"
                @click="location.href='http://www.google.com';">
                Ver Syllabus</button>
            </div>
            <div class="card">
                <h2>Conoce tus futuros docentes</h2>
                <p>Observa el perfil de los docentes inscritos en {{ Program_name}}</p>
                <button class="btn default">Ver Docentes</button>
            </div>
            <div class="card">
                <h2>Modo editor</h2>
                <p>Ingresa un evento para esta seccion haciendo click más abajo</p>
                <router-link :to="{name: 'NewEvent', params: { ID_program: this.id_program, 
                Program_name: this.Program_name}}">
                    <button class="btn default">
                        Crear evento
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    created: function(){
        this.getEvents();
    },
    beforeUpdate:function(){
        this.buildCalendar();
    },
    data(){ return {
            title: "Hello World",
            events: null,
            urlApi:"http://localhost:8080/",
            id_program:1,
            Program_name:"No program selected",
            days:[],
            months:[],
            years:[],
            monthsNames:['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            eventsCalendar:[],
            masterItem:{
                year:"",
                months:[{
                    days:[]
                }]
            }
        }
    },
    methods: {
        getEvents : function(){
            this.id_program=this.$route.params.ID_program;
            console.log('ID_program', this.id_program);
            this.Program_name=this.$route.params.Program_name;
            //axios.get(this.urlApi+'getEvents/'+this.selectedProgram.ID_program).then(response=>(this.posts=response.data));
            axios.get(this.urlApi+'getEvents/'+this.id_program).then(response=>(this.events=response.data));
        },
        buildCalendar : function(){
            for(var i=0;i<this.events.length;i++){
                var item=this.events[i];
                if(this.days.length==0){
                    this.days.push(item.Event_date);
                }else{
                    if(!this.days.includes(item.Event_date)){
                        this.days.push(item.Event_date);
                    }
                }
            }
            for(var i=0; i<this.days.length; i++){
                var item=this.days[i];
                if(this.months.length==0){
                    this.months.push(item.substr(0,7))
                }else{
                    if(!this.months.includes(item.substr(0, 7))){
                        this.months.push(item.substr(0, 7));
                    }
                }
            }
            for(var i=0; i<this.months.length; i++){
                var item=this.months[i];
                if(this.years.length==0){
                    this.years.push(item.substr(0,4));
                }else{
                    if(!this.years.includes(item.substr(0,4))){
                        this.years.push(item.substr(0,4));
                    }
                }
            }
            for(var i=0; i<this.years.length;i++){
                this.masterItem.year=this.years[i];
                for(var j=0;j<this.months.length;j++){
                    if(this.months[j].substr(0,4)==this.masterItem.year){
                        if(!this.masterItem.months.includes(this.months[j])){
                            this.masterItem.months.push(this.months[j]);   
                        }
                    }
                }
                for(var j=0;j<this.masterItem.months;j++){
                    for(var k=0;k<this.days;k++){
                        if(this.days[k].substr(0,7)==this.masterItem.months[j]){
                            if(!this.masterItem.months.includes(this.days[k])){
                                this.masterItem.months.push(this.days[k]);
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>