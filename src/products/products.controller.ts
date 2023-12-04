import { Controller, Post, Body, Param, Get, Patch } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post(":username")
  async addToCart(@Param("username") username: string, @Body() item: any) {
    await this.productService.addToCart(username, item);
    return { message: "Item added to cart" };
  }

  @Get(":collectionName")
  getData(@Param("collectionName") collectionName: string) {
    return this.productService.find(collectionName);
  }

  @Patch("/update/:collection/:id")
  async updateItem(
    @Param() params: { collection: string; id: string },
    @Body() newCart.data: any[],
  ) {
    const { collection, id } = params;
    return this.productService.updateCart(id, collection, newCart);
  }
}
