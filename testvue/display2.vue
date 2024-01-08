<template>
  <el-container direction="vertical" >
    <el-row>
      <el-col :span="24">
        <el-autocomplete 
        class="input-with-button"
        v-model="searchKeyword"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        popper-class="my-autocomplete"
        placeholder="Please input"
        clearable
        @select="handleSelect"
      >
        <template #default="{ item }">
          <div>{{ item.name }}</div>
        </template>
        <template #append>
            <el-button :icon="Search" @click="molDisplay"/>
        </template>
      </el-autocomplete>
      </el-col>
      
    </el-row>
    
    <el-divider border-style="hidden"/>

    <el-row gutter=2>
      <!-- <el-col :span="8">
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>{{ name }}</span>
              </div>
            </template>
            <el-scrollbar height="400px">
              <div class="text">{{ content }}</div>
            </el-scrollbar>
          </el-card>
      </el-col> -->
      <!-- <el-col :span="8">
        <el-descriptions
          title="mof-name"
          :column="2"
          :size="small"
        >
          <el-descriptions-item label="鏅惰優鍙傛暟">kooriookami</el-descriptions-item>
          <el-descriptions-item label="鎷撴墤缁撴瀯">18100000000</el-descriptions-item>
          <el-descriptions-item label="鑺傜偣">Suzhou</el-descriptions-item>
          <el-descriptions-item label="杈?>Suzhou</el-descriptions-item>
          <el-descriptions-item label="琛ㄩ潰绉?>1</el-descriptions-item>
          <el-descriptions-item label="瀛斾綋绉?>1</el-descriptions-item>
          <el-descriptions-item label="瀛旈殭鐜?>1</el-descriptions-item>
          <el-descriptions-item label="鏅朵綋/楠ㄦ灦瀵嗗害">1</el-descriptions-item>
          <el-descriptions-item label="瀛斿緞LCD">1</el-descriptions-item>
          <el-descriptions-item label="瀛斿緞PLD">1</el-descriptions-item>
          <el-descriptions-item label="浜ㄥ埄绯绘暟Kh">1</el-descriptions-item>
          <el-descriptions-item label="CH4/N2鏃犻檺绋€閲婂惛闄勭儹Qst(KJ/mol)">1</el-descriptions-item>
          <el-descriptions-item label="CH4/N2鍚搁檮閲?>1</el-descriptions-item>
          <el-descriptions-item label="CH4/N2鍚搁檮鍒嗙閫夋嫨鎬ad">1</el-descriptions-item>
          <el-descriptions-item label="N2鑷墿鏁ｇ郴鏁癙s(m2/s)">1</el-descriptions-item>
          <el-descriptions-item label="娣峰悎鏉′欢涓嬭嚜鎵╂暎绯绘暟(CH4/N2)">1</el-descriptions-item>
          <el-descriptions-item label="鍔ㄥ姏瀛﹀垎绂婚€夋嫨鎬dif">1</el-descriptions-item>
          <el-descriptions-item label="鑶滃垎绂婚€夋嫨鎬mem=Sad*Sdif">1</el-descriptions-item>
        </el-descriptions>
      </el-col> -->
      <el-col :span="8">
        <el-table :data="tableData" style="width: 80%" show-header="false" size="small" class="customer-no-border-table">
          <el-table-column prop="attri"/>
          <el-table-column prop="attri_value"/>
        </el-table>
      </el-col>



      <el-col :span="16">
          <el-row>
            <!-- 閫夋嫨鑳屾櫙棰滆壊 -->
            <el-col :span="5">
              <!-- <el-button class="btn" >
                BG Color
                <template #append>
                  <el-color-picker v-model="color1" @click="bgColorDisplay"/>
                </template>
              </el-button> -->
              <el-select v-model="bgColor" placeholder="BG Color" class="btn">
              <el-option
                v-for="item in bgColors"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="bgColorDisplay"
              />
              </el-select>
            </el-col>
            <!-- 閫夋嫨鍒嗗瓙鏍峰紡 style,options,styleDisplay 4,2 -->
            <el-col :span="5">
              <el-select v-model="style" placeholder="Style" class="btn">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="styleDisplay"
              />
              </el-select>
            </el-col>
            <!-- lable -->
            <el-col :span="5">
              <el-select v-model="selectedElem" placeholder="Lable" class="btn">
              <el-option
                v-for="item in Elements"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="LableDisplay"
              />
              </el-select>
            </el-col>
            <!-- 灞呬腑 -->
            <el-col :span="5">
              <el-button class="btn" @click="MolRecenter">Recenter</el-button>
            </el-col>
            <!-- 涓嬭浇 -->
            <el-col :span="4">
              <el-button class="btn" @click="MolDownload">Download</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div id="gldiv" class="mol-container"></div>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  
  </el-container>
</template>
  
  
  <script setup>

  import { onMounted, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import axios from 'axios';
  
  // 鍙橀噺锛屼笌缁勪欢缁戝畾
  const searchKeyword = ref('')
  var allFileNames = ref([])
  const name = ref('mof_1.cif')
  const selectedElem = ref('')
  const Elements =[
    {value:'false',label:'No lables'},
    {value:'H',label:'H'},
    {value:'Li',label:'Li'},
    {value:'Be',label:'Be'},
    {value:'B',label:'B'},
    {value:'C',label:'C'},
    {value:'N',label:'N'},
    {value:'O',label:'O'},
    {value:'F',label:'F'},
    {value:'Na',label:'Na'},
    {value:'Mg',label:'Mg'},
    {value:'Al',label:'Al'},
    {value:'Si',label:'Si'},
    {value:'P',label:'P'},
    {value:'S',label:'S'},
    {value:'Cl',label:'Cl'},
    {value:'K',label:'K'},
    {value:'Ca',label:'Ca'},
    {value:'Sc',label:'Sc'},
    {value:'Ti',label:'Ti'},
    {value:'V',label:'V'},
    {value:'Cr',label:'Cr'},
    {value:'Mn',label:'Mn'},
    {value:'Fe',label:'Fe'},
    {value:'Co',label:'Co'},
    {value:'Ni',label:'Ni'},
    {value:'Cu',label:'Cu'},
    {value:'Zn',label:'Zn'},
    {value:'Ga',label:'Ga'},
    {value:'Ge',label:'Ge'},
    {value:'As',label:'As'},
    {value:'Se',label:'Se'},
    {value:'Br',label:'Br'},
    {value:'In',label:'In'},
    {value:'Fr',label:'Fr'},
    {value:'U',label:'U'},
  ]
  const bgColor = ref('')
  const bgColors = [
    {value: 'white',label: 'white',},
    {value: 'lightgrey',label: 'lightgrey',},
    {value: 'grey',label: 'grey',},
    {value: 'black',label: 'black',},
    {value: 'blue',label: 'blue',},
  ]
  const style = ref('')//閫夋嫨鍣ㄥ€?
  const options = [
    {value: 'line',label: 'line',},
    {value: 'stick',label: 'stick',},
    {value: 'cross',label: 'cross',},
    {value: 'cartoon',label: 'cartoon',},
    {value: 'sphere',label: 'sphere',},
  ]
  const tableData = [
  {
    attri: '缁撴瀯鍚嶇О',
    attri_value: 'cdl_v1-4c_Cu_1_Ch_1-1B_4H_Ch.cif',
  },
  {
    attri: '浜岀淮鎴栬€呬笁缁寸被鍨?,
    attri_value: '涓夌淮',
  },
  {
    attri: '鎷撴墤绫诲瀷',
    attri_value: 'cdl',
  },
  {
    attri: '瀵嗗害(g/cm鲁)',
    attri_value: '0.89',
  },
  {
    attri: '瀛旈殭闄愬埗鐩村緞(脜)',
    attri_value: '9.7',
  },
  {
    attri: '鏈€澶у瓟鑵旂洿寰?脜)',
    attri_value: '12.3',
  },
  {
    attri: '姣旇〃闈㈢Н(m虏/cm鲁)',
    attri_value: '2890',
  },
  {
    attri: '瀛旈殭鐜?蠁)',
    attri_value: '0.8',
  },
  {
    attri: '瀛斾綋绉?cm鲁/g)',
    attri_value: '1.5',
  },
  ]
  // 鍙橀噺锛宩s浣跨敤
  var viewer = ref('')
  const file_path = ref('')
  const type = ref('')
  const searchMol = ref('')
  
  // 鐢熷懡鍛ㄦ湡閽╁瓙
  onMounted(() => {
    console.log(`the component is now mounted.`)
    // console.log(initial_mol.value)
    let data = content.value
    viewer = $3Dmol.createViewer(
     'gldiv', //id of div to create canvas in
     {
       defaultcolors: $3Dmol.elementColors.rasmol,
       backgroundColor: 'white'
     }
    );
    viewer.addModel(data, "cif");
    // receptorModel = m = glviewer.addModel(data, "cif");

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

    //鏀寔妯＄硦鎼滅储
    getAllFileNames()
  })

  // 鍑芥暟锛屼笌缁勪欢缁戝畾
  async function getAllFileNames(){
    // 鑾峰彇璺緞锛屽瓨鍦╮esponse涓?
    let response = ref('')
    try {
      response = await axios.get('/apiTest/getAllNames');
      // console.log(response.data)
    } catch (error) {
        console.error(error);
    }
    allFileNames.value = response.data
  }
  function createFilter(file,queryString){
    return file.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
  //鏍规嵁杈撳叆鐨剄ueryString锛岀┖鍒欒繑鍥炴墍鏈塺estaurants锛屽惁鍒欒繑鍥炴墍鏈夊尮閰嶇殑restaurants
  const querySearch = (queryString,cb) => {
    const results = queryString
      ? allFileNames.value.filter((file)=>createFilter(file,queryString))
      : allFileNames.value
    // call callback function to return suggestions
    // console.log(results)
    cb(results)
  }
  const handleSelect = (item) => {
    searchKeyword.value = item.name
    searchMol.value = item.name
    // molDisplay()
  }


  // 1.molDisplay 灞曠ず鍒嗗瓙缁撴瀯
  async function molDisplay(){
    await getByMysql()           // 鑾峰彇鏁版嵁搴撳垎瀛愪俊鎭痭ame,path,type
    await getMolContent()        // 鏍规嵁path鑾峰彇鍒嗗瓙鏂囦欢鍐呭content
    // threeDMol()               // 璋冪敤3dmol.js搴撳睍绀哄垎瀛?
  }
  async function getByMysql(){
    // 鑾峰彇璺緞锛屽瓨鍦╮esponse涓?
    let response = ref('')
    try {
      response = await axios.get(
        '/apiTest/getByName/'+searchMol.value);
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
    // 鑾峰彇鏁版嵁name,path,type
    name.value = response.data[0]['name'];
    file_path.value = response.data[0]['file_path'];
    type.value = response.data[0]['type'];
    // type.value = JSON.parse(JSON.stringify(name.value.split('.').slice(-1)))[0]
  }
  async function getMolContent(){
    await axios.get(file_path.value).then((response) => {
      content.value = response.data
    })
    // 鍒ゆ柇type绫诲瀷锛岃浆鎹?dmol.js涓嶆敮鎸佺殑鏍煎紡
    if(type.value == 'car'){
      convertFormat(content.value,'car','xyz')
    }
    else threeDMol() //?
  }
  function convertFormat(inData,inFormat,outFormat){
    var OpenBabel = OpenBabelModule();
    var outData;
    OpenBabel.onRuntimeInitialized = function()
    {
      // Now the OpenBabel routines can be called 
      var conv = new OpenBabel.ObConversionWrapper();  // create ObConversionWrapper instance
      try
      {
          // var inData = ;   // set input data
          conv.setInFormat('', inFormat);  // set input format by file extension
              // the input format can also be set by MIME type:
              // conv.setInFormat('chemical/x-mdl-molfile');
          var mol = new OpenBabel.OBMol();  // create a new molecule object...
          conv.readString(mol, inData);  // ... and load it with input data
          conv.setOutFormat('', outFormat);  // set out format by file extension
          outData = conv.writeString(mol, false);  // get output data, do not trim white spaces
          // console.log(outData);
          content.value = outData
          type.value = 'xyz'
          threeDMol()
      }
      finally
      {
        conv.delete();  // free ObConversionWrapper instance
      }
    }
  }
  function threeDMol(){
    // viewer = $3Dmol.createViewer( "gldiv" );
    viewer.clear();
    viewer.addModel( content.value, type.value);/* load data */
    viewer.setStyle({}, {stick: {}});                     /* style all atoms */
    viewer.addUnitCell(viewer, {box:{color:'red'},alabel:'X',blabel:'Y',clabel:'Z'});
    viewer.zoomTo();                                      /* set camera */
    viewer.render();  
  }

  

  

// 2.styleDisplay 閫夋嫨bgcolor骞舵樉绀?
function bgColorDisplay(){
    if(bgColor.value == 'white'){viewer.setBackgroundColor('white')}
    else if(bgColor.value == 'black'){viewer.setBackgroundColor('black')}
    else if(bgColor.value == 'blue'){viewer.setBackgroundColor('blue')}
    else if(bgColor.value == 'grey'){viewer.setBackgroundColor('grey')}
    else if(bgColor.value == 'lightgrey'){viewer.setBackgroundColor('lightgrey')}
    viewer.render();
  }

  // 3.styleDisplay 閫夋嫨妯″瀷绫诲瀷骞舵樉绀?
  function styleDisplay(){
    // console.log('style:')
    // console.log(style.value)
    if(style.value == 'line'){viewer.setStyle({},{line:{}})}
    else if(style.value == 'stick'){viewer.setStyle({},{stick:{}})}
    else if(style.value == 'cross'){viewer.setStyle({},{cross:{}})}
    else if(style.value == 'cartoon'){viewer.setStyle({},{stick:{}})}
    else if(style.value == 'sphere'){viewer.setStyle({},{sphere:{}})}
    viewer.render();
  }

  function LableDisplay(){
    viewer.removeAllLabels();
    if(selectedElem.value != String(false)){
      var atoms = viewer.getModel().selectedAtoms({
        elem:selectedElem.value
      });
      // console.log(atoms)
      for ( var a in atoms) {
        var atom = atoms[a];

        viewer.addLabel(atom.index, {
          inFront : true,
          showBackground:true,
          fontSize : 10,
          position : {
            x : atom.x,
            y : atom.y,
            z : atom.z
          }
        });
      }
    }
    viewer.render();
  }

  // 5.MolRecenter
  function MolRecenter()
  {
    viewer.zoomTo(); 
  }

  // 6.MolDownload 涓嬭浇鎸夐挳瑙﹀彂鐨勪笅杞芥搷浣?
  function MolDownload(){//?
    let filename = name.value;
    let filecontent = content.value;
    download(filename, filecontent);
  }
  function download(filename, content) {
      var blob = new Blob([content], {type: 'text/plain'});
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
  
      a.style = "display: none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
  
      setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      }, 5);
  }

  var content = ref(`data_POSCAR
  _audit_creation_date              2014-09-24
  _audit_creation_method            'ToBaCCo'
  _symmetry_space_group_name_H-M    'P1'
  _symmetry_Int_Tables_number       1
  _symmetry_cell_setting            triclinic
  loop_
  _symmetry_equiv_pos_as_xyz
 x,y,z
_cell_length_a 14.8115
_cell_length_b 14.9148
_cell_length_c 16.2029
_cell_angle_alpha 89.904000
_cell_angle_beta 90.266800
_cell_angle_gamma 120.043300
loop_
  _atom_site_label
  _atom_site_type_symbol
  _atom_site_fract_x
  _atom_site_fract_y
  _atom_site_fract_z
O1 O 0.34228 0.52208 0.33168
 O2 O 0.16462 0.51159 0.30203
 C3 C 0.15453 0.57723 0.34511
 O4 O 0.19866 0.67259 0.32670
 O5 O 0.36471 0.84881 0.29329
 C6 C 0.44246 0.86411 0.33714
 O7 O 0.49311 0.81792 0.32422
 O8 O 0.50316 0.65055 0.30481
 C9 C 0.43867 0.57497 0.34884
 O10 O 0.37217 0.51091 0.16845
 O11 O 0.19892 0.51059 0.13836
 C12 C 0.14686 0.55503 0.12243
 O13 O 0.15838 0.63267 0.16381
 O14 O 0.33148 0.80373 0.13081
 C15 C 0.42807 0.85061 0.11394
 O16 O 0.49546 0.84384 0.15851
 O17 O 0.49755 0.67175 0.13950
 C18 C 0.45064 0.57501 0.12663
 Cr19 Cr 0.27215 0.51915 0.23491
 Cr20 Cr 0.26601 0.73686 0.22866
 Cr21 Cr 0.49190 0.74335 0.23169
 O22 O 0.34358 0.66645 0.23135
 O23 O 0.52551 0.36671 0.66863
 O24 O 0.52594 0.19568 0.63479
 C25 C 0.57419 0.14803 0.61700
 O26 O 0.65124 0.15706 0.65894
 O27 O 0.82572 0.32976 0.63849
 C28 C 0.87572 0.42641 0.62547
 O29 O 0.86268 0.49045 0.66815
 O30 O 0.68866 0.49001 0.64201
 C31 C 0.59155 0.44472 0.62752
 O32 O 0.52958 0.32798 0.83120
 O33 O 0.51837 0.15200 0.79713
 C34 C 0.58163 0.13467 0.83777
 O35 O 0.67871 0.18218 0.82407
 O36 O 0.85678 0.35088 0.80371
 C37 C 0.86939 0.42669 0.84804
 O38 O 0.82563 0.47919 0.83207
 O39 O 0.65764 0.48903 0.80639
 C40 C 0.58147 0.42339 0.84948
 Cr41 Cr 0.53031 0.26330 0.73290
 Cr42 Cr 0.75043 0.25783 0.73132
 Cr43 Cr 0.75588 0.48173 0.73693
 O44 O 0.67901 0.33423 0.73344
 C45 C 0.55891 -0.04199 0.45694
 C46 C 0.47554 -0.06088 0.40571
 C47 C 0.42294 -0.00616 0.42538
 C48 C 0.45449 0.06248 0.49403
 C49 C 0.53933 0.07802 0.54496
 C50 C 0.58892 0.02338 0.52253
 C51 C 0.67329 0.00193 0.54720
 C52 C 0.63898 -0.07251 0.47291
 H53 H 0.35711 -0.01680 0.38853
 H54 H 0.41209 0.10244 0.50723
 H55 H 0.65779 -0.03805 0.60780
 H56 H 0.75217 0.07108 0.54022
 H57 H 0.60354 -0.15534 0.49077
 H58 H 0.69810 -0.04651 0.42305
 C59 C 1.07049 0.60697 0.46817
 C60 C 1.08945 0.54029 0.42005
 C61 C 1.04939 0.43784 0.44864
 C62 C 0.98253 0.40136 0.51723
 C63 C 0.95439 0.46656 0.55913
 C64 C 1.00453 0.57098 0.53584
 C65 C 0.96018 0.63935 0.51737
 C66 C 1.03248 0.67880 0.44327
 H67 H 1.06643 0.38453 0.41637
 H68 H 0.94975 0.32105 0.53517
 H69 H 0.98046 0.69927 0.56577
 H70 H 0.87613 0.59493 0.50023
 H71 H 1.09438 0.76140 0.44908
 H72 H 0.99044 0.65735 0.38308
 C73 C 0.40984 0.46599 0.47441
 C74 C 0.47754 0.54830 0.42374
 C75 C 0.58271 0.60746 0.44932
 C76 C 0.61987 0.57629 0.51750
 C77 C 0.55254 0.48552 0.56177
 C78 C 0.44633 0.43538 0.54144
 C79 C 0.37091 0.32335 0.52630
 C80 C 0.33080 0.35697 0.45281
 H81 H 0.63733 0.67527 0.41483
 H82 H 0.70198 0.62071 0.53308
 H83 H 0.31284 0.28824 0.57672
 H84 H 0.41009 0.27923 0.50858
 H85 H 0.24970 0.34136 0.46101
 H86 H 0.34656 0.33225 0.39244
 C87 C 0.39857 -0.06101 0.99339
 C88 C 0.46458 -0.08456 1.03896
 C89 C 0.56651 -0.04733 1.00881
 C90 C 0.60374 0.02106 0.94132
 C91 C 0.53991 0.05388 0.90228
 C92 C 0.43545 0.00677 0.92688
 C93 C 0.37134 0.05470 0.94924
 C94 C 0.33080 -0.01958 1.02191
 H95 H 0.61904 -0.06769 1.03923
 H96 H 0.68382 0.05154 0.92220
 H97 H 0.31038 0.03913 0.90215
 H98 H 0.41989 0.13721 0.96798
 H99 H 0.24651 -0.07793 1.01656
 H100 H 0.35546 0.01984 1.08284
 C101 C 1.01621 0.56520 1.04153
 C102 C 1.07512 0.51786 1.06116
 C103 C 1.05437 0.42929 1.01424
 C104 C 0.98591 0.39790 0.94584
 C105 C 0.93671 0.45421 0.92217
 C106 C 0.94902 0.53413 0.97440
 C107 C 0.97547 0.64238 0.95477
 C108 C 1.04949 0.67674 1.02824
 H109 H 1.09353 0.38611 1.02806
 H110 H 0.97480 0.33198 0.90986
 H111 H 0.90793 0.65442 0.96390
 H112 H 1.01598 0.66983 0.89458
 H113 H 1.02479 0.70897 1.07952
 H114 H 1.13297 0.72389 1.01064
 C115 C 0.43360 0.43058 1.03694
 C116 C 0.49014 0.53449 1.06155
 C117 C 0.58613 0.59861 1.02207
 C118 C 0.61736 0.56184 0.95429
 C119 C 0.55313 0.46023 0.92420
 C120 C 0.46433 0.39431 0.97004
 C121 C 0.35438 0.32587 0.94204
 C122 C 0.32077 0.36550 1.01534
 H123 H 0.63515 0.67836 1.04122
 H124 H 0.68981 0.61434 0.92369
 H125 H 0.32977 0.24242 0.94697
 H126 H 0.33778 0.34988 0.88145
 H127 H 0.27716 0.30490 1.06249
 H128 H 0.28460 0.41249 0.99735
  `)
  
  </script>
  
  
  <style scoped>
  /* 鎼滅储妗?*/
  .input-with-button {
    background-color: var(--el-fill-color-blank);
    width: 100%;
  }
  /* 鍒嗗瓙鍙鍖?*/
  .mol-container {
    height: 500px;
    width: 100%;
    margin: 0; 
    padding: 0; 
    border: 0;
    position: relative;
  }
  /* 鍒嗗瓙淇℃伅鍗＄墖 */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
    text-align: justify;
  }
  .box-card {
    width: 100%;
    height: 100%;
  }
  /* 鎸夐挳 */
  .btn{
    width: 100%;
  }

/* table */
/*鍘绘帀琛ㄦ牸鍗曞厓鏍艰竟妗?/
.customer-no-border-table th{
    border:none;
  }
  .customer-no-border-table td,.customer-no-border-table th.is-leaf {
    border:none;
  }
  /*琛ㄦ牸鏈€澶栬竟妗?/
  .customer-no-border-table .el-table--border, .el-table--group{
    border: none;
  }
  /*澶撮儴杈规*/
  .customer-no-border-table thead tr th.is-leaf{
    border: 0px solid #EBEEF5;
    border-right: none;
  }
  .customer-no-border-table thead tr th:nth-last-of-type(2){
    border-right: 0px solid #EBEEF5;
  }
  /*琛ㄦ牸鏈€澶栧眰杈规-搴曢儴杈规*/
  .customer-no-border-table .el-table--border::after,.customer-no-border-table .el-table--group::after{
    width: 0;
  }
  .customer-no-border-table::before{
    width: 0;
  }
  .customer-no-border-table .el-table__fixed-right::before,.el-table__fixed::before{
    width: 0;
  }
  .customer-no-border-table .el-table__header tr th{
    background: #fff;
    color: #333333 ;
    padding: 3px ;
    fontWeight: 550 ;
    height: 36px ;
    border: 0px;
    font-size: 15px;
  }
  /*鍘绘帀榧犳爣鎮仠鑳屾櫙棰滆壊*/
  .el-table tbody tr:hover>td {
    background-color:#ffffff!important
  }




  </style>
  