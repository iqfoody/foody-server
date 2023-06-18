import { SearchesService } from './searches.service';
import { SearchInput } from 'src/constants/searchQuery.input';
import { UsersService } from 'src/users/users.service';
export declare class SearchesResolver {
    private readonly searchesService;
    private readonly usersService;
    constructor(searchesService: SearchesService, usersService: UsersService);
    findAll(searchQuery: SearchInput): Promise<{
        data: (import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findOne(id: number): string;
}
