import { AcessoDados } from "../database-access/dados.access";
import { query } from "../database-access/database.access";
import { Dependencies } from '@nestjs/common';

@Dependencies(AcessoDados)
export class ServCadService{

    constructor(acessoDados){
        this.acessoDados = acessoDados;
    }

    async getClientes(){
        const clientes = await query({
            query: 'SELECT * FROM CLIENTES',
            values: []
            });
        return clientes;
    }

    async getAplicativos(){
        const apps = await query({
            query: 'SELECT * FROM APLICATIVOS',
            values: []
            });
        return apps;
    }

    async novaAssinatura(pCodCliente, pCodAplicativo){
        const result = await query({
            query: 'INSERT INTO ASSINATURAS (CODIGO_APLICATIVO, CODIGO_CLIENTE, INICIO_VIGENCIA, FIM_VIGENCIA) ' +
            'VALUES ' +
            '(?, ?, CURRENT_DATE, CURRENT_DATE + INTERVAL 30 DAY)',
            values: [pCodAplicativo, pCodCliente]
            });
        return result;
    }

    async getAssinaturasPorTipo(pTipo){
        let vSql = 'SELECT X.* FROM( ' +
                   ' SELECT ' +
                   ' CODIGO, CODIGO_CLIENTE, CODIGO_APLICATIVO, INICIO_VIGENCIA, FIM_VIGENCIA, ' +
                   ' CASE WHEN CURRENT_DATE > FIM_VIGENCIA THEN ' +
                   '   "CANCELADA" ' +
                   ' ELSE ' +
                   '   "ATIVA" ' +
                   ' END AS STATUS ' +
                   ' FROM ASSINATURAS ' +
                   ' ) X ';
        if (pTipo.toUpperCase() !== 'TODAS'){
            vSql = vSql +  ' WHERE X.STATUS = "{ptipo}" '; 
        }

        vSql = vSql.replace('{ptipo}', pTipo.toUpperCase());

        const assinaturas = await query({
            query: vSql,
            values: []
            });
        return assinaturas;
    }

    async getUltimaAssinatura(){
        const result = await query({
            query: 'SELECT * FROM ASSINATURAS WHERE CODIGO = (SELECT MAX(CODIGO) FROM ASSINATURAS)',
            values: []
            });
        return result;
    }

    async updateCustoAplicativo(pCodAplicativo, pCusto){
        const result = await query({
            query: 'UPDATE APLICATIVOS SET CUSTO = ? WHERE CODIGO = ?',
            values: [pCusto, pCodAplicativo]
            });
        return result; 
    }

    async getAplicativoByCodigo(pCodAPlicativo){
        const result = await query({
            query: 'SELECT * FROM APLICATIVOS WHERE CODIGO = ?',
            values: [pCodAPlicativo]
            });
        return result;
    }

    async getAssinaturasPorCliente(pCodCli){

        const result = await query({
            query:  'SELECT X.* FROM( ' +
                    'SELECT ' +
                    'CODIGO, CODIGO_CLIENTE, CODIGO_APLICATIVO, INICIO_VIGENCIA, FIM_VIGENCIA, ' +
                    'CASE WHEN CURRENT_DATE > FIM_VIGENCIA THEN ' +
                    '  "CANCELADA" ' +
                    'ELSE ' +
                    '  "ATIVA" ' +
                    'END AS STATUS ' +
                    'FROM ASSINATURAS ' +
                ') X ' +
                'WHERE X.CODIGO_CLIENTE = ?',
            values: [pCodCli]
            });
        return result;
    }

    async getAssinaturasPorAplicativo(pCodApp){

        const result = await query({
            query:  'SELECT X.* FROM( ' +
                    'SELECT ' +
                    'CODIGO, CODIGO_CLIENTE, CODIGO_APLICATIVO, INICIO_VIGENCIA, FIM_VIGENCIA, ' +
                    'CASE WHEN CURRENT_DATE > FIM_VIGENCIA THEN ' +
                    '  "CANCELADA" ' +
                    'ELSE ' +
                    '  "ATIVA" ' +
                    'END AS STATUS ' +
                    'FROM ASSINATURAS ' +
                ') X ' +
                'WHERE X.CODIGO_APLICATIVO = ?',
            values: [pCodApp]
            });
        return result;
    }


    
}