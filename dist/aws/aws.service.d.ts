import { S3, SNS } from 'aws-sdk';
import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
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
    constructor();
    getUrl(url: string): string;
    createImage(file: any, Key?: string): Promise<S3.ManagedUpload.SendData>;
    removeImage(Key: string): void;
    invalidatationImage(Key: string): void;
    sendOtp(phoneNumber: string): Promise<"Sended" | import("aws-sdk/lib/request").PromiseResult<SNS.CreateSMSSandboxPhoneNumberResult, import("aws-sdk").AWSError>>;
    verifyOtp(phoneNumber: string, otp: string): Promise<"Verified" | import("aws-sdk/lib/request").PromiseResult<SNS.VerifySMSSandboxPhoneNumberResult, import("aws-sdk").AWSError>>;
    message(): Promise<import("aws-sdk/lib/request").PromiseResult<SNS.PublishResponse, import("aws-sdk").AWSError>>;
}
