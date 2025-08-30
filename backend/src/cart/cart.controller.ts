import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { NotFoundError } from "rxjs";

@Controller('cart')
export class ControllerCart {
  constructor(
    private readonly cartService: CartService
  ) { }

  userId = 1

  @Post()
  addCart(@Body() body: { productId: number; quantity: number }) {
    if (!body.productId || !body.quantity) {
      throw new BadRequestException('Product ID and quantity are required')
    }

    return this.cartService.addCart(this.userId, body.productId, body.quantity)
  }

  @Get()
  async getCart() {
    const haveCart = this.cartService.getCart(this.userId)

    if (!haveCart) {
      throw new NotFoundError('Cart not found')
    }

    return haveCart
  }
}
