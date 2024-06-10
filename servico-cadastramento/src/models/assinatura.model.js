import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


export class Assinatura{

    codigo;
    codigoCliente;
    codigoAplicativo;
    inicioVigencia;
    fimVigencia;
    
    constructor(pCodigoCliente, pCodigoAlicativo, pInicioVigencia, pFimVigencia){
        // this.codigo = pCodigo;
        this.codigoCliente = pCodigoCliente;
        this.codigoAplicativo = pCodigoAlicativo;
        this.inicioVigencia = pInicioVigencia;
        this.fimVigencia = pFimVigencia;
    }

}