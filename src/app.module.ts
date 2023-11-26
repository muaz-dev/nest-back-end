import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database.module";
import { ProductsModule } from "./products/products.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, DatabaseModule, ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
