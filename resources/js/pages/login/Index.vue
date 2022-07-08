<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center">
            <div class="brand_logo_container">
              <img src="/logo.png" class="brand_logo" alt="Logo" />
            </div>
          </div>
          <div class="d-flex justify-content-center form_container">
            <form @submit.prevent="login">
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="email"
                  class="form-control input_user"
                  required
                  v-model="formData.email"
                  autocomplete="email"
                  autofocus
                  placeholder="Correo"
                />
                <!-- si hay error -->
                <span class="invalid-feedback" role="alert">
                  <strong></strong>
                </span>
                <!-- \\ si hay error -->
              </div>

              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  type="password"
                  class="form-control input_pass"
                  required
                  v-model="formData.password"
                  autocomplete="current-password"
                  placeholder="Contraseña"
                />
                <!-- si hay error -->
                <span class="invalid-feedback" role="alert">
                  <strong></strong>
                </span>
                <!-- \\ si hay error -->
              </div>

              <div class="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" class="btn login_btn">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>

          <div class="mt-4">
            <div class="d-flex justify-content-center links">
              Registro <a href="#" class="ml-2">Aqui</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
        };
    },
    methods:{
        async login() {
            try {
                await this.$store.dispatch('auth/login', this.formData);
                this.$router.push({ name: 'Tablero' });
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style scoped>
@import url('../../../css/login.css');
</style>
