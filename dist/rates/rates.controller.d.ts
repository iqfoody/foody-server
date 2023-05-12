import { RatesService } from './rates.service';
import { CreateRateInput } from './dto/create-rate.input';
export declare class RatesController {
    private readonly ratesService;
    constructor(ratesService: RatesService);
    createMeal(createRateInput: CreateRateInput, context: any): Promise<string>;
    rate(createRateInput: CreateRateInput, context: any): Promise<{
        rating: any;
        rates: number;
    }>;
}
