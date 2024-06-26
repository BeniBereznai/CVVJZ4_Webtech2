import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Room } from "./Room";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startTime: number;

    @Column()
    endTime: number;

    @Column()
    bookingName: string;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Room, room => room.bookings)
    room: Room;
}
