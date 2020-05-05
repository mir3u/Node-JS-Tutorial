var mysql = require('mysql');
require('dotenv').config({ path: '../.env' })


const  host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

// const port = process.env.DB_PORT;
const database = process.env.DB_DB;



var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: 3306,
    // ssl: true
});

module.exports = {
    /*
    tableData format:
    {tableName: "me", args: [{col: "a", typeVar: "b"}, {col:"b", typeVar: "c"}]}
 */
   createTable: (tableData) => {

        let query1 = "CREATE TABLE " + tableData.tableName + " ( ";
        for (let i in tableData.args) {
            let args = tableData.args[i];
            if (i != 0) {
                query1 += ", ";
            }
            query1 += args.col + " " + args.typeVar;
        }

        query1 += " )";
        con.query(query1, function (err) {
            if (err) throw err;
        });
        },

    /*
    tabledata format:
    {tableName: "me", args: [{col: "a", value: "b"}, {col:"b", value: "c"}]}
     */
    insertIntoTable: (tableData) => {
        let query1 = "INSERT INTO " + tableData.tableName + " ( ";
        for (let i in tableData.args) {
            console.log(tableData.args[i])
            let args = tableData.args[i];
            if (i != 0) {
                query1 += ", ";
            }
            query1 += args.col + " ";
        }

        query1 += " ) VALUES (";

        for (let i in tableData.args) {
            console.log(tableData.args[i])
            let args = tableData.args[i];
            if (i != 0) {
                query1 += ", ";
            }
            query1 += ' "' + args.value + '" ';
        }
        query1 += ")";

        con.query(query1, function (err) {
            if (err) throw err;
        });
    },
    /*
       * Table name given
       */
    selectAll: (tableName, data) =>{
        let query1 = "SELECT * FROM `" + tableName + "`";
        console.log(query1);
        return con.query(query1, function (err, result) {
            console.log(result);
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            return data(resultArray[0]);
        });
    },
    /*
    tabledata format:
    {tableName: "me", col: [ "a" , col:"b", value: "c"]}
     */
    selectCol: (tableName, data) => {
        let query1 = "SELECT ";
        for (let i in tableData.col) {
            let args = tableData.col[i];
            if (i != 0) {
                query1 += ", ";
            }
            query1 += args;
        }
        query1 += " FROM `" + tableData.tableName + "`";

        return con.query(query1, function (err, result) {
            if (err) throw err;
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            return data(resultArray);
        })
    },
    /*
    * Table name given
    */
    checkTableExists: (table, data) => {
        return con.query("SELECT EXISTS( " +
            "       SELECT * FROM information_schema.tables " +
            "       WHERE table_schema = '"+database+"' " +
            "       AND table_name = '" + table + "' " +
            ") AS ME", function (err, result) {
            if (err) throw err;
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            return data(resultArray[0].ME);
        })
    },

    /*tabledata format:
        {tableName: "me", args: [{col: "a", value: "b"}, {col:"b", value: "c"}]}
         */
    checkRecordExists: (tabledata, data) =>
    {
        let query1 = "SELECT * FROM " + tabledata.table + " WHERE ";
        for(let args in tabledata.args){
            console.log(args);
            if(args!=0){
                query1 += "AND WHERE ";
            }
            query1 += tabledata.args[args].col + " = '" + tabledata.args[args].value+"'";
        }
        return con.query(query1, (err, result) => {
            if(result){
                return data(true);
            }
            return data(false);
            }
        )
    }
};
