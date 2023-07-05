"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Upload_1 = __importDefault(require("./Upload"));
const GraphQLUpload = new graphql_1.GraphQLScalarType({
    name: "Upload",
    description: "The `Upload` scalar type represents a file upload.",
    parseValue(value) {
        if (value instanceof Upload_1.default)
            return value.file;
        throw new graphql_1.GraphQLError("Upload value invalid.");
    },
    parseLiteral(node) {
        throw new graphql_1.GraphQLError("Upload literal unsupported.", { nodes: node });
    },
    serialize() {
        throw new graphql_1.GraphQLError("Upload serialization unsupported.");
    },
});
exports.default = GraphQLUpload;
//# sourceMappingURL=GraphQLUpload.js.map