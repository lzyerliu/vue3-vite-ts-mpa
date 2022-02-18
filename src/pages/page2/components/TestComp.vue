<template>
  <div>
    <p>我是 子组件：{{name}}</p>
    <button @click="clickBtn">button</button>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: {
      type: String,
      default: '默认值'
    }
  })
  const $em = defineEmits(['emupdata'])
  const clickBtn = () => {
    $em('emupdata', 'val ya')
  }

  const childMethod = () => {
    console.log('child comp method')
  }

  defineExpose({ childMethod })
</script>

<style>

</style>