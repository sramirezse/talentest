<template>
  <!-- Navbar -->

  <nav
    class="
      navbar navbar-main navbar-expand-lg
      px-0
      mx-4
      shadow-none
      border-radius-xl
    "
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="container-fluid  py-1 px-3">

      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >

        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a
              href="#"
              class="nav-link text-body font-weight-bold px-0"
              @click="logout"
            >
              <i class="fa fa-user me-sm-1"></i>

              <span class="d-sm-inline d-none">Cerrar sesión</span>
            </a>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>


        </ul>
      </div>
    </div>
  </nav>

  <!-- End Navbar -->
</template>

<script>
export default {
  props: {
    logout: {
      type: Function,
    },
    user: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
      }),
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style>
</style>
