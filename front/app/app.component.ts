import { Injectable, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';

@Injectable()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ng-cli-universal';

    constructor(
        private userService: UserService,
        private api: ApiService
    ) {}

    async ngOnInit() {
        console.log('app init');

        this.userService.init();

        this.api.setDefaultApiInstanceUrl('http://localhost:3000/api');

        const responce = await this.api.get('/user/info');

        if (responce.code === 200) {
            this.userService.setToken(responce.data.token);
        }
    }
}
