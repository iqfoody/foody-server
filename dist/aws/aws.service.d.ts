/// <reference types="node" />
import { S3Client } from "@aws-sdk/client-s3";
import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import Upload from 'src/constants/Upload';
export declare class AwsService {
    s3: S3Client;
    cloudFront: CloudFrontClient;
    bucketImages: string;
    errorParams: {
        Key: string;
        Bucket: string;
    };
    cloudFrontKeyID: string;
    cloudFrontPrivateKey: string;
    distributionId: string;
    imageTypes: string[];
    constructor();
    getUrl(url: string): string;
    createImage(file: Upload, id: string): Promise<{
        Key: string;
    }>;
    createRestImage(file: any, id: string): Promise<{
        Key: string;
    }>;
    removeImage(Key: string): Promise<void>;
    invalidatationImage(Key: string): Promise<void>;
    getReadStream(file: Upload): Promise<Buffer>;
}
