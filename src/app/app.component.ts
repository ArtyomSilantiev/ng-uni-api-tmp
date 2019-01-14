import { Injectable, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';

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
    ) {
        console.log('app init');
        api.setDefaultApiInstanceUrl('/api');
        userService.init(api);
    }

    async ngOnInit() {
    }
}
