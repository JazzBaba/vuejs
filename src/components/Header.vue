<template>
    <header class="masthead" :style="url">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div v-if="!isPost" class="site-heading">
            <h1>{{title}}</h1>
            <span class="subheading">{{subtext}}</span>  
          </div>
          <div v-if="isPost" class="post-heading">
            <h1>{{title}}</h1>
            <h2 class="subheading">{{subtext}}</h2>
            <span class="meta">Posted by
              <a href="#">{{postedBy}}</a>
              on August 24, 2019</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    name:"Header",
    props:{
        url:String,
        title:String,
        subtext:String,
        isPost:Boolean,
        postedBy:String
    }
}
</script>