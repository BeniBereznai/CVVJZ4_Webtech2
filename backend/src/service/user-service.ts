import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAllUsers() {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }


    async createUser(user: User): Promise<User> {
        const existingUser = await this.findByEmail(user.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        return this.userRepository.save(user);
    }

    async updateUser(userId, userDetails) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        if (userDetails.password) {
            user.password = userDetails.password;
        }

        Object.assign(user, userDetails);
        await this.userRepository.save(user);
        return user;
    }


    async deleteUser(id: number) {
        await this.userRepository.delete(id);
    }

    async findOneOrFail(email: string): Promise<User> {
        return this.userRepository.findOneOrFail({ where: { email } });
    }

    async findOneOrFailToken(param: { where: { id: any } }) {
        return this.userRepository.findOneOrFail(param);

    }
}
