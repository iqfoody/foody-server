"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphqlUploadExpress_1 = __importDefault(require("./Graphql/graphqlUploadExpress"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: true,
        cors: {
            credentials: true,
            origin: ['http://localhost:3000', 'https://admin.iqfoody.com'],
            optionsSuccessStatus: 200
        },
    });
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    dotenv_1.default.config();
    app.use((0, graphqlUploadExpress_1.default)());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map