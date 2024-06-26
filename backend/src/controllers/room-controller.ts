import { Request, Response } from "express";
import { RoomService } from "../service/room-service";

export class RoomController {
    async getAll(req: Request, res: Response) {
        const roomService = new RoomService();
        const rooms = await roomService.getAllRooms();
        res.send(rooms);
    }

    async getById(req: Request, res: Response) {
        const roomService = new RoomService();
        const room = await roomService.getRoomById(Number(req.params.id));
        res.send(room);
    }

}
