import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index"),
    redirect: "/comAnalysis",
    children: [
      {
        path: "/comAnalysis",
        name: "/comAnalysis",
        component: () => import("../views/comAnalysis")
      },
      {
        path: "/factorAnalysis",
        name: "/factorAnalysis",
        component: () => import("../views/factorAnalysis")
      },
      // {
      //   path: "/entropyMethod",
      //   name: "/entropyMethod",
      //   component: () => import("../views/entropyMethod")
      // },
      {
        path: "/levelAnalysis",
        name: "/levelAnalysis",
        component: () => import("../views/levelAnalysis")
      },
      {
        path: "/taskList",
        name: "/taskList",
        component: () => import("../views/taskList")
      },

      //模型分类
      {
        path: "/modType",
        name: "/modType",
        component: () => import("../views/modelType")
      },
      //模型列表
      {
        path: "/modList",
        name: "/modList",
        component: () => import("../views/modelList")
      },
      // 指标列表
      {
        path: "/indicatorsList",
        name: "/indicatorsList",
        component: () => import("../views/indicatorsList")
      },
      {
        path: "/indicatorsList/addIndicators",
        name: "/addIndicators",
        component: () => import("../views/indicatorsList/addIndicators")
      },
      {
        path: "/dimension",
        name: "dimension",
        component: () => import("../views/dimension/index.vue")
      },
      {
        path: "/dimensionCreateAndEdit",
        name: "dimensionCreateAndEdit",
        component: () => import("../views/dimension/createAndEdit.vue")
      }
      //下面这些还没有重新整理
      // {
      //   path: "/editModal",
      //   name: "/editModal",
      //   component: () => import("../views/entropyMethod/editModal.vue")
      // },
      // {
      //   path: "/editModal1",
      //   name: "/editModal1",
      //   component: () => import("../views/comAnalysis/editModal.vue")
      // }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
