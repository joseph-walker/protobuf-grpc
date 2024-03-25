import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { LISTING_PACKAGE_NAME } from 'proto/listing';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LISTING_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "[::1]:50051",
          package: "listing",
          protoPath: join(__dirname, '../../../proto-server/proto/listing.proto')
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
