const dmdb = require('dmdb')

async function main() {
    // 创建连接池
    const pool = await dmdb.createPool({
        connectString: "dm://SYSDBA:SYSDBA@LOCALHOST:5236?loginEncrypt=false",
        poolMin: 1,
        poolMax: 10,
    })

    // 创建连接
    const connection = await pool.getConnection()

    // 创建表
    // await createTable(connection)
    // 查询
    const result = await queryTable(connection)
    // 事务
    await doTransaction(connection)
    console.log(result.rows)

    connection.close()
    pool.close()
}

async function createTable(connection) {
    await connection.execute("CREATE TABLE TEST (ID INT)")
}

async function queryTable(connection) {
    return await connection.execute("SELECT * FROM TEST")
}

async function doTransaction(connection) {
    await connection.execute(`
    BEGIN
        INSERT INTO TEST VALUES ( 1 );
        SELECT * FROM TEST;
        INSERT INTO TEST VALUES ( 2 );
    END;
    `)
}

main()
