import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NauczycieleComponent } from './nauczyciele.component';
import { NauczycieleDetailComponent } from './nauczyciele-detail.component';
import { NauczycielePopupComponent } from './nauczyciele-dialog.component';
import { NauczycieleDeletePopupComponent } from './nauczyciele-delete-dialog.component';

export const nauczycieleRoute: Routes = [
    {
        path: 'nauczyciele',
        component: NauczycieleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nauczycieles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nauczyciele/:id',
        component: NauczycieleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nauczycieles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nauczycielePopupRoute: Routes = [
    {
        path: 'nauczyciele-new',
        component: NauczycielePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nauczycieles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nauczyciele/:id/edit',
        component: NauczycielePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nauczycieles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nauczyciele/:id/delete',
        component: NauczycieleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nauczycieles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
