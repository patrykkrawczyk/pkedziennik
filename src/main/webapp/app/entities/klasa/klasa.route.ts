import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KlasaComponent } from './klasa.component';
import { KlasaDetailComponent } from './klasa-detail.component';
import { KlasaPopupComponent } from './klasa-dialog.component';
import { KlasaDeletePopupComponent } from './klasa-delete-dialog.component';

export const klasaRoute: Routes = [
    {
        path: 'klasa',
        component: KlasaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Klasas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'klasa/:id',
        component: KlasaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Klasas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const klasaPopupRoute: Routes = [
    {
        path: 'klasa-new',
        component: KlasaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Klasas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'klasa/:id/edit',
        component: KlasaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Klasas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'klasa/:id/delete',
        component: KlasaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Klasas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
