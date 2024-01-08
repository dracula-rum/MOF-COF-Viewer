<template>
    <el-descriptions title="Customized style list" :column="3" :border="true" >
      <el-descriptions-item
        label="Username"
        label-align="left"
        align="left"
        label-class-name="my-label"
        class-name="my-content"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="Telephone" label-align="left" align="left" label-class-name="my-label"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="Place" label-align="left" align="left" label-class-name="my-label"
        >Suzhou</el-descriptions-item
      >
      <el-descriptions-item label="Remarks" label-align="left" align="left" label-class-name="my-label">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address" label-align="left" align="left"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item
      >
    </el-descriptions>
  </template>
  <style>
  .el-descriptions{
    background-color:#ffffff;
  }
  .my-label {
    background: grey;
    width: 500px;
  }
  .my-content {
    background: grey;
  }
  </style>