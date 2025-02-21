<template>
  <div class="page-wrapper">
    <span @click="callChildMethod" class="p-title">Demo1 Page</span>
    <h3 @click="jumpRouter">{{$title}}</h3>
    <test-comp ref="testCompRef" name="form perent val" @emupdata="emupdataFn" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, onMounted, watch, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import TestComp from '@/pages/page2/components/TestComp.vue'
  import { testGetRes } from '@/pages/page2/api/testApi.ts'
import { useUserStore } from '@/pages/page2/store/user.ts'

  const $router = useRouter()

  const userStore = useUserStore()

  let $title: any = ref('Page1 Title')
  let $msg: any = ref('msg')
  const testCompRef = ref()

  onBeforeMount(() => {
    console.log('onBeforeMount! demo11111')
  })

  onMounted(() => {
    console.log('onMounted! demo11111')
    userStore.setToken('sdrwser')
    console.log(userStore.token)
    testGetRes({
      id: 123
    })
  })

  watch($title, (newVal, oldVal) => {
    console.log('watch change $title: ', newVal, oldVal)
  }, {immediate: true, deep: true})
  
  watch($msg, (newVal, oldVal) => {
    console.log('watch change $msg: ', newVal, oldVal)
  }, {immediate: true, deep: true})

  const jumpRouter = () => {
    $router.push({
      path: '/demo2',
      query: {
        id: '12312'
      }
    })
  }

  const emupdataFn = (data: any) => {
    console.log('pppppp', data)
    $title.value = `子组件传来的值：${data}`
  }

  const callChildMethod = () => {
    $msg.value = 'test watch $msg'
    testCompRef.value.childMethod()
  }

</script>

<style lang="less" scoped>
.p-title{
  font-size: 48px;
  font-weight: 600;
}
</style>