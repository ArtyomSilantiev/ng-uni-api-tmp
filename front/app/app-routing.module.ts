import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManiaComponent } from '../components/mania/mania.component';
import { UserService } from '../services/user.service';

const routes: Routes = [
    {
        path: '',
        component: ManiaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [ManiaComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}
