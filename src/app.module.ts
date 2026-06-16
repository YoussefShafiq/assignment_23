import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './configs/app.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports:
    [
      MongooseModule.forRoot(DB_URL, {
        onConnectionCreate: (connection) => {
          connection.on('connected', () => console.log('connected to database'));
          connection.on('error', (error) => console.log('error connecting to database', error));
          connection.on('disconnected', () => console.log('disconnected from database'));
          connection.on('reconnected', () => console.log('reconnected to database'));
          connection.on('reconnectFailed', () => console.log('reconnect failed'));
          connection.on('reconnectFailed', () => console.log('reconnect failed'));
          return connection;
        }
      }),
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env'
      }),
      UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
