import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { constants } from 'src/constants/enums';

@Injectable()
export class AwsService {
  public s3: S3;
  public cloudFront: CloudFrontClient;
  public bucketImages: string;
  public errorParams: {Key: string, Bucket: string};
  public cloudFrontKeyID: string;
  public cloudFrontPrivateKey: string;
  public distributionId: string;
  
  constructor () {
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY_LOCAL
    const secretAccessKey = process.env.AWS_SECRET_KEY_LOCAL
    
    this.s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey
    });

    this.cloudFront = new CloudFrontClient({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region
    })

    this.bucketImages = process.env.AWS_BUCKET_IMAGES;
    this.errorParams = {
      Key: 'Error-404',
      Bucket: this.bucketImages
    }
    this.cloudFrontKeyID = process.env.CLOUDFRONT_KEY_PAIR_ID;
    this.cloudFrontPrivateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
    this.distributionId = process.env.CLOUDFRONT_DISTRiBUTION_ID;
  }

  getUrl(url: string){ 
    const result = getSignedUrl({
      dateLessThan: new Date(Date.now() + 1000*60*60*24).toDateString(),
      url: `${process.env.AWS_CLOUDFRONT_CDN}${url}`,
      privateKey: this.cloudFrontPrivateKey,
      keyPairId: this.cloudFrontKeyID,
    });
    const index = url.indexOf(`${process.env.AWS_CLOUDFRONT_CDN}`);
    if(index === 0) return url;
    return result;
  }

  createImage(file: any, Key?: string) {
    const uploadParams = {
        Bucket: this.bucketImages,
        Body: file.buffer,
        Key: Date.now()+'-'+Key+'-'+file.originalname
    }
    return this.s3.upload(uploadParams).promise();
  }

  removeImage(Key: string) {
    const deleteParams = {
      Key,
      Bucket: this.bucketImages
    };
    this.invalidatationImage(Key);
    this.s3.deleteObject(deleteParams).send();
   return;
  }

  invalidatationImage(Key: string) {
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
    }
    const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
    this.cloudFront.send(invalidationCommand);
  }

}
