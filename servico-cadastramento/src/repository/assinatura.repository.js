import { DatabaseInfo } from "../database-access/database.info";
import { Assinatura } from "../models/assinatura.model";
import mysql from 'mysql2/promise';

export class AssinaturaRepository{

    constructor(){
    }

    async novaAssinatura(assinatura){

        let databaseInfo = new DatabaseInfo();

        const connection = await mysql.createConnection({
            host: databaseInfo.getHost(),
            port: databaseInfo.getPort(),
            database: databaseInfo.getDataBase(),
            user: databaseInfo.getUser(),
            password: databaseInfo.getPassword(),
            entities: [Assinatura]
        })
    
        try {
            const assinaturaRepository = connection.getRepository(Assinatura);
            await assinaturaRepository.save(assinatura);
        } catch(error) {
            throw Error(error.message);
        }


    }
}