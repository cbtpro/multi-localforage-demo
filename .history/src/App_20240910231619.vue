<script setup lang="ts">
import { onMounted, ref } from "vue";
import useLocalForage from "./use-local-forage";
import { USER_VISITOR_COUNT, SHOW_NAVIGATOR_BOOL } from "./storage-constants";
import Demo from './Demo.vue';

const localForageInstance = useLocalForage({
  name: "test1",
  storeName: 'storeName2'
});

const visitorCount = ref(0);

const loadStorage = async () => {
  try {
    const data = await localForageInstance.getItem<number>(USER_VISITOR_COUNT);
    visitorCount.value = data || 0;
  } catch (error) {
    console.error(error);
  } finally {
    recordVisitorCount();
  }
};
const recordVisitorCount = () => {
  localForageInstance.setItem(USER_VISITOR_COUNT, visitorCount.value + 1);
};

onMounted(() => {
  loadStorage();
})
</script>

<template>
  <h1 v-show="visitorCount">用户访问次数{{ visitorCount }}次</h1>
  <Demo  />
</template>
