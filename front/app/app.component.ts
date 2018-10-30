import { Injectable, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ng-cli-universal';

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        console.log('app init');
        this.userService.init();
    }
}
