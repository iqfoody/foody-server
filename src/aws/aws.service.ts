import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { S3, SNS } from 'aws-sdk';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

@Injectable()
export class AwsService {
  public s3: S3;
  public sns: SNS;
  public cloudFront: CloudFrontClient;
  public bucketImages: string;
  public errorParams: {Key: string, Bucket: string};
  public cloudFrontKeyID: string;
  public cloudFrontPrivateKey: string;
  public distributionId: string;
  public otps: {phoneNumber: string, otp: string}[];
  
  constructor () {
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY_LOCAL
    const secretAccessKey = process.env.AWS_SECRET_KEY_LOCAL

    this.otps = [];
    
    this.s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey
    });

    this.sns = new SNS({
      region,
      accessKeyId,
      secretAccessKey
    })

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

//* this under testing, isn't completed...
  async sendOtp(phoneNumber: string){
    const challengeAnswer = Math.random().toString(10).substring(2, 8);
    const options = {
      Message: "Your foody account OTP: " + challengeAnswer,
      PhoneNumber: phoneNumber,
    }
    const listPhones = await this.sns.listSMSSandboxPhoneNumbers().promise();
    const list = listPhones?.PhoneNumbers?.reduce((prev, current) => [...prev, current?.PhoneNumber], []);
    if(list?.includes(phoneNumber)){
      const list = this.otps.find(ot => ot.phoneNumber === phoneNumber);
      if(list) return "Sended";
      this.otps.push({phoneNumber, otp: challengeAnswer});
      console.log(this.otps);
      return this.sns.publish(options, (err, data) => {
        if(err) return err
        if(data) return "Sended";
      }).promise();
    } else {
      return this.sns.createSMSSandboxPhoneNumber({PhoneNumber: phoneNumber}).promise();
    }
    //return this.sns.publish(options).promise();
  }

  async verifyOtp(phoneNumber: string, otp: string){
    const listPhones = await this.sns.listSMSSandboxPhoneNumbers().promise();
    const list = listPhones?.PhoneNumbers?.reduce((prev, current) => [...prev, current?.PhoneNumber], []);
    if(list?.includes(phoneNumber)){
      const prevOtp = this.otps?.find(ot => ot.otp === otp);
      if(prevOtp){ 
        this.otps = this.otps.filter(ot => ot.phoneNumber !== phoneNumber);
        return "Verified";
      } else throw new UnauthorizedException("Access Denied");
    } else {
      const result = await this.sns.verifySMSSandboxPhoneNumber({PhoneNumber: phoneNumber, OneTimePassword: `${otp}`}, (err, data) => {
        if(err) throw new UnauthorizedException("Access Denied")
        if(data) return "Verified";
      }).promise();
      return result

    }
  }

  async message(){
    const options = {
      Message: "Hi hassan, how are you?",
      PhoneNumber: "+9647714103179",
    }
    return this.sns.publish(options).promise();
  }

}

//  MessageStructuer: 'string',
//       MessageAttributes: {
//         'AWS. SNS. SMS. SenderID': {
//         DataType: 'String',
//         StringValue: 'AMPLIFY',
//         },
//         'AWS. SNS. SMS. SMSType': {
//         DataType: 'String',
//         StringValue:
//         'Transactional',
//         }
//       }