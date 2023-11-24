import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db;

  constructor() {
    // Connection URL and Database Name
    const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
    // const dbName = process.env.DB_NAME || 'nestjs';

    this.client = new MongoClient(url);

    // this.client = new MongoClient(url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
  }

  async onModuleInit() {
    const dbName = process.env.DB_NAME || 'nestjs';
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to database');
    this.db = this.client.db(dbName);
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log('Disconnected from database');
  }

  // Add your database interaction methods here
  getDb() {
    return this.db;
  }
}
