//修改 getcount_rd，insert_rd，path

import mysql from 'mysql2'
import dotenv from 'dotenv'
import fs from 'fs'
import csv from 'csv-parser'
dotenv.config()
import {getcount_rd1,insert_rd1,getcount_rd2,insert_rd2,getcount_rd3,insert_rd3,} from './db_property.js'
import {getcount_hun1d,insert_hun1d,getcount_hun1s,insert_hun1s} from './db_property.js'
import {getcount_hun2d,insert_hun2d,getcount_hun2s46,insert_hun2s46,getcount_hun2s64,insert_hun2s64} from './db_property.js'
import {getcount_hun3d,insert_hun3d,getcount_hun3s,insert_hun3s} from './db_property.js'

const pool = mysql.createPool({
    
    host: process.env.MYSOL_HOST,
    user: process.env.MYSOL_USER,
    password: process.env.MYSOL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    
}).promise()


async function getcsv(path){
  return new Promise((resolve, reject) => {
    const csvData = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => {
        // 将每行数据存储为一个对象并添加到数组中
        csvData.push(row);
      })
      .on('end', () => {
        resolve(csvData); // 数据填充完成后解析 Promise
      })
      .on('error', (error) => {
        reject(error); // 处理可能的错误
      });
  });

}

async function insert(num_succ,num_fail,dataObject) {
    for (const row of dataObject) {
        // console.log(row.NAME); // 这里可以访问每一行的数据

        // 判断是否已存在该文件
        const count = await getcount_rd3(row)
        if(count[0].count>0){
            console.log('%s 已经存在！',row.NAME)
            num_fail.value ++;
        }
        else{ 
          const result = await insert_rd3(row)
          num_succ.value ++;
          // console.log(`File "${fileName}" inserted successfully!`);
        }
    }
}

async function insert_data(){

  var path = './data/rd3.csv'
  
  var num_succ = {}
  var num_fail = {}
  num_succ.value = 0 //引用传递
  num_fail.value = 0
  const dataObject = await getcsv(path);
//   console.log(dataObject.length)
  await insert(num_succ,num_fail,dataObject);
  if(num_succ.value>0){
    console.log(`${num_succ.value} files successfully imported!`)
  }
  if(num_fail.value>0){
    console.log(`${num_fail.value} files are duplicate and failed to import!`)
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



