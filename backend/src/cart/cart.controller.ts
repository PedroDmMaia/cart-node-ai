import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { CartService } from "./cart.service";

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
      throw new NotFoundException('Cart not found')
    }

    return haveCart
  }

  @Put(':cartId/items/:productId')
  async updateCartItem(
    @Body() body: { quantity: number },
    @Param('productId') productId: string,
  ) {
    if (!body.quantity || body.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0')
    }
    await this.cartService.updateCartItemQuantity(
      this.userId,
      Number(productId),
      body.quantity
    )
  }

  @Delete(':cartId/items/:productId')
  async deleteCartItem(
    @Param('productId') productId: string,
  ) {
    await this.cartService.removeCartItem(
      this.userId,
      Number(productId)
    )
  }
}
