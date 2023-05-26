import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CreateRateOrderInput } from './dto/create-rate-order.input';
import { orderStatus } from 'src/constants/types.type';

@UseGuards(AccessAuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}

    @Get('/history')
    @CheckAbilities({actions: Actions.Info, subject: Order})
    async getOrderes(@Req() req, @Query('state') state?: orderStatus){
        return this.ordersService.findOrders(req.user._id, state);
    }

    //? delete after complete testing...
    // @Post('/test/:id')
    // testOrder(@Param('id') id: string, @Body('completeOrderInput') completeOrderInput: {recievedPrice: number}){
    //     console.log(completeOrderInput)
    //     if(!completeOrderInput?.recievedPrice) return;
    //     return this.ordersService.testCompleteOrder(id, completeOrderInput.recievedPrice);
    // }

    @Post('/')
    @CheckAbilities({actions: Actions.Add, subject: Order})
    async createOrder(@Body('createOrderInput') createOrderInput: CreateOrderInput, @Req() req){
        return this.ordersService.createOrder({...createOrderInput, user: req.user._id});
    }

    @Post('/rate/:id')
    @CheckAbilities({actions: Actions.Edit, subject: Order})
    async ratingOrder(@Param('id') id: string, @Body('createRateOrderInput') createRateOrderInput: CreateRateOrderInput, @Req() req){
        return this.ordersService.rateOrder({user: req.user._id, order: id, rate: createRateOrderInput.rate, description: createRateOrderInput?.description });
    }

    @Post('/cancel/:id')
    @CheckAbilities({actions: Actions.Edit, subject: Order})
    async cancelOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.cancelOrder(id, req.user._id);
    }

    @Post('/indelivery/:id')
    @CheckAbilities({actions: Actions.Complete, subject: Order})
    async inDeliveryOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.inDeliveryOrder(id, req.user._id);
    }

    @Post('/completed/:id')
    @CheckAbilities({actions: Actions.Complete, subject: Order})
    async completeOrder(@Param('id') id: string, @Body('recievedPrice') recievedPrice: number, @Req() req){
        return this.ordersService.completeOrder(id, req.user._id, recievedPrice);
    }

    @Get('/:id')
    @CheckAbilities({actions: Actions.Info, subject: Order})
    async getOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.findOrder(id, req.user._id);
    }

    @Delete('/:id')
    @CheckAbilities({actions: Actions.Remove, subject: Order})
    async deleteOrder(@Param('id') id: string, @Req() req){
        return this.ordersService.deleteOrder(id, req.user._id);
    }
}
