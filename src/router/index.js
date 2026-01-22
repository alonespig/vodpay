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
        path: "channel/:channelID/project",
        name: "Project",
        component: () => import("@/views/channel/project/index.vue"),
      },
      {
        path: "channel/:channelID/project/:projectID/product",
        name: "Product",
        component: () => import("@/views/channel/project/product/index.vue"),
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
        path: "product/spec",
        name: "product-spec",
        component: () => import("@/views/product/Spec/index.vue"),
      },
      {
        path: "product/brand",
        name: "product-brand",
        component: () => import("@/views/product/Brand/index.vue"),
      },
      {
        path: "product/sku",
        name: "product-sku",
        component: () => import("@/views/product/SKU/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
