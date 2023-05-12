import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService,
        private readonly awsService: AwsService
    ) {}

    @Get('/')
    async getTags(){
        return this.tagsService.findTags();
    }

    @Get('/:id')
    async getTag(@Param('id') tag: string){
        return this.tagsService.findTag(tag);
    }

    // dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Tag})
    @UseInterceptors(FileInterceptor('image'))
    async createTag(@Body('createTagInput') createTagInput: CreateTagInput, @UploadedFile() file) {
        return this.tagsService.create(createTagInput, file);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Tag})
    @UseInterceptors(FileInterceptor('image'))
    async updateTag(@Body('updateTagInput') updateTagInput: UpdateTagInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateTagInput.id);
        return this.tagsService.update(updateTagInput.id, {...updateTagInput, image: result?.Key});
    }
}
