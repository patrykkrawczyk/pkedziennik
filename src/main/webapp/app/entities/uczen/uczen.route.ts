import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UczenComponent } from './uczen.component';
import { UczenDetailComponent } from './uczen-detail.component';
import { UczenPopupComponent } from './uczen-dialog.component';
import { UczenDeletePopupComponent } from './uczen-delete-dialog.component';

export const uczenRoute: Routes = [
    {
        path: 'uczen',
        component: UczenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Uczens'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'uczen/:id',
        component: UczenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Uczens'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const uczenPopupRoute: Routes = [
    {
        path: 'uczen-new',
        component: UczenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Uczens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'uczen/:id/edit',
        component: UczenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Uczens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'uczen/:id/delete',
        component: UczenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Uczens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
