import { ExecutionContext } from "@nestjs/common";
declare const RefreshAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RefreshAuthGuard extends RefreshAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
