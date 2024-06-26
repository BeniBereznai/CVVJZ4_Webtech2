import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Booking } from "./entity/Booking";
import { Room } from "./entity/Room";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "myuser",
    password: "mypassword",
    database: "mydatabase",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [User, Room, Booking],
    migrations: [],
    subscribers: [],
})
