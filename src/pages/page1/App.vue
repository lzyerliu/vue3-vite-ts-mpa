<template>
  <div class="page-wrapper">
    <h4 class="title">{{ title }}</h4>
    <img src="@/assets/images/bg.png" alt="bg img">
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  const title = 'Title Page1'

  onMounted(() => {

  });

</script>

<style lang="less">
  .page-wrapper{
    .title{
      font-size: 36px;
      color: #333;
    }
    img{
      width: 100%;
    }
  }
</style>