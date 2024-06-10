import { Controller, Dependencies, Get, Post, Bind, Body, Patch, Param } from '@nestjs/common';
import { AssinaturasValidasService } from './services/assinaturas-validas.service';

@Controller('assinvalidas')
@Dependencies(AssinaturasValidasService)
export class AppController {
  constructor(assinaturasValidasService) {
    this.assinaturasValidasService = assinaturasValidasService;
  }

  @Get(':codass')
  @Bind(Param())
  async getAssinaturaValida(param) {
    return await this.assinaturasValidasService.getAssinaturaValida(param.codass).then( (result) => {
      return result;
    });
  }
}
