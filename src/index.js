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

    // 查询
    const result = await connection.execute("SELECT * FROM TEST")
    console.log(result.rows)
    connection.close()
    pool.close()
}

main()