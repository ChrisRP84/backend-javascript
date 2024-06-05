import { Injectable } from '@nestjs/common';
import { query } from './database.access';

@Injectable()
export class AcessoDados{

    async listarClientes() {
        const clientes = await query({
        query: 'SELECT * FROM CLIENTES',
        values: []
        });
        return clientes;
        }

}