import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServPagmentos } from './services/serv-pagamento.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ServPagmentos],
})
export class AppModule {}
