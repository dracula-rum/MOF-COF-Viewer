<template>
    <div 
        class="background-image-container"
        @click="navigateToNextPage"
        >
    </div>
</template>
  
<script setup>
  import router from '../router';

const navigateToNextPage = () => {
// 使用Vue Router的push方法跳转到下一个页面
router.push('/showall');
};
</script>


<style scoped>

.background-image-container {
    display: flex;
    flex-direction: column;
    background-image: url("../assets/home.png");
    background-size: 100% 100%;
    background-attachment: fixed;
    
    width: 100%;
    height: 100%;
    min-width: 600px;
    min-height: 600px;
    
    justify-content: center;
    align-items: center;
}
</style>
  