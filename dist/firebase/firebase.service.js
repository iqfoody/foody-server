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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let FirebaseService = class FirebaseService {
    constructor() {
        this.firebase = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert({
                projectId: process.env.GOOGLE_PROJECT_ID,
                clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
                privateKey: process.env.GOOGLE_PRIVATE_KEY
            })
        });
    }
    async sendPrivate(token, payload, data) {
        await this.firebase.messaging().send({
            token,
            data,
            notification: {
                title: "Foody",
                body: "test foody",
                imageUrl: ""
            },
            android: { priority: "high", ttl: 1000 * 60 * 60 * 24 },
            webpush: {},
            apns: {}
        });
    }
    async sendPublic(data) {
        await this.firebase.messaging().send({
            topic: "Foody",
            data,
            notification: {
                title: "Foody",
                body: "test foody",
                imageUrl: "https://cdn.iqfoody.com/1683392521418-64568809a641a9345d3a7919-download%20(1).jpeg?Expires=1683666000&Key-Pair-Id=KK6T1K98RXKCE&Signature=rEzRmkRvFezwVYwTjZuPLut0zHggNpFIPCvX8NrGH9-G~j8gJ5iUgIa3krHu6eU74uEg-SY5uGA51vNDpUjzBkHw281Yn-OLkgz0sOo~K6NBuufrd8z--Btr0XFJ1d2HGGmSRK8iKDmaWucmj4wdp7WpcjIVGfi-3eS9nba9IAUl4fJKAyzI~SC4ByXpwpE58vXxM8kkJ0SWXD8AjM6qe6zpqR-qf1BpQ1WU19vBRYnmP4qknkKAlCFZiYcp7FXvUPXkmMQBsqe9VmIyUZ7suDw7u1TI8klwXS1OXjVEly3GinlB06CnkBlCDaJHiKyQYpjAdooU25Z47RFCQm1Qew__",
            },
            android: {
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
                    aps: {}
                }
            }
        });
    }
};
FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map