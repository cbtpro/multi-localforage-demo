<script setup>
import { ref } from 'vue'
import useLocalForage from './use-local-forage'
import { USER_VISITOR_COUNT, SHOW_NAVIGATOR_BOOL } from './storage-constants'
import { onMounted } from 'vue';

const localForageInstance = useLocalForage({
  name: 'test',
  version: 1.1
})

localForageInstance.setItem(USER_VISITOR_COUNT, 1)

const msg = ref('Hello World!')

const loadStorage = async () => {
  try {
    const data = await localforageInstance.getItem(USER_VISITOR_COUNT);
    msg.value = data;
  } catch (error) {
    console.error(error);
  }

}
onMounted(() => {
  loadStorage();
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
