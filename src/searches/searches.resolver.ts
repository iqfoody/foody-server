import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SearchesService } from './searches.service';
import { Search } from './entities/search.entity';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';

@Resolver(() => Search)
export class SearchesResolver {
  constructor(private readonly searchesService: SearchesService) {}

  @Mutation(() => Search)
  createSearch(@Args('createSearchInput') createSearchInput: CreateSearchInput) {
    return this.searchesService.create(createSearchInput);
  }

  @Query(() => [Search], { name: 'searches' })
  findAll() {
    return this.searchesService.findAll();
  }

  @Query(() => Search, { name: 'search' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.searchesService.findOne(id);
  }

  @Mutation(() => Search)
  updateSearch(@Args('updateSearchInput') updateSearchInput: UpdateSearchInput) {
    return this.searchesService.update(updateSearchInput.id, updateSearchInput);
  }

  @Mutation(() => Search)
  removeSearch(@Args('id', { type: () => Int }) id: number) {
    return this.searchesService.remove(id);
  }
}
