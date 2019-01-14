import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
    private apiService: ApiService;
    private token: string;

    constructor(private lss: LocalStorageService) {}

    public async init(
        apiService: ApiService
    ) {
        this.token = this.lss.getItem('token');
        this.apiService = apiService;
        this.updateToken();
    }

    public getToken(): string {
        return this.token || null;
    }

    public setToken(token: string): void {
        this.token = token;
        this.lss.setItem('token', token);
    }

    public async updateToken() {
        const responce = await this.apiService.get('/user/info');
        if (responce.code === 200) {
            this.setToken(responce.data.token);
        }
    }
}
