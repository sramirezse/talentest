<template>
  <div>
    <Sidebar v-if="user"></Sidebar>
    <main
      class="
        main-content
        position-relative
        max-height-vh-100
        h-100
        border-radius-lg
      "
    >

      <MainContent v-if="user" :logout="logout" ></MainContent>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>

  <!-- End Navbar -->
</template>

<script>
import { mapGetters } from "vuex";
import Cookies from 'js-cookie'

import Sidebar from "./Sidebar.vue";
import MainContent from "./Content";
export default {
  components: {
    Sidebar: Sidebar,
    MainContent: MainContent,
  },
  data() {
    return {};
  },
  computed: mapGetters({
    user: "auth/user",
  }),
  methods: {
    async getUser() {
      await this.$store.dispatch('auth/fetchUser').then(
        (res) => {

            },
        (err) => {
        console.log(err);
          Cookies.remove("token");
        }
      );
    },
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");
      // Redirect to login.
        this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    this.getUser();
    // console.log('Hola mundo');
  },
};
</script>

<style>
</style>
