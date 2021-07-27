<template>
  <div>
    <Header title="Login" class="mb-m"></Header>
    <bf-form ref="formLogin">
      <bf-input placeholder="Email" class="email" v-model="formLogin.email" />
      <bf-input
        placeholder="Password"
        class="password my-s"
        v-model="formLogin.password"
        type="password"
      />
      <bf-button :loading="loading" type="primary" @click="onSubmit">
        Sign In
      </bf-button>
    </bf-form>
    <bf-radio-group @change="changeLang" v-model="lang" class="mt-m">
      <bf-radio :label="'vi'">vi</bf-radio>
      <bf-radio :label="'en'">en</bf-radio>
    </bf-radio-group>
    <bf-pagination
      class="mt-m"
      :pageSize="10"
      :total="50"
      :pageSizes="[10, 20, 30, 40, 50, 100]"
      :currentPage="1"
      layout="total ,sizes, prev, pager, next"
    />
    <el-pagination
      class="mt-m"
      :pageSize="10"
      :total="50"
      :pageSizes="[10, 20, 30, 40, 50, 100]"
      :currentPage="1"
      layout="total ,sizes, prev, pager, next"
    />
  </div>
</template>

<script>
import { axios, AUTH_TOKEN } from "@/utils/axios";
import { Header } from "@todo/style";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      loading: false,
      lang: "vi",
    };
  },
  components: {
    Header,
  },
  beforeMount() {
    if (Cookies.get("lang") === "vi") {
      this.lang = "vi";
    } else {
      this.lang = "en";
    }
  },
  methods: {
    changeLang() {
      if (this.lang === "vi") {
        Cookies.set("lang", "vi");
        location.reload();
        return;
      }
      Cookies.set("lang", "en");
      location.reload();
    },
    async onSubmit() {
      this.loading = true;
      const signIn = await axios
        .post("auth/signin", this.formLogin)
        .catch(() => {
          this.loading = false;
        });
      localStorage.setItem("userEmail", `${signIn.data.email}`);
      Cookies.set(AUTH_TOKEN, signIn.data.auth_token);
      this.loading = false;
      this.$router.push("/list");
    },
  },
};
</script>

<style scoped>
form {
  max-width: 300px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: column;
}
.el-pagination {
  max-width: 600px;
  margin: auto;
}
</style>
