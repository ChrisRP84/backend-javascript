import { query } from "../database-access/database.access";

export class AssinaturasValidasService{

    constructor(acessoDados){
        this.acessoDados = acessoDados;
    }

    async getAssinaturaValida(pCodAss){
        const assValid = await query({
            query: 'SELECT ' +
                   'CASE WHEN FIM_VIGENCIA > CURRENT_DATE THEN ' +
                   '1 ' +
                   'ELSE ' +
                   '  0 ' +
                   'END AS ASS_VALIDA ' +
                   'FROM ASSINATURAS ' +
                   'WHERE CODIGO = ?',
            values: [pCodAss]
            });
        return JSON.stringify(assValid).includes('1') ? JSON.stringify(true) : JSON.stringify(false);
    }
}