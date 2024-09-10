<script setup>
import { ref } from 'vue'
import useLocalforage from './useLocalforage'
import { USER_VISITOR_COUNT, SHOW_NAVIGATOR_BOOL } from './storage-constants'
import { onMounted } from 'vue';

const localforageInstance = useLocalforage({
  name: 'test',
  version: 1.1
})

localforageInstance.setItem(USER_VISITOR_COUNT, 1)

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
  
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
