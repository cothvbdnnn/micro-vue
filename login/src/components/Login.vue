<template>
  <div>
    <h1 class="mb-3">Login</h1>
    <bizfly-form ref="formLogin">
      <bizfly-input placeholder="Email" class="email" v-model="formLogin.email" />
      <bizfly-input placeholder="Password" class="password my-3" v-model="formLogin.password" type="password" />
      <bizfly-button :loading="loading" type="primary" @click="onSubmit">
        Sign In
      </bizfly-button>
    </bizfly-form>
  </div>
</template>

<script>
import { axios, AUTH_TOKEN } from "@/utils/axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const signIn = await axios.post("auth/signin", this.formLogin).catch(() => { this.loading = false })
      localStorage.setItem("userEmail", `${signIn.data.email}`)
      Cookies.set(AUTH_TOKEN, signIn.data.auth_token, { expires: 999999 })
      this.loading = false
      this.$router.push("/list");
    },
  },
};
</script>

<style scoped >
form {
  max-width: 300px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: column;
}
</style>