<template>
  <div class="page-wrapper">
    Demo2 Page
    <h3>{{$title}}</h3>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getUrlQueryParam, getUrlVars } from '@/utils/util.ts'

  const $route = useRoute()

  let $title: any ='Page2 Title'

  onBeforeMount(() => {
    console.log('onBeforeMount! demo22222')
    console.log($route.query)
  })

  onMounted(() => {
    console.log('onMounted! demo22222')
    console.log(getUrlQueryParam('id'))
    console.log(getUrlVars())
  })

</script>

<style lang="less">

</style>