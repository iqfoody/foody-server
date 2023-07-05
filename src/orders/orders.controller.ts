import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { CreateRateOrderInput } from './dto/create-rate-order.input';
import { orderStatus } from 'src/constants/types.type';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}

    //? -> users...

    @Get('/history')
    async getOrderes(@Req() req, @Query('state') state?: orderStatus){
        return this.ordersService.findOrders(req.user, state);
    }

    @Post('/')
    async createOrder(@Body('createOrderInput') createOrderInput: CreateOrderInput, @Req() req){
        return this.ordersService.createOrder({...createOrderInput, user: req.user});
    }

    @Post('/rate/:id')
    async ratingOrder(@Param('id') id: string, @Body('createRateOrderInput') createRateOrderInput: CreateRateOrderInput, @Req() req){
        return this.ordersService.rateOrder({user: req.user, order: id, rate: createRateOrderInput.rate, description: createRateOrderInput?.description });
    }

    @Post('/cancel/:id')
    async cancelOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.cancelOrder(id, req.user);
    }
    //? -> drivers...
    @Post('/indelivery/:id')
    async inDeliveryOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.inDeliveryOrder(id, req.user);
    }

    @Post('/completed/:id')
    async completeOrder(@Param('id') id: string, @Body('recievedPrice') recievedPrice: number, @Req() req){
        return this.ordersService.completeOrder(id, req.user, recievedPrice);
    }

    @Get('/driver/history')
    async getOrderesDriver(@Req() req, @Query('state') state?: orderStatus){
        return this.ordersService.findOrdersDriver(req.user, state);
    }

    //? -> users...
    @Get('/:id')
    async getOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.findOrder(id, req.user);
    }

    @Delete('/:id')
    async deleteOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.deleteOrder(id, req.user);
    }
}
