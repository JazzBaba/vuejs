const axios = require('axios');

const BASE_URL = "https://jsonplaceholder.typicode.com/"

async function fetchPostData(_page, _limit) {
  var url = BASE_URL + `posts?_sort=id&_order=desc&_page=` + _page + `&_limit=` + _limit;
  return await Get(url);
}

async function fetchUserData() {
  var url = BASE_URL + `users`;
  return await Get(url);
}

async function fetchPostById(postId) {
  var url = BASE_URL + `posts/` + postId + `?_embed=comments`;
  return await Get(url);
}

async function submitPost(formData) {
  var url = BASE_URL + `posts`;
  return await axios.post(url, formData).then(res => res.data);

}

async function Get(url) {
  return await axios.get(url)
    .then(res => res.data);
}

export {
  fetchPostData,
  fetchUserData,
  fetchPostById,
  submitPost
};