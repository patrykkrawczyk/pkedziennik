import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalaComponent } from './sala.component';
import { SalaDetailComponent } from './sala-detail.component';
import { SalaPopupComponent } from './sala-dialog.component';
import { SalaDeletePopupComponent } from './sala-delete-dialog.component';

export const salaRoute: Routes = [
    {
        path: 'sala',
        component: SalaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sala/:id',
        component: SalaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salaPopupRoute: Routes = [
    {
        path: 'sala-new',
        component: SalaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sala/:id/edit',
        component: SalaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sala/:id/delete',
        component: SalaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
