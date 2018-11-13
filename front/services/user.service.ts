import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UserService {
    constructor(private lss: LocalStorageService) {}

    private token: string;

    public async init() {
        this.token = this.lss.getItem('token');
    }

    public getToken(): string {
        return this.token || null;
    }

    public setToken(token: string): void {
        this.token = token;
        this.lss.setItem('token', token);
    }
}
