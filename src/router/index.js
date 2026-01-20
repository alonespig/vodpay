import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "product",
        name: "product",
        component: () => import("@/views/product/index.vue"),
      },
      {
        path: "channel",
        name: "channel",
        component: () => import("@/views/channel/index.vue"),
      },
      {
        path: "supplier",
        name: "supplier",
        component: () => import("@/views/supplier/list/index.vue"),
      },
      {
        path: "supplier/product",
        name: "supplier-product",
        component: () => import("@/views/supplier/product/index.vue"),
      },
      {
        path: "project/spec",
        name: "project-spec",
        component: () => import("@/views/project/Spec/index.vue"),
      },
      {
        path: "project/brand",
        name: "project-brand",
        component: () => import("@/views/project/Brand/index.vue"),
      },
      {
        path: "project/sku",
        name: "project-sku",
        component: () => import("@/views/project/SKU/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
