import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('float')
    rate: number;

    @Column()
    pricePerHour: number;

    @OneToMany(() => Booking, booking => booking.room)
    bookings: Booking[];
}
