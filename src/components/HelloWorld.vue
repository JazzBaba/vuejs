<template>
  <div>
    <Header
      url="background-image: url('img/home-bg.jpg')"
      title="Clean Blog"
      subtext="A Blog Theme by Start Bootstrap"
      :isPost="isPost"
    />

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div v-for="(post) in dataDisplay" :key="post.id">
            <div class="post-preview">
              <router-link
                :to="{path:'/post', query:{postId:post.id,userId:post.userId,userName:getUser(post.userId)}}"
              >
                <h2 class="post-title">
                  <!-- Man must explore, and this is exploration at its greatest -->
                  {{post.title}}
                </h2>
                <h3 class="post-subtitle">
                  <!-- Problems look mighty small from 150 miles up -->
                  {{post.body}}
                </h3>
              </router-link>
              <p class="post-meta">
                Posted by
                <a href="#">
                  {{getUser(post.userId)}}
                  <!-- {{post.obj.userName}} -->
                </a>
                on September 24, 2019
              </p>
            </div>
            <hr />
          </div>
          <div v-if="isSpinning">
            <Spinner></Spinner>
          </div>
          <div class="clearfix">
            <a
              class="btn btn-primary float-left"
            >POSTS IN PAGE ({{dataDisplay?dataDisplay.length:0}})</a>
            <a class="btn btn-primary float-right" @click="getMoreData()">Load more &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPostData, fetchUserData } from "../helpers/service";
import Header from "./Header";
import Spinner from "vue-simple-spinner";

const listSize = 10;

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return {
      dataAPI: null,
      dataDisplay: null,
      userList: null,
      isPost: false,
      isSpinning:true
    };
  },
  async beforeMount() {
    await fetchUserData().then(user => {
      this.userList = user;
      console.log(this.userList);
    });
    await fetchPostData(1, listSize).then(data => {
      this.dataDisplay = data;
      this.isSpinning = false;
    });
  },
  methods: {
    getMoreData() {
      this.isSpinning = true;
      var numberOfPages = this.dataDisplay.length / listSize + 1;
      fetchPostData(numberOfPages, listSize).then(data => {        
        if (data) {
          this.isSpinning = false;
          this.dataDisplay = this.dataDisplay.concat(data);/*Need to check if data is already exist  arr1.some(item => arr2.includes(item)) */
        }
      });
    },
    getUser(userId) {
      return this.userList.find(x => x.id == userId).name;
    }
  },
  components: {
    Header,
    Spinner
  }
};
</script>

