import { Controller, Dependencies, Get, Post, Bind, Body, Patch, Param } from '@nestjs/common';

@Controller('notify')
export class ObserverController{

    @Post('payment')
    @Bind(Body())
    notificaPagamento(pBody){
        console.log('Pagamento da assinatura ' + pBody.codAss + ' recebida em ' +
            pBody.dia + '/' + pBody.mes + '/' + pBody.ano + ' no valor de R$' + pBody.valor
         );
         return 'Notificação recebida';
    }
}