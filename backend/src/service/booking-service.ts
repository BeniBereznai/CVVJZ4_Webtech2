import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";

export class BookingService {
    private bookingRepository: Repository<Booking>;

    constructor() {
        this.bookingRepository = AppDataSource.getRepository(Booking);
    }

    async getAllBookings(userId?: number): Promise<Booking[]> {
        if (userId) {
            return this.bookingRepository.find({
                where: { user: { id: userId } },
                relations: ['user', 'room']
            });
        }
        return this.bookingRepository.find({ relations: ['user', 'room'] });
    }


    async createBooking(booking: Booking) {
        return this.bookingRepository.save(booking);
    }

}
