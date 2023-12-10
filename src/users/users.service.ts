import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import * as bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  grertingUser(): string {
    return "Hello World! Muaz Hayee as user";
  }
  async findAllUsers(): Promise<any[]> {
    const db = this.databaseService.getDb();
    return db.collection("users").find().toArray();
  }

  async getUser(collection: string): Promise<any[]> {
    return this.databaseService.getDb().collection(collection).find().toArray();
  }

  async addUser(userData: any): Promise<any[]> {
    const collection = this.databaseService.getDb().collection("users");
    const result = await collection.insertOne(userData);
    return result.insertedId;
  }
  async updateUser(userId: string, updateData: any): Promise<boolean> {
    const collection = this.databaseService.getDb().collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData },
    );

    return result.modifiedCount === 1;
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
      timestamp: new Date().getTime(),
    };

    const db = this.databaseService.getDb().collection("users");

    const insertResult = await db.insertOne(newUser);
    const userId = insertResult.insertedId;

    // const userDetailsCollection = this.databaseService
    //   .getDb()
    //   .collection("userDetails");
    // const userFile = { userId: userId, data: {} };
    // await userDetailsCollection.insertOne(userFile);

    return {
      userId: userId,
      userName: insertResult.name,
      timestamp: insertResult.timestamp,
      ...newUser,
    };
  }

  async createUserCollection(
    userDetail: ObjectId,
    userName: string,
    userDetails: any,
    timestamp: string,
  ): Promise<void> {
    const userCollection = this.databaseService
      .getDb()
      .collection(`${userName}${timestamp}`);
    await userCollection.insertOne({ userDetail, ...userDetails });
  }
}
