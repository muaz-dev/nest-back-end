import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  grertingUser(): string {
    return 'Hello World! Muaz Hayee as user';
  }
  async findAllUsers(): Promise<any[]> {
    const db = this.databaseService.getDb();
    return db.collection('users').find().toArray();
  }
  async addUser(userData: any): Promise<any[]> {
    const collection = this.databaseService.getDb().collection('users');
    const result = await collection.insertOne(userData);
    return result.insertedId; // This returns the newly created ObjectId of the inserted user
  }
  async updateUser(userId: string, updateData: any): Promise<boolean> {
    const collection = this.databaseService.getDb().collection('users');
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData },
    );

    return result.modifiedCount === 1;
  }
}
