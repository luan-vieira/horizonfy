const routes = [
  {
    path: "/",
    name: "initial",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/MainPage.vue"),
  },
];

export { routes };
