<template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="结构名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="二维或三维类型">
        <el-select v-model="form.region">
          <el-option label="二维" value="shanghai" />
          <el-option label="三维" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="拓扑类型">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密度(g/cm³)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="孔隙限制直径(Å)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="最大孔腔直径(Å)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="比表面积(m²/cm³)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="孔隙率(φ)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="孔体积(cm³/g)">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  // do not use same name with ref
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
  </script>