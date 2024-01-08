// 扫描所有MOF文件，读取文件路径、名称等信息，并将jichu性质数据按文件名插入到对应的位置

import mysql from 'mysql2'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
dotenv.config()

const pool = mysql.createPool({
    
    host: process.env.MYSOL_HOST,
    user: process.env.MYSOL_USER,
    password: process.env.MYSOL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    
}).promise()


async function getcsv(){
  return new Promise((resolve, reject) => {
    const dataObject = {}; // 在函数内部声明 dataObject

    fs.createReadStream('./data/jichu.csv')
      .pipe(csv())
      .on('data', (row) => {
        dataObject[row.oldname] = { 
          name: row.NAME, 
          vol: row.VOL,
          den: row.DEN,
          PLD: row.PLD_A,
          LCD: row.LCD_A,
          Sa_m: row.Sa_m,
          Sa_g: row.Sa_g,
          phi: row.phi,
          Va: row.Va };
      })
      .on('end', () => {
        resolve(dataObject); // 数据填充完成后解析 Promise
      })
      .on('error', (error) => {
        reject(error); // 处理可能的错误
      });
  });

}


// 提取晶胞参数
function extractCellParametersFromFile(filePath) {
  try {
      // 读取文件内容
      const cifContent = fs.readFileSync(filePath, 'utf-8');

      // 定义正则表达式模式来匹配晶胞参数
      const cellPattern = /_cell_length_a\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_length_b\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_length_c\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_alpha\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_beta\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_gamma\s+(\d+\.\d+)/;

      // 使用正则表达式匹配晶胞参数
      const matches = cifContent.match(cellPattern);

      if (matches && matches.length === 7) {
          // 提取匹配的参数
          const a = parseFloat(matches[1]);
          const b = parseFloat(matches[2]);
          const c = parseFloat(matches[3]);
          const alpha = parseFloat(matches[4]);
          const beta = parseFloat(matches[5]);
          const gamma = parseFloat(matches[6]);

          // 返回晶胞参数对象
          return { a, b, c, alpha, beta, gamma };
      } else {
          // 如果未找到匹配，返回空对象或者抛出错误，根据实际需求来决定
          return null;
      }
  } catch (error) {
      console.error('Error reading file:', error.message);
      return null;
  }
}


// import data
// dirPath       ../../public/data/new_mof/
// filePath      ../../public/data/new_mof/mof_1.cif or ../../public/data/new_mof/test/
// fileNameType  mof_1.cif
// fileName      mof_1
// fileType      cif
async function readDir(dirPath,num_succ,num_fail,dataObject) {
  const files = fs.readdirSync(dirPath);// 读取文件夹中的文件
  // console.log(files)
  for (let file of files) {
    const filePath = path.join(dirPath, file);
    // 判断是否为文件夹
    if (fs.statSync(filePath).isDirectory()) {
      // readDir(filePath,num_file);
      await readDir(filePath,num_succ,num_fail);// 递归调用自身，处理子文件夹
    } 
    else {
      // 处理文件
      const fileNameType = path.basename(filePath);
      const fileName = fileNameType
      const fileType = fileNameType.split('.')[1]
      const topology = fileNameType.split('_')[0]        
      // console.log(fileName);
      // console.log(filePath);
      // 提取晶胞参数
      const cellParameters = extractCellParametersFromFile(filePath);
      // 判断是否已存在该文件
      const [count] = await pool.query(`SELECT COUNT(*) as count FROM mol
      WHERE oldname = ?`,[fileName])
      if(count[0].count>0){
          console.log('%s 已经存在！',fileName)
          num_fail.value ++;
      }
      else{ 
          try{
              const [result] = await pool.query(`
              INSERT INTO mol (oldname, file_path, file_type, type, topology, 
                name, vol, den, PLD, LCD, Sa_m, Sa_g, phi, Va, a, b, c, alpha, beta, gamma)
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[fileName, filePath, fileType, "3D", topology,
              dataObject[fileName].name,
              dataObject[fileName].vol,
              dataObject[fileName].den,
              dataObject[fileName].PLD,
              dataObject[fileName].LCD,
              dataObject[fileName].Sa_m,
              dataObject[fileName].Sa_g,
              dataObject[fileName].phi,
              dataObject[fileName].Va,
              cellParameters.a,
              cellParameters.b,
              cellParameters.c,
              cellParameters.alpha,
              cellParameters.beta,
              cellParameters.gamma,
            ])
              num_succ.value ++;
              // console.log(`File "${fileName}" inserted successfully!`);
          }catch(error) {
              // console.log(error);
              console.log(`${fileName} ,there is a problem with the data `);
              num_fail.value ++;
          }
      }
    }
  }
}

async function insert_data(){
  var num_succ = {}
  var num_fail = {}
  num_succ.value = 0 //引用传递
  num_fail.value = 0
  var path = '../../public/data/mof/part4_10908'  //文件路径 8604+65170+19870+10481=104125
  const dataObject = await getcsv();
  // console.log(dataObject);
  await readDir(path,num_succ,num_fail,dataObject);
  // readDir(path,num_succ,num_fail);
  if(num_fail.value>0){
    console.log(`${num_succ.value} files successfully imported, ${num_fail.value} files are duplicate and failed to import!`)
  }
  else{
    console.log(`${num_succ.value} files successfully imported!`)
  }
}

console.time();
await insert_data();
console.timeEnd();
// console.log('success');

// 关闭数据库连接
pool.end();

//await readDir,await readDir 5.231s
//await readDir,readDir       4.292ms
//readDir      ,await readDir 13.704ms
//readDir      ,readDir       13.753ms

