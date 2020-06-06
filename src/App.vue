<template>
  <div id="app">
     <Nav />
          <router-view></router-view>
     <hr />
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Nav,
    Footer,
  }
}
</script>
<style >
.clearfix{
color: white;  
}
</style>
