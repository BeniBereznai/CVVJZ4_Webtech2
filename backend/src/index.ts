import { AppDataSource } from "./data-source"
import * as bodyParser from "body-parser";
import { UserController } from "./controllers/user-controller";
import { RoomController } from "./controllers/room-controller";
import { BookingController } from "./controllers/booking-controller";
import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Room } from "./entity/Room";
import { AuthController } from "./controllers/auth-controller";
import { checkJwt } from "./controllers/jwtMiddleware";

dotenv.config();
const rooms: Room[] = [
    { id: 1, name: '1. terem', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit mollis felis eget imperdiet. Suspendisse auctor orci non urna elementum semper. Quisque lectus purus, ultricies at metus vel, faucibus iaculis enim.', rate:4.4,pricePerHour: 2400, bookings: [] },
    { id: 2, name: '2. terem', description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin accumsan eros id sapien volutpat, id maximus nulla rhoncus. Sed lacus ex, euismod ac suscipit ac, eleifend in metus. In suscipit accumsan lacinia', rate:4.8, pricePerHour: 4200, bookings: [] },
    { id: 3, name: '3. terem', description: 'Proin mauris tellus, sodales ac euismod quis, faucibus eu felis. Nam eget lorem consequat, dictum turpis quis, vehicula dolor. Quisque non laoreet lacus, non tempus risus. Donec sed diam vel massa mollis interdum id non felis. ', rate:4.2 ,pricePerHour: 5000, bookings: [] },
    { id: 4, name: '4. terem', description: 'Suspendisse dapibus nibh sed erat tincidunt, quis venenatis sapien lobortis. Nunc nec euismod lacus, eu hendrerit nisl. Mauris lacinia neque ac purus tincidunt laoreet. Duis tristique volutpat elementum. Sed semper eros a mattis condimentum. Nam sed pulvinar purus, in rutrum ligula.', rate:4.0 , pricePerHour: 2300, bookings: [] },
    { id: 5, name: '5. terem', description: 'Quisque eu fermentum velit. Sed molestie, urna eget ultricies luctus, enim nisi iaculis diam, hendrerit posuere ligula orci in velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',rate:3.9 , pricePerHour: 6000, bookings: [] },
    { id: 6, name: '6. terem', description: 'Aenean accumsan massa eget semper vestibulum. Maecenas tincidunt tristique ligula, quis egestas sapien mollis vitae. Sed at est orci. Sed gravida eget eros in lobortis.',rate:5.0 , pricePerHour: 7000, bookings: [] }
];

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const authController = new AuthController();
    const userController = new UserController();
    const roomController = new RoomController();
    const bookingController = new BookingController();

    await initializeRooms();

    app.post('/register', authController.register);
    app.post('/login', authController.login);


    app.get('/users/me', checkJwt, authController.getCurrentUser);
    app.get("/users", userController.getAll.bind(userController));
    app.put("/users", checkJwt, userController.update.bind(userController));
    app.delete("/users",checkJwt, userController.delete.bind(userController));

    app.get("/rooms", roomController.getAll.bind(roomController));
    app.get("/rooms/:id", roomController.getById.bind(roomController));

    app.get("/bookings", bookingController.getAll.bind(bookingController));
    app.get("/bookings/view-bookings", checkJwt,bookingController.getUserBookings.bind(bookingController));
    app.post("/bookings", checkJwt, bookingController.create.bind(bookingController));

    const port =  3000;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

}).catch((error) => console.log(error));
async function initializeRooms() {
    const roomRepository = AppDataSource.getRepository(Room);
    const roomCount = await roomRepository.count();

    if (roomCount === 0) {
        for (const room of rooms) {
            await roomRepository.save(room);
        }
    }
}
