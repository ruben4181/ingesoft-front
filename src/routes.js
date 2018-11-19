import Home from './components/Home.vue';
import Posts from './components/Posts.vue';
import NewPost from './components/NewPost.vue';
import Post from './components/Post.vue';
import EditPost from './components/EditPost.vue';
import Events from './components/Events.vue';
import NewEvent from './components/NewEvent.vue';
import Event from './components/Event.vue';
import EditEvent from './components/EditEvent.vue';
import Calendar from './components/Calendar.vue';

export default[
    {path:'/', component: Home, name:'Home'},
    {path:'/Posts', component: Posts, name:'Posts'},
    {path:'/NewPost', component: NewPost, name:'NewPost'},
    {path:'/Post', component: Post, name:'Post'},
    {path:'/EditPost', component: EditPost, name: 'EditPost'},
    {path:'/Events', component: Events, name:'Events'},
    {path:'/NewEvent', component: NewEvent, name:'NewEvent'},
    {path:'/Event', component:Event, name:'Event'},
    {path:'/EditEvent', component:EditEvent, name:'EditEvent'},
    {path:'/Calendar', component:Calendar, name:'Calendar'}
]