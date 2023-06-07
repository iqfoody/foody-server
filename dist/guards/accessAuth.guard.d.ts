import { ExecutionContext } from "@nestjs/common";
declare const AccessAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AccessAuthGuard extends AccessAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
