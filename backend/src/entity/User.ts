import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Booking } from "./Booking";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];
}

