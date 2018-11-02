import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import Routes from './routes';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VModal from 'vue-js-modal'


//Script to set up the auto hight text area resizing

//End of auto height text area resizing

Vue.use(VueResource);
Vue.use(VueRouter); // This makes all the magic hapen and Vue recognizes the router-view and router-link
Vue.use(VueTextareaAutosize);
Vue.use(VModal);

const router = new VueRouter({
  routes: Routes
});

new Vue({
  render: h=>h(App),
  router:router
}).$mount('#app');