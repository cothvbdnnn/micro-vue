<template>
  <bf-row class="row">
    <bf-col :span="12" class="form">
      <Header title="Custom Event"></Header>
      <h2>Add</h2>
      <bf-form class="mt-3" ref="formCreate" :model="formCreate">
        <bf-row>
          <bf-col :span="14">
            <bf-input
              placeholder="Add"
              type="text"
              v-model="formAddTodo.title"
            />
          </bf-col>
          <bf-col :span="8">
            <bf-button
              :loading="loadingCreate"
              type="primary"
              @click="submitFormAddTodo"
              >Add</bf-button
            >
          </bf-col>
        </bf-row>
      </bf-form>
      <bf-form class="mt-3" ref="formEdit">
        <h2>Edit</h2>
        <bf-row>
          <bf-col :span="14">
            <bf-input
              placeholder="Edit"
              type="text"
              v-model="formEditTodo.title"
            />
          </bf-col>
          <bf-col :span="8">
            <bf-button
              :loading="loadingEdit"
              type="primary"
              @click="submitFormEditTodo"
              >Edit</bf-button
            >
          </bf-col>
        </bf-row>
      </bf-form>
    </bf-col>
    <bf-col :span="12" class="form">
      <Header title="Global Store"></Header>
      <h2>Add</h2>
      <bf-form class="mt-3" ref="formCreate" :model="formCreate">
        <bf-row>
          <bf-col :span="14">
            <bf-input placeholder="Add" type="text" v-model="titleGlobal" />
          </bf-col>
          <bf-col :span="8">
            <bf-button type="primary" @click="submitAddGlobal">Add</bf-button>
          </bf-col>
        </bf-row>
      </bf-form>
      <bf-form class="mt-3" ref="formEdit">
        <h2>Edit</h2>
        <bf-row>
          <bf-col :span="14">
            <bf-input
              placeholder="Edit"
              type="text"
              v-model="itemGlobal.title"
            />
          </bf-col>
          <bf-col :span="8">
            <bf-button type="primary" @click="submitEditGlobal">Edit</bf-button>
          </bf-col>
        </bf-row>
      </bf-form>
    </bf-col>
  </bf-row>
</template>

<script>
import { axios } from "@/utils/axios";
import { mapActions } from "vuex";
import { Header } from "@todo/style";

export default {
  data() {
    return {
      loadingCreate: false,
      loadingEdit: false,
      formAddTodo: {
        title: "",
      },
      formEditTodo: {
        id: "",
        title: "",
      },
      titleGlobal: "",
      itemGlobal: {
        title: "",
        index: "",
      },
    };
  },
  components: {
    Header,
  },
  beforeMount() {
    addEventListener("detailEdit", this.updateTitle);
    addEventListener("detailEditGlobal", this.updateTitleGlobal);
    this.$on("hook:beforeDestroy", () => {
      removeEventListener("detailEdit", this.updateTitle);
      addEventListener("detailEditGlobal", this.updateTitleGlobal);
    });
  },
  methods: {
    ...mapActions("globalStore", ["editGlobal", "addGlobal"]),
    submitEditGlobal() {
      this.editGlobal(this.itemGlobal);
      this.itemGlobal = {};
    },
    submitAddGlobal() {
      this.addGlobal(this.titleGlobal);
      this.titleGlobal = "";
    },
    updateTitle(event) {
      this.formEditTodo = event.detail;
    },
    updateTitleGlobal(event) {
      this.itemGlobal = event.detail;
    },
    async submitFormAddTodo() {
      this.loadingCreate = true;
      await axios.post("api/v1/todos", this.formAddTodo).catch(() => {
        this.loadingCreate = false;
      });
      this.formAddTodo.title = "";
      this.loadingCreate = false;
      dispatchEvent(new CustomEvent("loadTodo"));
    },
    async submitFormEditTodo() {
      this.loadingEdit = true;
      await axios.put(
        `api/v1/todos/${this.formEditTodo.id}`,
        this.formEditTodo
      );
      dispatchEvent(new CustomEvent("loadTodo"));
      this.formEditTodo.title = "";
      this.loadingEdit = false;
    },
  },
};
</script>

<style scoped>
.row {
  margin: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
}
.form {
  max-width: 300px;
  margin: auto;
}
</style>
