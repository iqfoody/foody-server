import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MealsService } from 'src/meals/meals.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly mealsService: MealsService,
    ) {}

    @Get('/:id')
    async getMealsForCategory(@Param('id') category: string, @Query('orderBy') orderby: string){
        return this.mealsService.findForCategory(category, orderby);
    }

    @Get('/')
    async getCategories(){
        return this.categoriesService.findCategories();
    }
}
