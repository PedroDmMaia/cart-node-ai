import { Module } from "@nestjs/common";
import { ControllerCart } from "./cart.controller";
import { CartService } from "./cart.service";
import { PostgresService } from "../shared/postgres.service";

@Module({
  controllers: [ControllerCart],
  providers: [CartService, PostgresService]
})
export class CartModule { }
