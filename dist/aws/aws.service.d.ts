import { S3 } from 'aws-sdk';
import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
export declare class AwsService {
    s3: S3;
    cloudFront: CloudFrontClient;
    bucketImages: string;
    errorParams: {
        Key: string;
        Bucket: string;
    };
    cloudFrontKeyID: string;
    cloudFrontPrivateKey: string;
    distributionId: string;
    constructor();
    getUrl(url: string): string;
    createImage(file: any, Key?: string): Promise<S3.ManagedUpload.SendData>;
    removeImage(Key: string): void;
    invalidatationImage(Key: string): void;
}
