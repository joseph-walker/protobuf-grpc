/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "listing";

export interface GetListingByIdInput {
  id: string;
}

export interface GetListingByIdResponse {
  id: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
}

export const LISTING_PACKAGE_NAME = "listing";

export interface ListingServiceClient {
  getListingById(request: GetListingByIdInput): Observable<GetListingByIdResponse>;
}

export interface ListingServiceController {
  getListingById(
    request: GetListingByIdInput,
  ): Promise<GetListingByIdResponse> | Observable<GetListingByIdResponse> | GetListingByIdResponse;
}

export function ListingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getListingById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ListingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ListingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LISTING_SERVICE_NAME = "ListingService";
