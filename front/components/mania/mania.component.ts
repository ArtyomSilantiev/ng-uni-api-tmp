import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mania',
    templateUrl: './mania.component.html',
    styleUrls: ['./mania.component.scss']
})
export class ManiaComponent implements OnInit {
    private res: number;

    constructor() {}

    ngOnInit(): void {
        this.res = Number(localStorage.getItem('mania.res')) || 0;
    }

    private moreRes(): void {
        this.res += 10;
        localStorage.setItem('mania.res', String(this.res));
    }
}
