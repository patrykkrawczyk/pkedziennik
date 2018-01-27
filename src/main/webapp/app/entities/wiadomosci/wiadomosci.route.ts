import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WiadomosciComponent } from './wiadomosci.component';
import { WiadomosciDetailComponent } from './wiadomosci-detail.component';
import { WiadomosciPopupComponent } from './wiadomosci-dialog.component';
import { WiadomosciDeletePopupComponent } from './wiadomosci-delete-dialog.component';

export const wiadomosciRoute: Routes = [
    {
        path: 'wiadomosci',
        component: WiadomosciComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wiadomoscis'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'wiadomosci/:id',
        component: WiadomosciDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wiadomoscis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wiadomosciPopupRoute: Routes = [
    {
        path: 'wiadomosci-new',
        component: WiadomosciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wiadomoscis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wiadomosci/:id/edit',
        component: WiadomosciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wiadomoscis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wiadomosci/:id/delete',
        component: WiadomosciDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wiadomoscis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
