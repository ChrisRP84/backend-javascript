
export class Utils{

    tipoAssinaturaValida(pTipo){
        let s = pTipo.toUpperCase();

        if (s !== 'TODAS' && s !== 'ATIVAS' && s !== 'CANCELADAS'){
            return false
        }
        return true;
    }

    getTipoStatusBd(pTipo){
        let s = pTipo.toUpperCase();
        
        if (s === 'ATIVAS'){
            return 'ATIVA';
        } else if (s === 'CANCELADAS'){
            return 'CANCELADA';
        } else {
            return s;
        }
    }
}