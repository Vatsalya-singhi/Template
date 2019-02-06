import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { FireauthService } from 'app/services/fireauth.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    /**
     * Constructor
     */
    constructor(public auth :FireauthService)
    {

    }
}
