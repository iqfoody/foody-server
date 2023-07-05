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
const aws_sdk_1 = require("aws-sdk");
const client_cloudfront_1 = require("@aws-sdk/client-cloudfront");
const fs_1 = require("fs");
let AwsService = class AwsService {
    s3;
    sns;
    cloudFront;
    bucketImages;
    errorParams;
    cloudFrontKeyID;
    cloudFrontPrivateKey;
    distributionId;
    otps;
    imageTypes;
    constructor() {
        const region = process.env.AWS_BUCKET_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_LOCAL;
        const secretAccessKey = process.env.AWS_SECRET_KEY_LOCAL;
        this.otps = [];
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
        this.s3 = new aws_sdk_1.S3({
            region,
            accessKeyId,
            secretAccessKey
        });
        this.sns = new aws_sdk_1.SNS({
            region,
            accessKeyId,
            secretAccessKey
        });
        this.cloudFront = new client_cloudfront_1.CloudFrontClient({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            region
        });
        this.bucketImages = process.env.AWS_BUCKET_IMAGES;
        this.errorParams = {
            Key: 'Error-404',
            Bucket: this.bucketImages
        };
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
    async createImage(file, Key) {
        if (!this.imageTypes.includes(file.mimetype))
            throw new common_1.BadRequestException("Invalide image extention");
        const filename = file.filename;
        const path = `./src/uploads/${filename}`;
        const saved = await this.getReadStream(file, path);
        if (!saved)
            await this.getReadStream(file, path);
        const fileStraem = (0, fs_1.createReadStream)(path);
        const uploadParams = {
            Bucket: this.bucketImages,
            Body: fileStraem,
            Key: Date.now() + '-' + Key + '-' + filename
        };
        return this.s3.upload(uploadParams).promise();
    }
    createRestImage(file, Key) {
        const uploadParams = {
            Bucket: this.bucketImages,
            Body: file.buffer,
            Key: Date.now() + '-' + Key + '-' + file.originalname
        };
        return this.s3.upload(uploadParams).promise();
    }
    removeImage(Key) {
        const deleteParams = {
            Key,
            Bucket: this.bucketImages
        };
        this.invalidatationImage(Key);
        this.s3.deleteObject(deleteParams).send();
        return;
    }
    invalidatationImage(Key) {
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
        this.cloudFront.send(invalidationCommand);
    }
    async getReadStream(file, path) {
        return new Promise(async (resolve, reject) => (await file.createReadStream())
            .pipe((0, fs_1.createWriteStream)(path))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false)));
    }
    async sendOtp(phoneNumber) {
        const challengeAnswer = Math.random().toString(10).substring(2, 8);
        const options = {
            Message: "Your foody account OTP: " + challengeAnswer,
            PhoneNumber: phoneNumber,
        };
        const listPhones = await this.sns.listSMSSandboxPhoneNumbers().promise();
        const list = listPhones?.PhoneNumbers?.reduce((prev, current) => [...prev, current?.PhoneNumber], []);
        if (list?.includes(phoneNumber)) {
            const list = this.otps.find(ot => ot.phoneNumber === phoneNumber);
            if (list)
                return "Sended";
            this.otps.push({ phoneNumber, otp: challengeAnswer });
            console.log(this.otps);
            return this.sns.publish(options, (err, data) => {
                if (err)
                    return err;
                if (data)
                    return "Sended";
            }).promise();
        }
        else {
            return this.sns.createSMSSandboxPhoneNumber({ PhoneNumber: phoneNumber }).promise();
        }
    }
    async verifyOtp(phoneNumber, otp) {
        const listPhones = await this.sns.listSMSSandboxPhoneNumbers().promise();
        const list = listPhones?.PhoneNumbers?.reduce((prev, current) => [...prev, current?.PhoneNumber], []);
        if (list?.includes(phoneNumber)) {
            const prevOtp = this.otps?.find(ot => ot.otp === otp);
            if (prevOtp) {
                this.otps = this.otps.filter(ot => ot.phoneNumber !== phoneNumber);
                return "Verified";
            }
            else
                throw new common_1.UnauthorizedException("Access Denied");
        }
        else {
            const result = await this.sns.verifySMSSandboxPhoneNumber({ PhoneNumber: phoneNumber, OneTimePassword: `${otp}` }, (err, data) => {
                if (err)
                    throw new common_1.UnauthorizedException("Access Denied");
                if (data)
                    return "Verified";
            }).promise();
            return result;
        }
    }
    async message() {
        const options = {
            Message: "Hi hassan, how are you?",
            PhoneNumber: "+9647714103179",
        };
        return this.sns.publish(options).promise();
    }
};
AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AwsService);
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map