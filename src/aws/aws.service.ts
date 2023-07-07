import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import Upload from 'src/constants/Upload';

@Injectable()
export class AwsService {
  public s3: S3Client;
  public cloudFront: CloudFrontClient;
  public bucketImages: string;
  public errorParams: {Key: string, Bucket: string};
  public cloudFrontKeyID: string;
  public cloudFrontPrivateKey: string;
  public distributionId: string;
  public imageTypes: string[];
  
  constructor () {
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY_PRODUCTION
    const secretAccessKey = process.env.AWS_SECRET_KEY_PRODUCTION

    this.imageTypes =[
      "image/jpg",
      "image/JPG",
      "image/png",
      "image/PNG",
      "image/jpeg",
      "image/JPEG",
      "image/webp",
      "image/WEBP"
    ];
    
    this.s3 = new S3Client({
      credentials:{ accessKeyId, secretAccessKey },
      region
    });

    this.cloudFront = new CloudFrontClient({
      credentials: { accessKeyId, secretAccessKey },
      region
    })

    this.bucketImages = process.env.AWS_BUCKET_IMAGES;
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

  async createImage(file: Upload, id: string) {
    if(!this.imageTypes.includes(file.mimetype)) throw new BadRequestException("Invalide image extention");
    const buffer = await this.getReadStream(file);
    const Key = Date.now()+'-'+id+'-'+file.filename;
    const uploadParams = {
        Bucket: this.bucketImages,
        Body: buffer,
        Key
    }
    const command = new PutObjectCommand(uploadParams);
    try {
      await this.s3.send(command);
      return {Key};
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createRestImage(file: any, id: string){
    const Key = Date.now()+'-'+id+'-'+file.originalname;
    const uploadParams = {
      Bucket: this.bucketImages,
      Body: file.buffer,
      Key
    }
    const command = new PutObjectCommand(uploadParams);
    try {
      await this.s3.send(command);
      return {Key};
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeImage(Key: string) {
    const deleteParams = {
      Bucket: this.bucketImages,
      Key,
    };
    const command = new DeleteObjectCommand(deleteParams);
    try {
      await this.s3.send(command);
      this.invalidatationImage(Key);
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
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

  async getReadStream(file: Upload): Promise<Buffer>{
    let buffers: Buffer[] = [];
    return new Promise(async (resolve, reject) => 
    (await file.createReadStream())
      .on("data", (buf) => buffers.push(buf))
      .on('end', () => resolve(Buffer.concat(buffers)))
      .on("error", (err)=> reject(err))
    )
  }

}