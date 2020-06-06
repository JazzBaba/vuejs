 <template>
  <div>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-if="!loading">
      <Header
        url="background-image: url('img/post-bg.jpg')"
        :title="displayData.title"
        :subtext="displayData.body"
        :isPost="isPost"
        :postedBy="userName"
      />

      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div v-for="(comment,index) in displayData.comments" :key="index">
              <div class="post-preview">
                <h4 class="post-subtitle">{{comment.body}}</h4>
                <p class="post-meta">
                  Commented by
                  <a href="#">{{comment.name}}</a>
                  on September 24, 2019
                </p>
              </div>
            </div>
            <div class="clearfix">
              <a
                class="btn btn-primary float-left"
              >COMMENTS ON PAGE ({{displayData?displayData.comments.length:0}})</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import { fetchPostById } from "../helpers/service";
import Spinner from "vue-simple-spinner";

export default {
  name: "Post",
  data() {
    return {
      displayData: null,
      userName: String,
      loading: true,
      isPost: true
    };
  },
  components: {
    Header,
    Spinner
  },
  async beforeMount() {
    if (this.$route && this.$route.query && this.$route.query.postId) {
      var queryParams = this.$route.query;
      fetchPostById(queryParams.postId)
        .then(data => {
          this.displayData = data;
          this.loading = false;
        })
        .finally(() => (this.loading = false));
      this.userName = queryParams.userName;
    }
  }
};
</script>