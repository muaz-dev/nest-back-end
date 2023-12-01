import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database.service";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const db = this.databaseService.getDb().collection("users");
    const user = await db.findOne({ email: email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      //   const { password, ...result } = user;
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userName: user.name,
        timestamp: user.timestamp,
      },
    };
  }
}
