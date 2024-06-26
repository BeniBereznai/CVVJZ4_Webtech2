import { Request, Response } from "express";
import { BookingService } from "../service/booking-service";
import { UserService } from "../service/user-service";
import { CustomRequest } from "../model/customer-request";
import { RoomService } from "../service/room-service";
import { Booking } from "../entity/Booking";

export class BookingController {
    private bookingService: BookingService;
    private userService;

    constructor() {
        this.bookingService = new BookingService();
        this.userService = new UserService();
    }

    async getAll(req: Request, res: Response) {
        const bookingService = new BookingService();

        const bookings = await bookingService.getAllBookings();
        res.send(bookings);
    }


    async getUserBookings(req: CustomRequest, res: Response) {
        const userService = new UserService();
        const bookingService = new BookingService();

        try {
            const user = await userService.findOneOrFailToken({ where: { id: req.user.userId } });
            const bookings = await bookingService.getAllBookings(user.id);
            res.send(bookings);
        } catch (error) {
            res.status(400).send({ error: 'Could not retrieve user bookings' });
        }
    }



    async create(req: CustomRequest, res: Response) {
        const userService = new UserService();
        const roomService = new RoomService();

        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }
            console.log(req.body);
            console.log(req.body.booking);

            const user = await userService.findOneOrFailToken({ where: { id: req.user.userId } });
            const room = await roomService.getRoomById(req.body.booking.roomId);
            const booking = new Booking();
            booking.startTime = req.body.booking.startTime;
            booking.endTime = req.body.booking.endTime;
            booking.bookingName = req.body.booking.bookingName;
            booking.user = user;
            booking.room = room;

        await this.bookingService.createBooking(booking);
        res.send(booking);
    }


}
