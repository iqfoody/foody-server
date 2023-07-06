import { S3, SNS } from 'aws-sdk';
import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import Upload from 'src/constants/Upload';
export declare class AwsService {
    s3: S3;
    sns: SNS;
    cloudFront: CloudFrontClient;
    bucketImages: string;
    errorParams: {
        Key: string;
        Bucket: string;
    };
    cloudFrontKeyID: string;
    cloudFrontPrivateKey: string;
    distributionId: string;
    otps: {
        phoneNumber: string;
        otp: string;
    }[];
    imageTypes: string[];
    constructor();
    getUrl(url: string): string;
    createImage(file: Upload, Key: string): Promise<S3.ManagedUpload.SendData>;
    createRestImage(file: any, Key: string): Promise<S3.ManagedUpload.SendData>;
    removeImage(Key: string): void;
    invalidatationImage(Key: string): void;
}
