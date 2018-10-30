import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
    constructor(private api: ApiService, private lss: LocalStorageService) {}

    private token: string;

    public async init() {
        this.token = this.lss.getItem('token');

        const responce = await this.api.get(
            'http://localhost:3000/api/user/auth'
        );

        console.log(responce);
    }

    public getToken(): string {
        return this.token || null;
    }
}
