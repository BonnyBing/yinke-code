<script >
import ParentComp from "@/components/ParentComp.vue"
export default {
  // 定义数据
  data(){
    return{
      name:'Bonny',
    };
  },
  // 定义函数
  methods:{
    helloWorld(){},
  },
  // 定义生命周期
  mounted(){
    console.log(this);
    console.log('mounted');
  },
  components:{
    ParentComp,
  }
}
// import {ref,onMounted} from 'vue';
// // 定义响应式数据
// const name = ref('Bonny');
// // 定义函数方法
// const helloWorld = () => {};
// // 定义生命周期
// onMounted(() => {
//   console.log('vue3 mounted');
// });
</script>

<template>
  <ParentComp />
  <!-- <div>
    {{name}}
  </div> -->
</template>

<style scoped>
</style>
