import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import Routes from './routes';


Vue.use(VueResource);
Vue.use(VueRouter); // This makes all the magic hapen and Vue recognizes the router-view and router-link

const router = new VueRouter({
  routes: Routes
});

new Vue({
  render: h=>h(App),
  router:router
}).$mount('#app');