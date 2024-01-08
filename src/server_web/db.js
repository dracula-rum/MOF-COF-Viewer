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

//mol_sys  mol
export async function getByName(name){
    const [rows] = await pool.query(
        `select * 
        from mol_sys.mol
        where name=?
        `,[name])
    return rows
}
export async function getByName_rd(name){
    const [rows] = await pool.query(
        `SELECT *
        FROM rd1
        INNER JOIN rd2 ON rd1.name = rd2.name
        INNER JOIN rd3 ON rd1.name = rd3.name
        WHERE rd1.name = ?;
    `,[name])
    return rows
}
export async function getByName_hun(name){
    const [rows] = await pool.query(
        `SELECT *
        FROM hun1d
        INNER JOIN hun2d ON hun1d.name = hun2d.name
        INNER JOIN hun3d ON hun1d.name = hun3d.name
        WHERE hun1d.name = ?;
    `,[name])
    return rows
}
export async function getAll(){
    const [rows] = await pool.query('select * from mol_sys.mol')
    return rows
}
export async function getAllNames(){
    const [rows] = await pool.query('select name from mol_sys.mol')
    return rows
}
export async function getHomeData(){
    const [rows] = await pool.query('select name,topology,a,b,c,alpha,beta,gamma from mol;')
    return rows
}
export async function getHomeDataByName(name){
    const [rows] = await pool.query(
        `select name,topology,a,b,c,alpha,beta,gamma 
        from mol 
        where name=?
        `,[name])
    return rows
}
export async function createMol(name, file_path, type) {
    const [result] = await pool.query(`
        INSERT INTO mol (name, file_path, type)
        VALUES (?,?,?)
        `,[name, file_path, type])
        // return result.insertId
        // return{
        //     id:result.insertId,
        //     title,
        //     contents
        // }
        const id = result.insertId
        return getById(id)
}
export async function deleteBy(){
    
}
export async function set(){
    
}

// const homedata = await getHomeData()
// console.log(homedata)

// const mol = await getByName_rd("M7430")
// console.log(mol)

