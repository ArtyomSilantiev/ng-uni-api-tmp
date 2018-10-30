import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    public setItem(key, value): void {
        localStorage.setItem(key, value);
    }

    public getItem(key): any {
        return localStorage.getItem(key);
    }
}
