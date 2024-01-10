import { Client } from 'pg';

export default class PG_DB {

private DBConfig = {
      user: "db_user",
      host: "localhost",
      database: "local_db",
      password: "pass",
      port: 5477,
      IdleTimeoutMillis: 3000,
      connectionTimeoutMillis: 2000
};
 
async  executeQuery(query:string) {
    const client = new Client(this.DBConfig)
    try {
        await client.connect()
        //const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        const res = await client.query(query)
        console.log(res.rows[0].message) // Hello world!
     } catch (err) {
        console.error(err);
     } finally {
        await client.end()
     }
}
}
