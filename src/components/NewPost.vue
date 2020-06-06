<template>
  <div>
    <div>
      <Header
        url="background-image: url('img/home-bg.jpg')"
        title="Welcome Blogger"
        subtext="what's in your mind"
        :isPost="isPost"
      />

      <div v-if="isSpinning">
        <Spinner></Spinner>
      </div>
      <!-- Main Content -->
      <div v-if="!isSpinning" class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            {{newObject}}
            <form @submit.prevent="validateData()">
              <div class="control-group">
                <div class="form-group controls">
                  <label for="uid" id="selectUser">Select User Name</label>
                  <select v-model="form.userId" required>
                    <option
                      v-for="(user,index) in userList"
                      :key="index"
                      :value="user.id"
                    >{{user.name}}</option>
                  </select>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls">
                  <label>Title</label>
                  <input
                    type="text"
                    v-model="form.title"
                    class="form-control"
                    placeholder="Post title"
                    name="title"
                    id="title"
                    required
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group col-xs-12 floating-label-form-group controls">
                  <label>Body</label>
                  <textarea
                    rows="5"
                    class="form-control"
                    placeholder="Podt body"
                    v-model="form.body"
                    id="body"
                    name="body"
                    required
                  ></textarea>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <br />
              <div id="success"></div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary" id="sendMessageButton">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import { fetchUserData, submitPost } from "../helpers/service";
import Spinner from "vue-simple-spinner";

export default {
  name: "NewPost",
  data() {
    return {
      isPost: false,
      newObject: null,
      isSpinning: true,
      form: {
        userId: 1,
        title: "",
        body: ""
      },
      userList: null
    };
  },
  components: {
    Header,
    Spinner
  },
  async mounted() {    
    fetchUserData().then(users => {
      this.userList = users;
      this.isSpinning = false;
    });
  },
  methods: {
    validateData() {
      this.isSpinning = true;
      submitPost(this.form).then(obj => {
        this.newObject = obj;
        this.isSpinning = false;
      });
    }
  }
};
</script>

<style scoped>
#selectUser {
  display: block;
  margin: 0;
  vertical-align: baseline;
  padding-bottom: 7%;
  opacity: 0.8;
  font-size: 60%;
}
</style>