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

onMounted(() => {
  localforageInstance.getItem(USER_VISITOR_COUNT).then(res => {
    console.log(res)
  })
})

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
