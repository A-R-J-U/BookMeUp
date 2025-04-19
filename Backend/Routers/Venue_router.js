import router from "express";
import { verify } from "../Middleware/Auth_middleware.js";
import { getVenues , getVenueById ,searchVenue , getPopular } from "../Controllers/venue_controller.js";

const venueRouter = router();

venueRouter.get("/",verify,getVenues);
venueRouter.get("/search",verify,searchVenue);
venueRouter.get("/popular",verify,getPopular);
venueRouter.get("/:id",verify,getVenueById);




export default venueRouter;