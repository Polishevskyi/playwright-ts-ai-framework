import type { APIRequestContext } from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResponse = {
    status: number;
    body: unknown;
};

export type RequestOptions = {
    body?: unknown;
    token?: string;
};

// body stays `unknown` so every response has to go through a schema before use
export class ApiClient {
    constructor(
        private readonly request: APIRequestContext,
        private readonly baseUrl: string
    ) {}

    async send(
        method: HttpMethod,
        path: string,
        options: RequestOptions = {}
    ): Promise<ApiResponse> {
        const response = await this.request.fetch(`${this.baseUrl}${path}`, {
            method,
            data: options.body,
            headers: {
                Accept: 'application/json',
                ...(options.token && { Authorization: `Bearer ${options.token}` }),
            },
        });

        const isJson = (response.headers()['content-type'] ?? '').includes('application/json');
        const body: unknown = isJson ? await response.json() : await response.text();

        return { status: response.status(), body };
    }

    async get(path: string, options?: RequestOptions): Promise<ApiResponse> {
        return this.send('GET', path, options);
    }

    async post(path: string, options?: RequestOptions): Promise<ApiResponse> {
        return this.send('POST', path, options);
    }

    async put(path: string, options?: RequestOptions): Promise<ApiResponse> {
        return this.send('PUT', path, options);
    }

    async patch(path: string, options?: RequestOptions): Promise<ApiResponse> {
        return this.send('PATCH', path, options);
    }

    async delete(path: string, options?: RequestOptions): Promise<ApiResponse> {
        return this.send('DELETE', path, options);
    }
}
