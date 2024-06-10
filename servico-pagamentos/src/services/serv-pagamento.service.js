import { query } from "../database-access/database.access";

export class ServPagmentos{

    constructor(acessoDados){
        this.acessoDados = acessoDados;
    }

    async registrarPagamento(pBody){
        const result = await query({
            query: 'INSERT INTO PAGAMENTOS (DIA, MES, ANO, VALOR, CODIGO_ASSINATURA) ' + 
            'VALUES ' + 
            '(?, ?, ?, ?, ?)',
            values: [pBody.dia, pBody.mes, pBody.ano, pBody.valor, pBody.codAss]
            });

            const updt = await query({
                query: 'UPDATE ASSINATURAS SET INICIO_VIGENCIA = INICIO_VIGENCIA + INTERVAL 30 DAY, FIM_VIGENCIA = FIM_VIGENCIA + INTERVAL 30 DAY ' + 
                'WHERE CODIGO = ?',
                values: [pBody.codAss]
                });

        return result;
    }

    notificarServicoCadastramento(pBody){
        const http = require('http');
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/notify/payment',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(pBody))
            }
        };

        const req = http.request(options, (res) => {
            console.log(res);
            let responseData = '';
        });

        req.on('error', (error) => {
            console.error('Erro na requisição:', error);
        });

        req.write(JSON.stringify(pBody));
        req.end();
    }

    notificarServicoAssinaturasValidas(pBody){
        const http = require('http');
        const options = {
            hostname: 'localhost',
            port: 3002,
            path: '/notify/payment',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(pBody))
            }
        };

        const req = http.request(options, (res) => {
            console.log(res);
            let responseData = '';
        });

        req.on('error', (error) => {
            console.error('Erro na requisição:', error);
        });

        req.write(JSON.stringify(pBody));
        req.end();
    }
   
}