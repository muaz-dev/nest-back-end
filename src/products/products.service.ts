import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database.service";

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async addToCart(username: string, item: any): Promise<void> {
    const userCollection = this.databaseService.getDb().collection(username);
    await userCollection.updateOne({}, { $push: { cart: item } });
  }
}
