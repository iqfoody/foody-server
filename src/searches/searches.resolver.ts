import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SearchesService } from './searches.service';
import { Search } from './entities/search.entity';
import { SearchInput } from 'src/constants/searchQuery.input';
import { User } from 'src/users/entities/user.entity';
import { Actions } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersResponse } from 'src/users/entities/usersResponse.entity';

@UseGuards(AccessAuthGuard)
@Resolver(() => Search)
export class SearchesResolver {
  constructor(
    private readonly searchesService: SearchesService,
    private readonly usersService: UsersService,
    ) {}

  @Query(() => UsersResponse, { name: 'searchUsers' })
  @CheckAbilities({actions: Actions.Search, subject: User})
  findAll(@Args("searchQuery") searchQuery: SearchInput) {
    return this.usersService.search(searchQuery);
  }

  @Query(() => Search, { name: 'search' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.searchesService.findOne(id);
  }

}
