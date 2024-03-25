use std::error::Error;

use tonic::{transport::Server, Request, Response, Status};

use listing::listing_service_server::{ListingService, ListingServiceServer};
use listing::{GetListingByIdInput, GetListingByIdResponse};

pub mod listing {
    tonic::include_proto!("listing");
}

#[derive(Debug, Default)]
struct ListingServiceImpl {}

#[tonic::async_trait]
impl ListingService for ListingServiceImpl {
    async fn get_listing_by_id(
        &self,
        request: Request<GetListingByIdInput>,
    ) -> Result<Response<GetListingByIdResponse>, Status> {
        println!("Handling request...");

        let id = &request.get_ref().id;

        let listing = GetListingByIdResponse {
            id: id.into(),
            address_street: "42069 Cool Street".into(),
            address_city: "Atlanta".into(),
            address_state: "GA".into(),
            address_zip: "30214".into(),
        };

        Ok(Response::new(listing))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let address = "[::1]:50051".parse()?;
    let listing_service = ListingServiceImpl::default();

    Server::builder()
        .add_service(ListingServiceServer::new(listing_service))
        .serve(address)
        .await?;

    Ok(())
}
