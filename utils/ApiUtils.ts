import { APIRequestContext } from "@playwright/test";
import ENV from "./env";

export default class API {
    private request: APIRequestContext;
    private headers: Record<string, string>;
    constructor(request: APIRequestContext) {
        this.request = request;
    }


    private createTokenHeader(tokenType?: string, token?: string): Record<string, string> {
        if (tokenType === "Bearer") {
            return this.headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        } else if (tokenType === "Cookie") {
            return this.headers = token ? { 'Cookie': `token=${token}` } : {};
        } else {
            return this.headers = {};
        }
    }

    /*
        private async makeRequestWithCookieToken(endpoint: string, method: string, reqBody?: object, token?: string) {
            const headers: Record<string, string> = token ? { 'Cookie': `token=${token}` } : {};
            const requestOptions = {
                headers,
                data: reqBody,
            };
            const res = await this.request[method](endpoint, requestOptions);
            return res;
        }
    
        private async makeRequestWithBearerToken(endpoint: string, method: string, reqBody?: object, token?: string) {
            const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
            const requestOptions = {
                headers,
                data: reqBody,
            };
            const res = await this.request[method](endpoint, requestOptions);
            return res;
        }
    */
    private async makeRequest(endpoint: string, method: string, params?:object, reqBody?: object, tokenType?: string, token?: string) {
        const headers = this.createTokenHeader(tokenType, token);
        console.log(headers);
        //console.log(ENV.BASE_URL);
        const requestOptions = {
            headers:headers,
            data: reqBody,
            params: params,
        };
        console.log(requestOptions);
        const res = await this.request[method](endpoint, requestOptions);
        console.log(await res.json());
        return res;
    }

    async postReq(endpoint: string, reqBody: object, tokenType?:string, token?: string) {
        return await this.makeRequest(endpoint, 'post', undefined, reqBody, tokenType, token);
    }

    async getReq(endpoint: string, params?: object, tokenType?:string, token?:string) {
        return await this.makeRequest(endpoint, 'get', params, undefined, tokenType, token);
    }

    async putReq(endpoint: string, reqBody: object, tokenType?:string, token?: string) {
        return await this.makeRequest(endpoint, 'put', undefined, reqBody, tokenType, token);
    }

    async patchReq(endpoint: string, reqBody: object, tokenType?:string, token?: string) {
        return await this.makeRequest(endpoint, 'put', undefined, reqBody, tokenType, token);
    }

    async deleteReq(endpoint: string, tokenType?:string, token?: string) {
        return await this.makeRequest(endpoint, 'delete', undefined, undefined, tokenType, token);
    }
}