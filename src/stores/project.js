import { defineStore } from "pinia";
import { ref } from "vue";
import { Project, getProjectList } from "@/api/project";

export const useProjectStore = defineStore("project", () => {
  const brandList = ref([]);

  const getBrandList = async () => {
    const res = await getProjectList({ type: "brands" });
    brandList.value = res;
  };

  const specList = ref([]);

  const getSpecList = async () => {
    const res = await getProjectList({ type: "specs" });
    specList.value = res;
  };

  const skuList = ref([]);

  const getSkuList = async () => {
    const res = await getProjectList({ type: "skus" });
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
