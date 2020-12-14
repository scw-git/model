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
      {
        path: "/entropyMethod",
        name: "/entropyMethod",
        component: () => import("../views/entropyMethod")
      },
      {
        path: "/levelAnalysis",
        name: "/levelAnalysis",
        component: () => import("../views/levelAnalysis")
      },
      {
        path: "/taskList",
        name: "/taskList",
        component: () => import("../views/taskList")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
