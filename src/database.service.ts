import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db;

  constructor() {
    const url = process.env.MONGO_URI || "mongodb://localhost:27017";

    this.client = new MongoClient(url);
  }

  async onModuleInit() {
    const dbName = process.env.DB_NAME || "nestjs";
    await this.client.connect();
    console.log("Connected successfully to database");
    this.db = this.client.db(dbName);
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log("Disconnected from database");
  }

  getDb() {
    return this.db;
  }
}
