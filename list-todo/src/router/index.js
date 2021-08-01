import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/list",
    name: "List",
    component: () => import("../components/List.vue"),
  },
  {
    path: "/list/test",
    name: "test",
    component: () => import("../components/Test"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
