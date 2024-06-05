import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServCadService } from './services/servcad.service';
import { AcessoDados } from './database-access/dados.access';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ServCadService, AcessoDados],
})
export class AppModule {}
