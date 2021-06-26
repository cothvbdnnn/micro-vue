<template>
  <div class="form">
    <bizfly-form class="mt-3" ref="formCreate" :model="formCreate">
      <bizfly-row>
        <bizfly-col :span="14">
          <bizfly-input placeholder="Add" type="text" v-model="formAddTodo.title" />
        </bizfly-col>
        <bizfly-col :span="8">
          <bizfly-button :loading="loadingCreate" type="primary" @click="submitFormAddTodo">Add</bizfly-button>
        </bizfly-col>
      </bizfly-row>
    </bizfly-form>
    <h1>Edit</h1>
    <bizfly-form class="mt-3" ref="formEdit">
      <bizfly-row>
        <bizfly-col :span="14">
          <bizfly-input placeholder="Edit" type="text" v-model="formEditTodo.title" />
        </bizfly-col>
      <bizfly-col :span="8">
        <bizfly-button :loading="loadingEdit" type="primary" @click="submitFormEditTodo">Edit</bizfly-button>
      </bizfly-col>
    </bizfly-row>
    </bizfly-form>
  </div>
</template>

<script>
import { axios } from "@/utils/axios";

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
    };
  },
  beforeMount() {
    addEventListener("detailEdit", this.updateTitle);
    this.$on("hook:beforeDestroy", () => {
      removeEventListener("detailEdit", this.updateTitle);
    })
  },
  methods: {
    updateTitle(event) {
      this.formEditTodo = event.detail
    },
    async submitFormAddTodo() {
      this.loadingCreate = true
      await axios.post("api/v1/todos", this.formAddTodo).catch(() => { this.loadingCreate = false })
      this.formAddTodo.title = ""
      this.loadingCreate = false
      dispatchEvent(new CustomEvent("loadTodo"));
    },
    async submitFormEditTodo() {
      this.loadingEdit = true
      await axios.put(
        `api/v1/todos/${this.formEditTodo.id}`,
        this.formEditTodo
      );
      dispatchEvent(new CustomEvent("loadTodo"));
      this.formEditTodo.title = ""
      this.loadingEdit = false
    },
  },
};
</script>

<style scoped>
.form{
  max-width: 300px;
  margin: auto;
}


</style>