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
        path: '/channel',
        children: [
          {
            path: '',
            name: 'ChannelList',
            component: () => import('@/views/channel/ChannelListView.vue'),
          },
          {
            path: ':channelID/project',
            name: 'ProjectList',
            component: () => import('@/views/project/ProjectListView.vue'),
          },
          {
            path: ':channelID/project/:projectID/product',
            name: 'Product',
            component: () => import('@/views/ProjectProduct/ProductListView.vue'),
          }
        ]
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
      {
        path: "supplier/product/list",
        name: "supplier-product-list",
        meta: { title: '供应商商品列表' },
        component: () => import("@/views/supplierProduct/SupplierProduct.vue"),
      },
      {
        path: "supplier/list",
        name: "supplier-list",
        meta: { title: '供应商列表' },
        component: () => import("@/views/supplierList/SupplierList.vue"),
      },
      {
        path: "warehouse",
        name: "warehouse",
        meta: { title: '仓库管理' },
        component: () => import("@/views/Warehouse/WarehouseView.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
