<template>
  <div>
    <div v-for="(item, id) in listTodo" :key="id">
      <bizfly-row class="item">
        <bizfly-col :span="8">
          <p><b>{{ item.title }}</b></p>
        </bizfly-col>
        <bizfly-col :span="8">
          <bizfly-button type="primary" @click="editTodo(item)">Edit</bizfly-button>
        </bizfly-col>
        <bizfly-col :span="8">
          <bizfly-button :loading="loadingRemove" type="primary" @click="submitDel(item.id)">Remove</bizfly-button>
        </bizfly-col>
      </bizfly-row>
    </div>
  </div>
</template>

<script>
import { axios } from "@/utils/axios";

export default {
  data() {
    return {
      listTodo: [],
      loadingRemove: false,
    };
  },
  beforeMount() {
    this.getData();
    addEventListener("loadTodo", this.getData);
    this.$on("hook:beforeDestroy", () => {
      removeEventListener("loadTodo", this.getData)
    })
  },
  methods: {
    async getData() {
      const params = {
        page: 1,
        limit: 5,
      };
      const response = await axios.get(`api/v1/todos?${params}`);
      this.listTodo = response.data;
    },
    async submitDel(idTodo) {
      this.loadingRemove = true
      await axios.delete(`api/v1/todos/${idTodo}`);
      this.loadingRemove = false
      this.getData();
    },
    editTodo({ id, title }) {
      dispatchEvent(
        new CustomEvent("detailEdit", {
          detail: {
            id: id,
            title: title,
          },
        })
      );
    },
  },
};
</script>

<style scoped>
.item p {
  padding: 0 10px;
  margin: 0;
  height: 37px;
  border-radius: 2px;
  border: 1px solid #2a74d4;
  background-color: #fff;
  color: #2a74d4;
  width: 100%;
  line-height: 37px;
}
.item {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 10px;
  align-items: center;
}
</style>