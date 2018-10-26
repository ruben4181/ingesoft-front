<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import Home from './components/Home.vue';
import Posts from './components/Posts.vue';

export default {
    components:{
        'Home':Home,
        'Posts':Posts
    },
    data(){
        return {
            title:"App.vue file"
        }
    }
}
</script>
