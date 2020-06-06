import Vue from 'vue'
import App from './App.vue'
import VueRouter  from "vue-router";
import HelloWorld  from "./components/HelloWorld.vue";
import Post  from "./components/Post.vue";
import NewPost  from "./components/NewPost.vue";

Vue.use(VueRouter);

const routes=[
  {path:"/",component:HelloWorld},
  {path:"/post",component:Post},
  {path:"/new-post",component:NewPost}

];

const  router= new VueRouter({
  routes:routes,
  mode:"history"
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
