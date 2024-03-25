import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  LISTING_PACKAGE_NAME,
  LISTING_SERVICE_NAME,
  ListingServiceClient,
} from 'proto/listing';

@Injectable()
export class AppService implements OnModuleInit {
  private listingService: ListingServiceClient;

  constructor(@Inject(LISTING_PACKAGE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.listingService =
      this.client.getService<ListingServiceClient>(LISTING_SERVICE_NAME);
  }

  getListing() {
    return this.listingService.getListingById({ id: "123" });
  }
}
