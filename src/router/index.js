import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layout",
    meta: { title: '首页' },
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "product",
        name: "product",
        component: () => import("@/views/product/ProductView.vue"),
      },
      {
        path: "channel",
        name: "channel",
        meta: { title: '渠道列表' },
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
        component: () => import("@/views/supplier/product/SupplierProductList.vue"),
      },
      {
        path: "supplier/recharge",
        name: "supplier-recharge",
        component: () => import("@/views/supplier/RechargeList.vue"),
      },
      {
        path: "supplier/recharge/history",
        name: "supplier-recharge-history",
        component: () => import("@/views/supplier/RechargeHistory.vue"),
      },
      {
        path: 'supplier/:supplierID/product',
        name: 'SupplierProduct',
        component: () => import("@/views/supplier/SupplierProduct.vue"),
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
      {
        path: 'recharge/supplier',
        name: 'recharge-supplier',
        meta: { title: '供应商充值' },
        component: () => import("@/views/recharge/SupplierRecharge.vue"),
      },
      {
        path: 'recharge/channel',
        name: 'recharge-channel',
        meta: { title: '渠道充值' },
        component: () => import("@/views/recharge/ChannelRecharge.vue"),
      },
      {
        path: "supplier/recharge/list",
        name: "supplier-recharge-list",
        meta: { title: '供应商充值列表' },
        component: () => import("@/views/supplier/RechargeList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
