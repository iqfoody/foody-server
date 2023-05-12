import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
    public firebase: firebase.app.App;

    constructor(){
        this.firebase = firebase.initializeApp({
            credential: firebase.credential.cert({
                projectId: process.env.GOOGLE_PROJECT_ID,
                clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
                privateKey: process.env.GOOGLE_PRIVATE_KEY
            })
        });

    }

    async sendPrivate(token: string, payload: any, data: any){
        await this.firebase.messaging().send({
            token,
            data,
            notification: {
                title: "Foody",
                body: "test foody",
                imageUrl: ""
            },
            android:{ priority: "high", ttl: 1000 * 60 * 60 * 24 },
            webpush: {},
            apns: {}
        })
    }

    async sendPublic(data: any){
        await this.firebase.messaging().send({
            topic: "Foody",
            data,
            notification: {
                title: "Foody",
                body: "test foody",
                imageUrl: "https://cdn.iqfoody.com/1683392521418-64568809a641a9345d3a7919-download%20(1).jpeg?Expires=1683666000&Key-Pair-Id=KK6T1K98RXKCE&Signature=rEzRmkRvFezwVYwTjZuPLut0zHggNpFIPCvX8NrGH9-G~j8gJ5iUgIa3krHu6eU74uEg-SY5uGA51vNDpUjzBkHw281Yn-OLkgz0sOo~K6NBuufrd8z--Btr0XFJ1d2HGGmSRK8iKDmaWucmj4wdp7WpcjIVGfi-3eS9nba9IAUl4fJKAyzI~SC4ByXpwpE58vXxM8kkJ0SWXD8AjM6qe6zpqR-qf1BpQ1WU19vBRYnmP4qknkKAlCFZiYcp7FXvUPXkmMQBsqe9VmIyUZ7suDw7u1TI8klwXS1OXjVEly3GinlB06CnkBlCDaJHiKyQYpjAdooU25Z47RFCQm1Qew__",
            },
            android:{ 
                priority: "high", 
                ttl: 1000 * 60 * 60 * 24,
                notification: {
                    icon: "",
                }
            },
            webpush: {
                notification: {
                    icon: "foodyIcone"
                }
            },
            apns: {
                payload: {
                    aps: {
                        
                    }
                }
            }
        })
    }
}