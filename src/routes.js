import Home from './components/Home.vue';
import Posts from './components/Posts.vue';
import NewPost from './components/NewPost.vue';
import Post from './components/Post.vue';



export default[
    {path:'/', component: Home, name:'Home'},
    {path:'/Posts', component: Posts, name:'Posts'},
    {path:'/NewPost', component: NewPost, name:'NewPost'},
    {path:'/Post', component: Post, name:'Post'}
]