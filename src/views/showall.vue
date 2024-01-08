<template>
  <div class="bg">
  <el-row>
    <el-col :span="11">
      <h3 class="title">MOF/COF膜材料性质数据库</h3>
    </el-col>
    <el-col :span="2">
      <div style="width: 100%;padding-top: 20px;">
        <el-button :icon="Refresh" @click="getMysql"/>
      </div>
    </el-col>
    <el-col :span="10">
      <el-autocomplete 
          style="width: 100%;padding-top: 20px; margin-left: -30px;"
          v-model="searchKeyword"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          placeholder="Please input"
          clearable
          @select="handleSelect" 
        >
          <template #default="{ item }">
            <div>{{ item.name }}</div>
          </template>
          <template #append>
              <el-button :icon="Search" @click="getMysqlBySearch"/>
          </template>
        </el-autocomplete>
    </el-col>  
  </el-row>
  
  <el-row>
    <el-col :span="18">
      <el-table 
        size="small"
        :data="parttable" 
        stripe 
        max-height="450" 
        style="width: 100%; margin-top: 20px;" 
        :table-layout="fixed"
      >
        <el-table-column prop="name" label="Name" >
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="myMolDisplay(scope.row.name)"
            >
            {{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
          <el-table-column prop="topology" label="Topology" />
        <el-table-column prop="a" label="A" />
        <el-table-column prop="b" label="B" />
        <el-table-column prop="c" label="C" />
        <el-table-column prop="alpha" label="Alpha" />
        <el-table-column prop="beta" label="Beta" />
        <el-table-column prop="gamma" label="Gamma" />
        <el-table-column label="" >
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="goToShowOne(scope.row.name)"
            >
              More Infos
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px; justify-content: center;" 
        small
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="11"
        :current-page="state.page"
        :total="state.total"
        :page-size="state.limit"
        :page-sizes="[100, 300, 500, 1000]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-col>
    <el-col :span="6" style="margin-top: 50px;">
        <div id="gldiv" class="mol-container"></div>
    </el-col>
    
  </el-row>
  
</div>
</template>
  
<script setup>
  import { onMounted, ref ,reactive } from 'vue'
  import axios from 'axios';
  import router from '../router';
  import { Search ,Refresh} from '@element-plus/icons-vue'

  //----------------------------------------------------定义数据
  //模糊查询
  var allFileNames = ref([])
  //搜索
  const searchKeyword = ref('')
  var searchMol = ref('')
  //数据
  const table = ref([]); //所有数据
  const parttable = ref([]);//分页数据
  //分页
  const state = reactive({//响应式数据
    page: 1,
    limit: 300,
    total: 0,
  });
  // 分子查看器
  var viewer = ref('')
  //文件内容
  var content = ref('')
  //
  const name=ref('')
  const file_path=ref('')
  const file_type=ref('')

  //----------------------------------------------------分页
  //改变页码
  const handleCurrentChange = (e) => {
    state.page = e;
    updatePartTable();
  };
  //改变页数限制
  const handleSizeChange = (e) => {
    state.limit = e;
    updatePartTable();
  };

  
  onMounted(() => {
    console.log(`the component is now mounted.`)
    //获取表格数据
    getMysql()
    //展示分子结构
    initMolDisplay()
    // 支持模糊搜索
    getAllFileNames()
  })
  //----------------------------------------------------获取表格数据
  async function getMysql(){
    let response = ref('')
    //axios
    try {
      response = await axios.get('/apiTest/getHomeData');
        console.log(response.data)
        table.value = response.data;
        //保留三位小数
        floatFormat(table,3)
        state.total = response.data.length;  // 更新总记录数
        updatePartTable();

    } catch (error) {
        console.error(error);
    }
  }
  function updatePartTable() {
    const startIndex = (state.page - 1) * state.limit;
    const endIndex = startIndex + state.limit;
    parttable.value = table.value.slice(startIndex, endIndex);
  }
  function floatFormat(object,n){
    for(const id in object.value){
      for (const key in object.value[id]) {
        var number = object.value[id][key]
        if (typeof(number) === 'number') {
          if (number === 0) {} 
          else if (Math.abs(number) < 0.001) {
            object.value[id][key] =  number.toExponential(n);
          } else {
            // 否则，保留三位小数
            object.value[id][key] = number.toFixed(n);
          }
        }
      }
    }
  }
  
  //--------------------------------------------------------跳转页面
  function goToShowOne(name){
    router.push({ path: `/showone/${name}`, query: { name } });
  }

  // -------------------------------------------------------模糊查询
  async function getAllFileNames(){
    // 存在response中
    let response = ref('')
    try {
      response = await axios.get('/apiTest/getAllNames');
      console.log(response.data)
    } catch (error) {
        console.error(error);
    }
    allFileNames.value = response.data
  }

  //--------------------------------------------------------搜索
  // querySearch,searchKeyword,handleSelect
  function createFilter(file,queryString){
    return file.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
  //根据输入的queryString，空则返回所有restaurants，否则返回所有匹配的restaurants
  const querySearch = (queryString,cb) => {
    const results = queryString
      ? allFileNames.value.filter((file)=>createFilter(file,queryString))
      : allFileNames.value
    // call callback function to return suggestions
    cb(results)
  }
  const handleSelect = (item) => {
    searchKeyword.value = item.name
    searchMol.value = item.name

    // getMysqlBySearch();
  }
  async function getMysqlBySearch(){
    let response = ref('')
    //axios
    try {
      response = await axios.get('/apiTest/getHomeDataByName/'+searchMol.value);
        table.value = response.data;
        //保留三位小数
        floatFormat(table,3)
        console.log(table.value)
        state.total = response.data.length;  // 更新总记录数
        updatePartTable();

    } catch (error) {
        console.error(error);
    }
  }


  // -----------------------------------------------------------------------------展示分子结构
  // 初始化展示
  async function initMolDisplay(){
    searchMol.value="MM1"
    await getMolStruc()
    //先创建
    viewer = $3Dmol.createViewer(
     'gldiv', //id of div to create canvas in
     {
       defaultcolors: $3Dmol.elementColors.rasmol,
       backgroundColor: 'white'
     }
    );
    //再展示
    viewer.addModel(content.value, "cif");
    // receptorModel = m = glviewer.addModel(content.value, "cif");
    // atoms = m.selectedAtoms({});
    // for ( var i in atoms) {
    //   var atom = atoms[i];
    //   atom.clickable = true;
    //   atom.callback = atomcallback;
    // }
    viewer.mapAtomProperties($3Dmol.applyPartialCharges);
    viewer.setStyle({}, {stick: {}});    
    viewer.addUnitCell(viewer, {box:{color:'red'},alabel:'X',blabel:'Y',clabel:'Z'});
    viewer.zoomTo();
    viewer.render();
  }
  //点击展示
  async function myMolDisplay(name) {
    // 在这里添加你的函数操作逻辑
    searchMol.value = name
    await getMolStruc()
    threeDMol()               // 调用3dmol.js库展示分子
  };
  async function getMolStruc(){
    let response = ref('')
    //axios
    try {
      response = await axios.get(
        '/apiTest/getByName/'+searchMol.value);
          name.value = response.data[0].name;
          file_path.value = response.data[0].file_path;
          file_type.value = response.data[0].file_type;
        } catch (error) {
        console.error(error);
    }
    await axios.get(file_path.value).then((response) => {
      content.value = response.data
    })
    // cifDisplay()
  }
  // function cifDisplay(){
  //   // 判断type类型，转换3dmol.js不支持的格式
  //   if(file_type.value == 'car'){
  //     convertFormat(content.value,'car','xyz')
  //   }
  //   else threeDMol()
  // }
  // function convertFormat(inData,inFormat,outFormat){
  //   var OpenBabel = OpenBabelModule();
  //   var outData;
  //   OpenBabel.onRuntimeInitialized = function()
  //   {
  //     // Now the OpenBabel routines can be called 
  //     var conv = new OpenBabel.ObConversionWrapper();  // create ObConversionWrapper instance
  //     try
  //     {
  //         // var inData = ;   // set input data
  //         conv.setInFormat('', inFormat);  // set input format by file extension
  //             // the input format can also be set by MIME type:
  //             // conv.setInFormat('chemical/x-mdl-molfile');
  //         var mol = new OpenBabel.OBMol();  // create a new molecule object...
  //         conv.readString(mol, inData);  // ... and load it with input data
  //         conv.setOutFormat('', outFormat);  // set out format by file extension
  //         outData = conv.writeString(mol, false);  // get output data, do not trim white spaces
  //         content.value = outData
  //         file_type.value = 'xyz'
  //         threeDMol()
  //     }
  //     finally
  //     {
  //       conv.delete();  // free ObConversionWrapper instance
  //     }
  //   }
  // }
  function threeDMol(){
    //展示参数
    // viewer = $3Dmol.createViewer( "gldiv" );
    viewer.clear();
    viewer.addModel( content.value, file_type.value);/* load data */
    viewer.setStyle({}, {stick: {}});                     /* style all atoms */
    viewer.addUnitCell(viewer, {box:{color:'red'},alabel:'X',blabel:'Y',clabel:'Z'});
    viewer.zoomTo();                                      /* set camera */
    viewer.render();  
  }

</script>

<style>
.title{
    color: grey;
    font-size: 30px;  /* 设置字体大小为 24 像素 */
    font-family: Arial, sans-serif;
    text-align: left;  /* 设置文本居中对齐 */
    margin:0;
    margin-top: 13px;
    margin-left: 10px;
    padding:0;
  }
/* 分子可视化 */
.mol-container {
    height: 400px;
    width: 100%;
    margin: 0; 
    padding: 0; 
    border: 0;
    position: relative;
  }
.bg{
    display: flex;
    flex-direction: column;
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-attachment: fixed;
    
    width: 100%;
    height: 100%;
    min-width: 600px;
    min-height: 600px;

    padding-left: 20px;
    padding-right: 20px;
    
}
</style>
    
  