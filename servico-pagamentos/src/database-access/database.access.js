import mysql from 'mysql2/promise';
import { DatabaseInfo } from './database.info';

export async function query({ query, values = []}){

    let databaseInfo = new DatabaseInfo();

    const connection = await mysql.createConnection({
        host: databaseInfo.getHost(),
        port: databaseInfo.getPort(),
        database: databaseInfo.getDataBase(),
        user: databaseInfo.getUser(),
        password: databaseInfo.getPassword(),
    });

    try {
        const [results] = await connection.execute(query, values);
        connection.end();
        return results;
        } catch(error) {
        throw Error(error.message);
        }
}

