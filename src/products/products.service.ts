import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { DatabaseService } from "src/database.service";

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async addToCart(username: string, item: any): Promise<void> {
    const userCollection = this.databaseService.getDb().collection(username);
    await userCollection.updateOne({}, { $push: { cart: item } });
  }
  async find(collection: string): Promise<any[]> {
    return this.databaseService
      .getDb()
      .collection(collection)
      .find({}, { projection: { cart: 1 } })
      .toArray();
  }

  async updateCart(id: string, collection: string, newCart: object) {
    const objectId = new ObjectId(id);
    const db = await this.databaseService.getDb().collection(collection);
    return db.updateOne({ _id: objectId }, { $set: { cart: newCart } });
  }
}
