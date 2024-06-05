import { Controller, Dependencies, Get, Post, Bind, Body, Patch, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ServCadService } from './services/servcad.service';
import { Utils } from './utils/utils';

@Controller('servcad')
@Dependencies(ServCadService)
export class AppController {

  constructor(servcadService){
    this.servcadService = servcadService;
  }

  @Get('clientes')
  async getListaClientes(){
    return await this.servcadService.getClientes().then((result) => {
      return JSON.stringify(result);
    });
  }

  @Get('aplicativos')
  async getListaAplicativos(){
    return await this.servcadService.getAplicativos().then((result) => {
      return JSON.stringify(result);
    });
  }

  @Post('assinaturas')
  @Bind(Body())
  async novaAssinatura(pAssinatura){
    return await this.servcadService.novaAssinatura(pAssinatura.codCliente, pAssinatura.codAplicativo).then(async (result) => {
      return await this.servcadService.getUltimaAssinatura().then((res) => {
        return JSON.stringify(res);
      });

    });
  }

  @Get('assinaturas/:tipo')
  @Bind(Param())
  async assinaturasPorTipo(param){
    let utils = new Utils();
    if (!utils.tipoAssinaturaValida(param.tipo)){
      return JSON.stringify('{"error":"Tipo inválido"}');
    }
    
    return await this.servcadService.getAssinaturasPorTipo(utils.getTipoStatusBd(param.tipo)).then((result) => {
      return JSON.stringify(result);
    });
  }


  @Patch('aplicativos/:codigo')
  @Bind(Param(), Body())
  async updateCustoAplicativo(param, pBdCusto){
    let pCodAplicativo = param.codigo;
    return await this.servcadService.updateCustoAplicativo(pCodAplicativo, pBdCusto.custo).then(async (result) => {
      return await this.servcadService.getAplicativoByCodigo(pCodAplicativo).then((res) => {
        if (res.length === 0){
          return '{"error":"Aplicativo não encontrado"';
        } else {
          return JSON.stringify(res);
        }
      })
    })
  }
}
