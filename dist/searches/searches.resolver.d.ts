import { SearchesService } from './searches.service';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
export declare class SearchesResolver {
    private readonly searchesService;
    constructor(searchesService: SearchesService);
    createSearch(createSearchInput: CreateSearchInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateSearch(updateSearchInput: UpdateSearchInput): string;
    removeSearch(id: number): string;
}
