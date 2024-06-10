import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssinaturasValidasService } from './services/assinaturas-validas.service';
import { ObserverController } from './observers/observer.controller';

@Module({
  imports: [],
  controllers: [AppController, ObserverController],
  providers: [AppService, AssinaturasValidasService],
})
export class AppModule {}
