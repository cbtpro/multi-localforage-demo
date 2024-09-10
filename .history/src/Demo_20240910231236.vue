<template>
  <h1>是否显示导航：{{ showNavigator }}</h1>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SHOW_NAVIGATOR_BOOL } from './storage-constants';
import useLocalforage from './use-local-forage';

const useLocalForage = useLocalforage({
  name: 'test',
  storeName: 'storeName1'
});

const showNavigator = ref(false);

onMounted(async () => {
  showNavigator.value = await useLocalForage.getItem<boolean>(SHOW_NAVIGATOR_BOOL);
  useLocalForage.setItem(SHOW_NAVIGATOR_BOOL, false);
});
</script>