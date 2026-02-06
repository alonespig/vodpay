import { defineStore } from "pinia";
import { ref } from "vue";
import { Project } from "@/api/project";
import { getBrandListAPI, getSpecListAPI, getSkuListAPI } from "@/api/product-api";

export const useProjectStore = defineStore("project", () => {
  const brandList = ref([]);

  const getBrandList = async () => {
    const res = await getBrandListAPI();
    brandList.value = res;
    console.log("brandList", brandList.value);
  };

  const specList = ref([]);

  const getSpecList = async () => {
    const res = await getSpecListAPI();
    specList.value = res;
  };

  const skuList = ref([]);

  const getSkuList = async () => {
    const res = await getSkuListAPI();
    skuList.value = res;
  };

  const createProject = async (data) => {
    await Project(data);
  };

  const getProjectData = async () => {
    await getBrandList();
    await getSkuList();
    await getSpecList();
  };

  return {
    brandList,
    getBrandList,
    specList,
    getSpecList,
    skuList,
    getSkuList,
    createProject,
    getProjectData,
  };
});
