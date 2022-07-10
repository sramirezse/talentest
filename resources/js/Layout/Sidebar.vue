<template>
  <aside
    class="
      sidenav
      navbar navbar-vertical navbar-expand-xs
      border-0 border-radius-xl
      my-3
      fixed-start
      ms-3
      bg-gradient-dark
    "
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="
          fas
          fa-times
          p-3
          cursor-pointer
          text-white
          opacity-5
          position-absolute
          end-0
          top-0
          d-none d-xl-none
        "
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="navbar-brand m-0" href="#" target="_blank">
        <img src="/logo.png" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold text-white">Tablero</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <br />
    <div
      class="collapse navbar-collapse w-auto max-height-vh-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(item, index) in items" :key="index">
          <router-link
            class="nav-link text-white"
            :class="currentRoute == item.path ? 'bg-gradient-primary' : ''"
            :to="item.path"
          >
            <div
              class="
                text-white text-center
                me-2
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">{{ item.meta.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="sidenav-footer position-absolute w-100 bottom-0">
      <div class="mx-3">
        <a class="btn bg-gradient-primary mt-4 w-100" href="#" type="button"
          >Portafolio</a
        >
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: "side-nav",
  data() {
    return {
      isOpen: false,
      items: [],
    };
  },
  created() {
    this.items = this.$router.options.routes.filter(
      (route) => route.name !== "PageNotFound" && route.name !== "Login"
    );
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {
    toggleSidenav() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style>
</style>
