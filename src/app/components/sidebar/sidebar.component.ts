import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CompanyDetails} from "../company/company";
import {AppService} from "src/app/pages/login/_services/app.service"
import {AppAuthService} from "src/app/pages/login/_services/app-auth.service"
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    requiredRole?: string;
    dynamicPath?: boolean;
    requiresId?: boolean;

}
export const ROUTES: RouteInfo[] = [
    { path: '/AllJobs', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/create-candidate',
        title: 'create profile',
        icon:'ni-single-02 text-blue',
        requiredRole: 'CANDIDATE',
        class: '' },
    { path: '/candidate', title: 'Profile',  icon:'ni-single-02 text-yellow', class: '' ,requiredRole: 'CANDIDATE',},
    { path: '/updatecandidate', title: 'Update Profile',  icon:'ni-circle-08 text-pink', class: '',requiredRole: 'CANDIDATE', },
    { path: '/createCompany', title: 'company',  icon:'ni-circle-08 text-pink', class: '' ,
        requiredRole: 'COMPANY'},
    {
        path: '/getCompany',
        title: 'company profile',
        icon:'ni-single-02 text-yellow',
        class: '' ,
        requiredRole: 'COMPANY',
    },
    {
        path: '/getAllUsers',
        title: 'Users List',
        icon:'ni-single-02 text-yellow',
        class: '' ,
        requiredRole: 'ADMIN',
    },
    {
        path: '/create-job',
        title: 'Post a job',
        icon: 'ni-bullet-list-67 text-red',
        class: '',
        requiredRole: 'COMPANY',
        requiresId: true
    },
    {
        path: '/getAlljobsCompany',
        title: 'Jobs List',
        icon:'ni-single-02 text-yellow',
        class: '',
        requiredRole: 'COMPANY',
        requiresId: true
    },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    companyDetails: CompanyDetails | null;
    companyId: string | null = null;
  public menuItems: any[];
  public isCollapsed = true;

    constructor(private router: Router,
                private appAuthService: AppAuthService,
                public appService: AppService
    ) { }
    public isLoggedIn() {
        return this.appAuthService.isLoggedIn();
    }

    ngOnInit() {
        this.companyId = localStorage.getItem('companyId');
        this.menuItems = ROUTES.filter(menuItem => {
            if (menuItem.requiredRole && !this.appService.roleMatch(menuItem.requiredRole)) {
                return false;
            }
            return true;
        })
            .map(menuItem => {
                if (menuItem.requiresId && this.companyId) {
                    return {
                        ...menuItem,
                        path: `${menuItem.path}/${this.companyId}`
                    };
                }
                return menuItem;
            });

        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }

    public logout() {
        this.appAuthService.clear();
        this.router.navigate(['/login']);
    }
}
