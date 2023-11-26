import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Injectable()
export class AppService {
  constructor(private databaseService: DatabaseService) {}
  getHello(): string {
    return "Hello World! Muaz Hayee";
  }
  getApologies(): string {
    return "I would like to do apologies krub";
  }
  async findAllUsers(): Promise<any[]> {
    const db = this.databaseService.getDb();
    return db.collection("users").find().toArray();
  }
}
