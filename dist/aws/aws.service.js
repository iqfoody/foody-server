"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const cloudfront_signer_1 = require("@aws-sdk/cloudfront-signer");
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_cloudfront_1 = require("@aws-sdk/client-cloudfront");
let AwsService = class AwsService {
    s3;
    cloudFront;
    bucketImages;
    errorParams;
    cloudFrontKeyID;
    cloudFrontPrivateKey;
    distributionId;
    imageTypes;
    constructor() {
        const region = process.env.AWS_BUCKET_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_LOCAL;
        const secretAccessKey = process.env.AWS_SECRET_KEY_LOCAL;
        this.imageTypes = [
            "image/jpg",
            "image/JPG",
            "image/png",
            "image/PNG",
            "image/jpeg",
            "image/JPEG",
            "image/webp",
            "image/WEBP"
        ];
        this.s3 = new client_s3_1.S3Client({
            credentials: { accessKeyId, secretAccessKey },
            region
        });
        this.cloudFront = new client_cloudfront_1.CloudFrontClient({
            credentials: { accessKeyId, secretAccessKey },
            region
        });
        this.bucketImages = process.env.AWS_BUCKET_IMAGES;
        this.cloudFrontKeyID = process.env.CLOUDFRONT_KEY_PAIR_ID;
        this.cloudFrontPrivateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
        this.distributionId = process.env.CLOUDFRONT_DISTRiBUTION_ID;
    }
    getUrl(url) {
        const result = (0, cloudfront_signer_1.getSignedUrl)({
            dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toDateString(),
            url: `${process.env.AWS_CLOUDFRONT_CDN}${url}`,
            privateKey: this.cloudFrontPrivateKey,
            keyPairId: this.cloudFrontKeyID,
        });
        const index = url.indexOf(`${process.env.AWS_CLOUDFRONT_CDN}`);
        if (index === 0)
            return url;
        return result;
    }
    async createImage(file, id) {
        if (!this.imageTypes.includes(file.mimetype))
            throw new common_1.BadRequestException("Invalide image extention");
        const buffer = await this.getReadStream(file);
        const Key = Date.now() + '-' + id + '-' + file.filename;
        const uploadParams = {
            Bucket: this.bucketImages,
            Body: buffer,
            Key
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        try {
            await this.s3.send(command);
            return { Key };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async createRestImage(file, id) {
        const Key = Date.now() + '-' + id + '-' + file.originalname;
        const uploadParams = {
            Bucket: this.bucketImages,
            Body: file.buffer,
            Key
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        try {
            await this.s3.send(command);
            return { Key };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async removeImage(Key) {
        const deleteParams = {
            Bucket: this.bucketImages,
            Key,
        };
        const command = new client_s3_1.DeleteObjectCommand(deleteParams);
        try {
            await this.invalidatationImage(Key);
            await this.s3.send(command);
            return;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async invalidatationImage(Key) {
        const invalidationParams = {
            DistributionId: this.distributionId,
            InvalidationBatch: {
                CallerReference: Key,
                Paths: {
                    Quantity: 1,
                    Items: [
                        "/" + Key
                    ]
                }
            }
        };
        const invalidationCommand = new client_cloudfront_1.CreateInvalidationCommand(invalidationParams);
        await this.cloudFront.send(invalidationCommand);
    }
    async getReadStream(file) {
        let buffers = [];
        return new Promise(async (resolve, reject) => (await file.createReadStream())
            .on("data", (buf) => buffers.push(buf))
            .on('end', () => resolve(Buffer.concat(buffers)))
            .on("error", (err) => reject(err)));
    }
};
AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AwsService);
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map