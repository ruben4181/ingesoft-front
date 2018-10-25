import Vue from 'vue';
import Post from './components/Posts.vue';

new Vue({
    render: h => h(Post)
}).$mount('#app');