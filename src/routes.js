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
import Teachers from './components/Teachers.vue';
import Courses from './components/Courses.vue';
import NewTeacher from './components/NewTeacher.vue';
import Teacher from './components/Teacher.vue';
import Course from './components/Course.vue';
import UpdateTeacher from './components/UpdateTeacher.vue';
import NewCourse from './components/NewCourse.vue';
import EditCourse from './components/EditCourse.vue';

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
    {path:'/Calendar', component:Calendar, name:'Calendar'},
    {path:'/Teachers', component:Teachers, name:'Teachers'},
    {path:'/Courses', component:Courses, name:'Courses'},
    {path:'/NewTeacher', component:NewTeacher, name:'NewTeacher'},
    {path:'/Teacher', component:Teacher, name:'Teacher'},
    {path:'/Course', component:Course, name:'Course'},
    {path:'/UpdateTeacher', component:UpdateTeacher, name:'UpdateTeacher'},
    {path:'/NewCourse', component:NewCourse, name:'NewCourse'},
    {path:'/EditCourse', component:EditCourse, name:'EditCourse'}
]