import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    
    host: process.env.MYSOL_HOST,
    user: process.env.MYSOL_USER,
    password: process.env.MYSOL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    
}).promise()

// async声明异步函数，返回值为promise对象
// await只能使用在异步函数中，async在await后的代码包括await的返回值会被视作异步任务

//======================================================================================================rd1
export async function getcount_rd1(row){
    const [count] = await pool.query(`SELECT COUNT(*) as count FROM rd1 WHERE name = ?`,[row.NAME])
    return count
}
export async function insert_rd1(row){
    const [result] = await pool.query(`
                  INSERT INTO rd1 (name, CH4_Hen, CH4_Qst, CH4_Ds, CH4_P0, CH4_P0_barrer,
                    N2_Hen, N2_Qst, N2_Ds, N2_P0, N2_P0_barrer, 
                    Sads_CH4_N2, Sdiff_N2_CH4, Sperm_CH4_N2, Sperm_N2_CH4)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `,[row.NAME, row.CH4_Hen, row.CH4_Qst, row.CH4_Ds, row.CH4_P0, row.CH4_P0_barrer,
                  row.N2_Hen, row.N2_Qst, row.N2_Ds, row.N2_P0, row.N2_P0_barrer, 
                  row.Sads_CH4_N2, row.Sdiff_N2_CH4, row.Sperm_CH4_N2, row.Sperm_N2_CH4])
    return result
}
//======================================================================================================rd2
export async function getcount_rd2(row){
    const [count] = await pool.query(`SELECT COUNT(*) as count FROM rd2 WHERE name = ?`,[row.NAME])
    return count
}
export async function insert_rd2(row){
    const [result] = await pool.query(`
                  INSERT INTO rd2 (name, C2H6_Hen, C2H6_Qst, C2H6_Ds, C2H6_P0, C2H6_P0_barrer,
                    C2H4_Hen, C2H4_Qst, C2H4_Ds, C2H4_P0, C2H4_P0_barrer, 
                    Sads_C2H6_C2H4, Sads_C2H4_C2H6, Sdiff_C2H4_C2H6, Sperm_C2H6_C2H4, Sperm_C2H4_C2H6)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `,[row.NAME, row.C2H6_Hen, row.C2H6_Qst, row.C2H6_Ds, row.C2H6_P0, row.C2H6_P0_barrer,
                  row.C2H4_Hen, row.C2H4_Qst, row.C2H4_Ds, row.C2H4_P0, row.C2H4_P0_barrer, 
                  row.Sads_C2H6_C2H4, row.Sads_C2H4_C2H6, row.Sdiff_C2H4_C2H6, row.Sperm_C2H6_C2H4, row.Sperm_C2H4_C2H6])
    return result
}
//======================================================================================================rd3
export async function getcount_rd3(row){
    const [count] = await pool.query(`SELECT COUNT(*) as count FROM rd3 WHERE name = ?`,[row.NAME])
    return count
}
export async function insert_rd3(row){
    const [result] = await pool.query(`
                  INSERT INTO rd3 (name, C3H8_Hen, C3H8_Qst, C3H8_Ds, C3H8_P0, C3H8_P0_barrer,
                    C3H6_Hen, C3H6_Qst, C3H6_Ds, C3H6_P0, C3H6_P0_barrer, 
                    Sads_C3H8_C3H6, Sdiff_C3H6_C3H8, Sperm_C3H8_C3H6, Sperm_C3H6_C3H8)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `,[row.NAME, row.C3H8_Hen, row.C3H8_Qst, row.C3H8_Ds, row.C3H8_P0, row.C3H8_P0_barrer,
                  row.C3H6_Hen, row.C3H6_Qst, row.C3H6_Ds, row.C3H6_P0, row.C3H6_P0_barrer, 
                  row.Sads_C3H8_C3H6, row.Sdiff_C3H6_C3H8, row.Sperm_C3H8_C3H6, row.Sperm_C3H6_C3H8])
    return result
}

//======================================================================================================hun1d
export async function getcount_hun1d(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun1d WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun1d(row){
  const [result] = await pool.query(`
                INSERT INTO hun1d (name, CH4_UC, CH4_Qst, CH4_Qff, CH4_Qfm, CH4_bar,CH4_UC_Z,CH4_Ds,P_CH4,
                  N2_UC, N2_Qst, N2_Qff, N2_Qfm, N2_bar,N2_UC_Z,N2_Ds,P_N2,
                  Sads_CH4_N2, Sdiff_CH4_N2, Sperm_N2_CH4)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.CH4_UC, row.CH4_Qst, row.CH4_Qff, row.CH4_Qfm, row.CH4_bar,row.CH4_UC_Z,row.CH4_Ds,row.P_CH4,
                row.N2_UC, row.N2_Qst, row.N2_Qff, row.N2_Qfm, row.N2_bar,row.N2_UC_Z,row.N2_Ds,row.P_N2,
                row.Sads_CH4_N2, row.Sdiff_CH4_N2, row.Sperm_N2_CH4])
  return result
}       
//======================================================================================================hun1s
export async function getcount_hun1s(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun1s WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun1s(row){
  const [result] = await pool.query(`
                INSERT INTO hun1s (name, CH4_UC, CH4_Qst, CH4_Qff, CH4_Qfm, CH4_bar,CH4_UC_Z,CH4_Ds,P_CH4,
                  N2_UC, N2_Qst, N2_Qff, N2_Qfm, N2_bar,N2_UC_Z,N2_Ds,P_N2,
                  Sads_CH4_N2, Sdiff_CH4_N2, Sperm_CH4_N2)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.CH4_UC, row.CH4_Qst, row.CH4_Qff, row.CH4_Qfm, row.CH4_bar,row.CH4_UC_Z,row.CH4_Ds,row.P_CH4,
                row.N2_UC, row.N2_Qst, row.N2_Qff, row.N2_Qfm, row.N2_bar,row.N2_UC_Z,row.N2_Ds,row.P_N2,
                row.Sads_CH4_N2, row.Sdiff_CH4_N2, row.Sperm_CH4_N2])
  return result
}          
//======================================================================================================hun2d
export async function getcount_hun2d(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun2d WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun2d(row){
  const [result] = await pool.query(`
                INSERT INTO hun2d (name, C2H6_UC, C2H6_Qst, C2H6_Qff, C2H6_Qfm, C2H6_bar,C2H6_UC_Z,C2H6_Ds,P_C2H6,
                  C2H4_UC, C2H4_Qst, C2H4_Qff, C2H4_Qfm, C2H4_bar,C2H4_UC_Z,C2H4_Ds,P_C2H4,
                  Sads_C2H6_C2H4, Sdiff_C2H6_C2H4, Sperm_C2H4_C2H6)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.C2H6_UC, row.C2H6_Qst, row.C2H6_Qff, row.C2H6_Qfm, row.C2H6_bar,row.C2H6_UC_Z,row.C2H6_Ds,row.P_C2H6,
                row.C2H4_UC, row.C2H4_Qst, row.C2H4_Qff, row.C2H4_Qfm, row.C2H4_bar,row.C2H4_UC_Z,row.C2H4_Ds,row.P_C2H4,
                row.Sads_C2H6_C2H4, row.Sdiff_C2H6_C2H4, row.Sperm_C2H4_C2H6])

  return result
}  
//======================================================================================================hun2s46
export async function getcount_hun2s46(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun2s46 WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun2s46(row){
  const [result] = await pool.query(`
                INSERT INTO hun2s46 (name, C2H6_UC, C2H6_Qst, C2H6_Qff, C2H6_Qfm, C2H6_bar,C2H6_UC_Z,C2H6_Ds,P_C2H6,
                  C2H4_UC, C2H4_Qst, C2H4_Qff, C2H4_Qfm, C2H4_bar,C2H4_UC_Z,C2H4_Ds,P_C2H4,
                  Sads_C2H6_C2H4, Sdiff_C2H6_C2H4, Sperm_C2H4_C2H6)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.C2H6_UC, row.C2H6_Qst, row.C2H6_Qff, row.C2H6_Qfm, row.C2H6_bar,row.C2H6_UC_Z,row.C2H6_Ds,row.P_C2H6,
                row.C2H4_UC, row.C2H4_Qst, row.C2H4_Qff, row.C2H4_Qfm, row.C2H4_bar,row.C2H4_UC_Z,row.C2H4_Ds,row.P_C2H4,
                row.Sads_C2H6_C2H4, row.Sdiff_C2H6_C2H4, row.Sperm_C2H4_C2H6])

  return result
}  
//======================================================================================================hun2s64
export async function getcount_hun2s64(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun2s64 WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun2s64(row){
  const [result] = await pool.query(`
                INSERT INTO hun2s64 (name, C2H6_UC, C2H6_Qst, C2H6_Qff, C2H6_Qfm, C2H6_bar,C2H6_UC_Z,C2H6_Ds,P_C2H6,
                  C2H4_UC, C2H4_Qst, C2H4_Qff, C2H4_Qfm, C2H4_bar,C2H4_UC_Z,C2H4_Ds,P_C2H4,
                  Sads_C2H6_C2H4, Sdiff_C2H6_C2H4, Sperm_C2H6_C2H4)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.C2H6_UC, row.C2H6_Qst, row.C2H6_Qff, row.C2H6_Qfm, row.C2H6_bar,row.C2H6_UC_Z,row.C2H6_Ds,row.P_C2H6,
                row.C2H4_UC, row.C2H4_Qst, row.C2H4_Qff, row.C2H4_Qfm, row.C2H4_bar,row.C2H4_UC_Z,row.C2H4_Ds,row.P_C2H4,
                row.Sads_C2H6_C2H4, row.Sdiff_C2H6_C2H4, row.Sperm_C2H6_C2H4])

  return result
}  



//======================================================================================================hun3d
export async function getcount_hun3d(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun3d WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun3d(row){
  const [result] = await pool.query(`
                INSERT INTO hun3d (name, C3H8_UC, C3H8_Qst, C3H8_Qff, C3H8_Qfm, C3H8_bar,C3H8_UC_Z,C3H8_Ds,P_C3H8,
                  C3H6_UC, C3H6_Qst, C3H6_Qff, C3H6_Qfm, C3H6_bar,C3H6_UC_Z,C3H6_Ds,P_C3H6,
                  Sads_C3H8_C3H6, Sdiff_C3H8_C3H6, Sperm_C3H6_C3H8)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.C3H8_UC, row.C3H8_Qst, row.C3H8_Qff, row.C3H8_Qfm, row.C3H8_bar,row.C3H8_UC_Z,row.C3H8_Ds,row.P_C3H8,
                row.C3H6_UC, row.C3H6_Qst, row.C3H6_Qff, row.C3H6_Qfm, row.C3H6_bar,row.C3H6_UC_Z,row.C3H6_Ds,row.P_C3H6,
                row.Sads_C3H8_C3H6, row.Sdiff_C3H8_C3H6, row.Sperm_C3H6_C3H8])
  return result
}  

//======================================================================================================hun3s
export async function getcount_hun3s(row){
  const [count] = await pool.query(`SELECT COUNT(*) as count FROM hun3s WHERE name = ?`,[row.NAME])
  return count
}
export async function insert_hun3s(row){
  const [result] = await pool.query(`
                INSERT INTO hun3s (name, C3H8_UC, C3H8_Qst, C3H8_Qff, C3H8_Qfm, C3H8_bar,C3H8_UC_Z,C3H8_Ds,P_C3H8,
                  C3H6_UC, C3H6_Qst, C3H6_Qff, C3H6_Qfm, C3H6_bar,C3H6_UC_Z,C3H6_Ds,P_C3H6,
                  Sads_C3H8_C3H6, Sdiff_C3H8_C3H6, Sperm_C3H8_C3H6)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `,[row.NAME, row.C3H8_UC, row.C3H8_Qst, row.C3H8_Qff, row.C3H8_Qfm, row.C3H8_bar,row.C3H8_UC_Z,row.C3H8_Ds,row.P_C3H8,
                row.C3H6_UC, row.C3H6_Qst, row.C3H6_Qff, row.C3H6_Qfm, row.C3H6_bar,row.C3H6_UC_Z,row.C3H6_Ds,row.P_C3H6,
                row.Sads_C3H8_C3H6, row.Sdiff_C3H8_C3H6, row.Sperm_C3H8_C3H6])
  return result
}  