<template>
  <bizfly-row class="row">
    <bizfly-col :span="12" class="form">
      <Header title="Custom Event"></Header>
      <h2>Add</h2>
      <bizfly-form class="mt-3" ref="formCreate" :model="formCreate">
        <bizfly-row>
          <bizfly-col :span="14">
            <bizfly-input
              placeholder="Add"
              type="text"
              v-model="formAddTodo.title"
            />
          </bizfly-col>
          <bizfly-col :span="8">
            <bizfly-button
              :loading="loadingCreate"
              type="primary"
              @click="submitFormAddTodo"
              >Add</bizfly-button
            >
          </bizfly-col>
        </bizfly-row>
      </bizfly-form>
      <bizfly-form class="mt-3" ref="formEdit">
        <h2>Edit</h2>
        <bizfly-row>
          <bizfly-col :span="14">
            <bizfly-input
              placeholder="Edit"
              type="text"
              v-model="formEditTodo.title"
            />
          </bizfly-col>
          <bizfly-col :span="8">
            <bizfly-button
              :loading="loadingEdit"
              type="primary"
              @click="submitFormEditTodo"
              >Edit</bizfly-button
            >
          </bizfly-col>
        </bizfly-row>
      </bizfly-form>
    </bizfly-col>
    <bizfly-col :span="12" class="form">
      <Header title="Global Store"></Header>
      <h2>Add</h2>
      <bizfly-form class="mt-3" ref="formCreate" :model="formCreate">
        <bizfly-row>
          <bizfly-col :span="14">
            <bizfly-input placeholder="Add" type="text" v-model="titleGlobal" />
          </bizfly-col>
          <bizfly-col :span="8">
            <bizfly-button type="primary" @click="submitAddGlobal"
              >Add</bizfly-button
            >
          </bizfly-col>
        </bizfly-row>
      </bizfly-form>
      <bizfly-form class="mt-3" ref="formEdit">
        <h2>Edit</h2>
        <bizfly-row>
          <bizfly-col :span="14">
            <bizfly-input
              placeholder="Edit"
              type="text"
              v-model="itemGlobal.title"
            />
          </bizfly-col>
          <bizfly-col :span="8">
            <bizfly-button type="primary" @click="submitEditGlobal"
              >Edit</bizfly-button
            >
          </bizfly-col>
        </bizfly-row>
      </bizfly-form>
    </bizfly-col>
  </bizfly-row>
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
