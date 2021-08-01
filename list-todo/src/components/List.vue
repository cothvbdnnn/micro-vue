<template>
  <bf-row class="row">
    <bf-col :span="12">
      <h2>List</h2>
      <div v-for="(item, id) in listTodo" :key="id">
        <bf-row class="item">
          <bf-col :span="8">
            <p>
              <b>{{ item.title }}</b>
            </p>
          </bf-col>
          <bf-col :span="8">
            <bf-button type="primary" @click="editTodo(item)">Edit</bf-button>
          </bf-col>
          <bf-col :span="8">
            <bf-button
              :loading="loadingRemove"
              type="primary"
              @click="submitDel(item.id)"
              >Remove</bf-button
            >
          </bf-col>
        </bf-row>
      </div>
    </bf-col>
    <bf-col :span="12">
      <h2>List</h2>
      <div v-for="(item, index) in global" :key="index">
        <bf-row class="item">
          <bf-col :span="8">
            <p>
              <b>{{ item.title }}</b>
            </p>
          </bf-col>
          <bf-col :span="8">
            <bf-button
              type="primary"
              @click="handleEditGlobal(item.title, index)"
              >Edit</bf-button
            >
          </bf-col>
          <bf-col :span="8">
            <bf-button type="primary" @click="handleRemoveGlobal(index)"
              >Remove</bf-button
            >
          </bf-col>
        </bf-row>
      </div>
    </bf-col>
  </bf-row>
</template>

<script>
import { axios } from "@/utils/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
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
      removeEventListener("loadTodo", this.getData);
    });
  },
  computed: {
    ...mapGetters("globalStore", ["global"]),
  },
  methods: {
    ...mapActions("globalStore", ["removeGlobal"]),
    handleRemoveGlobal(index) {
      this.removeGlobal(index);
    },
    handleEditGlobal(title, index) {
      dispatchEvent(
        new CustomEvent("detailEditGlobal", {
          detail: {
            title: title,
            index: index,
          },
        })
      );
    },
    async getData() {
      const params = {
        page: 1,
        limit: 5,
      };
      const response = await axios.get(`api/v1/todos?${params}`);
      this.listTodo = response.data;
    },
    async submitDel(idTodo) {
      this.loadingRemove = true;
      await axios.delete(`api/v1/todos/${idTodo}`);
      this.loadingRemove = false;
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
.row {
  margin: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
}
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
