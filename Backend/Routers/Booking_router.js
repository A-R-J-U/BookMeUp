import router from "express"
import { verify } from "../Middleware/Auth_middleware.js"
import { createBooking , getUserBooking ,getVenueBooking, deleteBooking} from "../Controllers/booking.js";

const bookingRouter = router();

bookingRouter.post("/",verify, createBooking);
bookingRouter.get("/user",verify, getUserBooking);
bookingRouter.get("/:venue_id",verify, getVenueBooking);
bookingRouter.delete("/:booking_id",verify, deleteBooking);


export default bookingRouter;