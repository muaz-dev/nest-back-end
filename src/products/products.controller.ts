import { Controller, Post, Body, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly cartService: ProductsService) {}

  @Post(":username")
  async addToCart(@Param("username") username: string, @Body() item: any) {
    await this.cartService.addToCart(username, item);
    return { message: "Item added to cart" };
  }
}
