import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
export declare class SearchesService {
    private mealsService;
    private RestaurantsService;
    constructor(mealsService: MealsService, RestaurantsService: RestaurantsService);
    create(createSearchInput: CreateSearchInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSearchInput: UpdateSearchInput): string;
    remove(id: number): string;
}
