import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ZasobyComponent } from './zasoby.component';
import { ZasobyDetailComponent } from './zasoby-detail.component';
import { ZasobyPopupComponent } from './zasoby-dialog.component';
import { ZasobyDeletePopupComponent } from './zasoby-delete-dialog.component';

export const zasobyRoute: Routes = [
    {
        path: 'zasoby',
        component: ZasobyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Zasobies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'zasoby/:id',
        component: ZasobyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Zasobies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zasobyPopupRoute: Routes = [
    {
        path: 'zasoby-new',
        component: ZasobyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Zasobies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'zasoby/:id/edit',
        component: ZasobyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Zasobies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'zasoby/:id/delete',
        component: ZasobyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Zasobies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
