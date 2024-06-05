import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
export class Assinatura{

    // @PrimaryGeneratedColumn()
    codigo;
    // @Column("integer")
    codigoCliente;
    // @Column("integer")
    codigoAplicativo;
    // @Column("date")
    inicioVigencia;
    // @Column("date")
    fimVigencia;
    
    constructor(pCodigoCliente, pCodigoAlicativo, pInicioVigencia, pFimVigencia){
        // this.codigo = pCodigo;
        this.codigoCliente = pCodigoCliente;
        this.codigoAplicativo = pCodigoAlicativo;
        this.inicioVigencia = pInicioVigencia;
        this.fimVigencia = pFimVigencia;
    }

}