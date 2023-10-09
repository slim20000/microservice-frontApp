import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {CandidateComponent} from "../../components/candidat/candidat.component";
import {CreateCandidateComponent} from "../../components/candidat/create-candidate/create-candidate.component";
import {UpdateCandidateComponent} from "../../components/candidat/candidate-update/candidate-update.component";
import {AuthGuard} from "src/app/pages/login/_auth/auth.guard";
import {CompanyComponent} from "../../components/company/company.component";
import {AdminComponent} from "../../components/admin/admin.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'candidate', component: CandidateComponent , canActivate: [AuthGuard], data:{role:'CANDIDATE'} },
    { path: 'create-candidate', component: CreateCandidateComponent , canActivate: [AuthGuard], data:{role:'CANDIDATE'} },
    { path: 'updatecandidate', component: UpdateCandidateComponent },
    { path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data:{role:'COMPANY'} },
    { path: 'getAllUsers', component: AdminComponent, canActivate: [AuthGuard], data:{role:'ADMIN'} },

];
