export type JwtPayload = {
    email: string;
    id: number;
};
export declare const GetCurrentUserId: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
