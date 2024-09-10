<template>
  <h1>是否显示导航：{{ showNavigator }}</h1>
</template>

<script setup lang="ts>">
import { ref } from 'vue';
import { SHOW_NAVIGATOR_BOOL } from './storage-constants';
import useLocalForage from './use-local-forage';'

const useLocalForage = useLocalForage({
  name: 'test',
  storeName: 'storeName1'
});
const showNavigator = ref(false);
onMounted(() => {
  showNavigator.value = useLocalForage.getItem(SHOW_NAVIGATOR_BOOL);
  useLocalForage.setItem(SHOW_NAVIGATOR_BOOL, false);
});
</script>