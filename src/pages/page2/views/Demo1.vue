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
  import { useStore } from 'vuex'
  import TestComp from '@/pages/page2/components/TestComp.vue'
  import { testGetRes } from '@/pages/page2/api/testApi.ts'


  const $router = useRouter()
  const $store = useStore()

  let userCountMore50 = computed(() => {
    return $store.getters['user/getCountMore50']
  })
  // console.log(mapState(['user/count']))

  let $title: any = ref('Page1 Title')
  let $msg: any = ref('msg')
  const testCompRef = ref()

  onBeforeMount(() => {
    console.log('onBeforeMount! demo11111')
    $store.dispatch('user/setCountAction', 85)
    $store.dispatch('cart/setCountAction', 69)
  })

  onMounted(() => {
    console.log('onMounted! demo11111')
    console.log($store.state, userCountMore50.value)
    console.log($store.getters['user/getCountMore50'])
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
