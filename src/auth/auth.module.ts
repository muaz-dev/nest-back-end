import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "3d" },
    }),
  ],
})
export class AuthModule {}
