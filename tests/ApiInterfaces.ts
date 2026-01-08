// ApiInterfaces.ts
export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
}

export interface ApiResult<T> {
    success: boolean;
    message: string;
    error: string;
    data: T;
}

export type ProductResponse = ApiResult<Product[]>;