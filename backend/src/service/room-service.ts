import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Room } from "../entity/Room";

export class RoomService {
    private roomRepository: Repository<Room>;

    constructor() {
        this.roomRepository = AppDataSource.getRepository(Room);
    }

    async getAllRooms() {
        return this.roomRepository.find();
    }

    async getRoomById(id: number) {
        return this.roomRepository.findOneBy({ id });
    }

}
