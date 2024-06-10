import { Controller, Dependencies, Get, Post, Bind, Body } from '@nestjs/common';
import { ServPagmentos } from './services/serv-pagamento.service';

@Controller('pagamentos')
@Dependencies(ServPagmentos)
export class AppController {
  constructor(ServPagmentos) {
    this.ServPagmentos = ServPagmentos;
  }

  @Post('registrar')
  @Bind(Body())
  async registrarPagamento(pBody){
    console.log('Registrando pagamento: ' + pBody);
    return await this.ServPagmentos.registrarPagamento(pBody).then((res) => {
      this.ServPagmentos.notificarServicoCadastramento(pBody);
      this.ServPagmentos.notificarServicoAssinaturasValidas(pBody);
      return 'Pagamento registrado com sucesso';
    })

  }
}
