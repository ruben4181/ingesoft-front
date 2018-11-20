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
                <div class="smallcard" 
                v-for="(item, index) in eventsCalendar" :key="index">
                    <h3>{{item.year}}</h3>
                    <div class="smallcard"
                    v-for="(month, index2) in item.months" :key="index2">
                        <h4>{{month.name}}</h4>
                        <div class="dayclass"
                        v-for="(dayItem, index3) in month.days" :key="index3">
                            <h5>{{dayItem.day}}</h5>
                            <router-link :to="{name:'Event', params: {ID_event: eventItem.ID_event}}"
                            v-for="(eventItem, index4) in getEventsInDate(dayItem.original)" :key="index4"
                            class="calendarlink">
                                <h6>{{eventItem.Event_title}}</h6>
                                <h6>{{eventItem.Event_time}}</h6>
                            </router-link>
                        </div>
                    </div>
                </div>
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
        }
    },
    methods: {
        getEvents : function(){
            this.id_program=this.$route.params.ID_program;
            console.log('ID_program', this.id_program);
            this.Program_name=this.$route.params.Program_name;
            //axios.get(this.urlApi+'getEvents/'+this.selectedProgram.ID_program).then(response=>(this.posts=response.data));
            axios.get(this.urlApi+'getEvents/'+this.id_program).then((response)=>{this.events=response.data;this.buildCalendar()});
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
                var mItem={ year:"", months:[]}
                mItem.year=this.years[i];
                for(var j=0;j<this.months.length;j++){
                    if(this.months[j].substr(0,4)==mItem.year){
                        mItem.months.push(
                            {name:this.getMonthName(this.months[j].substr(5,2)), original:this.months[j], days:[]});
                    }
                }
                for(var j=0; j<mItem.months.length;j++){
                    for(var k=0; k<this.days.length;k++){
                        if(this.days[k].substr(0,7)==mItem.months[j].original){
                            mItem.months[j].days.push({day:this.days[k].substr(8,2), original:this.days[k]});
                        }
                    }
                }
                this.eventsCalendar.push(mItem);
            }
            console.log("Numero de años "+this.eventsCalendar.length);
        },
        getMonthName : function(str){
            if(str=="01"){ return this.monthsNames[0];}
            if(str=="02"){ return this.monthsNames[1];}
            if(str=="03"){ return this.monthsNames[2];}
            if(str=="04"){ return this.monthsNames[3];}
            if(str=="05"){ return this.monthsNames[4];}
            if(str=="06"){ return this.monthsNames[5];}
            if(str=="07"){ return this.monthsNames[6];}
            if(str=="08"){ return this.monthsNames[7];}
            if(str=="09"){ return this.monthsNames[8];}
            if(str=="10"){ return this.monthsNames[9];}
            if(str=="11"){ return this.monthsNames[10];}
            if(str=="12"){ return this.monthsNames[11];}
            return "error";
        },
        getEventsInDate(str){
            var events=[];
            for(var i=0; i<this.events.length; i++){
                if(str==this.events[i].Event_date){
                    events.push(this.events[i]);
                }
            }
            return events;
        }
    }
}
</script>