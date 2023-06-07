import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { MealsService } from 'src/meals/meals.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly mealsService: MealsService,
        private readonly awsService: AwsService,
    ) {}

    // @Get('/:id')
    // async getCategory(@Param('id') id: string){
    //     return this.categoriesService.findCategory(id);
    // }

    @Get('/:id')
    async getRestaurantsForCategory(@Param('id') category: string, @Query('orderBy') orderby: string){
        return this.mealsService.findForCategory(category, orderby);
    }

    @Get('/')
    async getCategories(){
        return this.categoriesService.findCategories();
    }

    // dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Category})
    @UseInterceptors(FileInterceptor('image'))
    async createCategory(@Body() createCategoryInput: CreateCategoryInput, @UploadedFile() file) {
      return this.categoriesService.create(createCategoryInput, file);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Category})
    @UseInterceptors(FileInterceptor('image'))
    async updateCategory(@Body() updateCategoryInput: UpdateCategoryInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateCategoryInput.id);
      return this.categoriesService.update(updateCategoryInput.id, {...updateCategoryInput, image: result?.Key});
    }
}
