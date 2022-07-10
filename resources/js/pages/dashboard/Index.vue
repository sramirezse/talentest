<template>
  <div>
    <h2>Hola mundotasdasdaasdasdasdassssssssssssssssssssssssse</h2>
  </div>
</template>

<script>
export default {
    methods: {
        async getUser() {
            // await this.$store.dispatch('auth/fetchUser');
        },
    },
    mounted() {
        this.getUser();
        // console.log('Hola mundo');
    },
}
</script>

<style>

</style>
