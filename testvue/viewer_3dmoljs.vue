<template>
    <!-- <el-row :gutter="20">
      <el-col :span="24">
        <el-input class="input-with-button"
          v-model="searchKeyword"
          placeholder="Please input"
          clearable
        >
          <template #append>
              <el-button :icon="Search" @click="molDisplay"/>
          </template>
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ name }}</span>
            </div>
          </template>
          <div class="text item">info</div>
        </el-card>
      </el-col> -->

      <!-- 分子结构 path ../../public/data/test/B3O3-BDC-F_No2.cif-->
      
        <!-- <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-pdb='2POR' data-backgroundcolor='0xffffff' data-style='stick' data-ui='true'></div>   -->
      
      <!-- <el-col :span="16">
         -->
      
      <box-card>
        <div class='viewer_3Dmoljs' data-href="../../public/data/test/B3O3-BDC-F_No2.cif" data-backgroundcolor='0xffffff' data-style='stick' data-ui='false'></div>
      
      </box-card>
      
        
      
         
      <!-- </el-col>
        
      
        

    </el-row>  -->

</template>
  
<script setup>
   
</script>

<style scoped>
  /* 分子可视化 */
  .viewer_3Dmoljs {
    height: 600px;
    width: 600px;
    margin: 0; 
    padding: 0; 
    border: 0;
      /* height: 430px;
      width: 800px; */
    position: relative;
  }
  .input-with-button {
    background-color: var(--el-fill-color-blank);
  }
  /* 分子信息卡片 */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 100%;
    height: 100%;
  }
  /* 布局 */
  .el-row {
    margin-bottom: 40px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  /* 按钮 */
  .btn{
    width: 100px;
  }
  
  </style>