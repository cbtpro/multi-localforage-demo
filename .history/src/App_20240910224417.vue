<script setup>
import { ref } from "vue";
import useLocalForage from "./use-local-forage";
import { USER_VISITOR_COUNT, SHOW_NAVIGATOR_BOOL } from "./storage-constants";
import { onMounted } from "vue";

const localForageInstance = useLocalForage({
  name: "test",
  version: 1.1,
});

const visitorCount = ref(0);

const loadStorage = async () => {
  try {
    const data = await localForageInstance.getItem(USER_VISITOR_COUNT);
    visitorCount.value = data;
  } catch (error) {
    console.error(error);
  }
};
loadStorage();
const recordVisitorCount = () => {
  localForageInstance.setItem(USER_VISITOR_COUNT, visitorCount.value++);
};
onMounted(() => {
  recordVisitorCount();
});
</script>

<template>
  <h1>用户访问次数{{ visitorCount }}次</h1>
</template>
