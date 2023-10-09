import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CandidateComponent} from "../../components/candidat/candidat.component";
import {UpdateCandidateComponent} from "../../components/candidat/candidate-update/candidate-update.component";
import {CreateCandidateComponent} from "../../components/candidat/create-candidate/create-candidate.component";
import {FileUploadComponent} from "../../components/file-upload/file-upload.component";
import {PdfDownloadComponent} from "../../components/file-download/pdf-download/pdf-download.component";
import {ComponentsModule} from "../../components/components.module";
import {ImageDownloadComponent} from "../../components/file-download/image-download/image-download.component";
import {CompanyComponent} from "../../components/company/company.component";
import {CompanyCreateComponent} from "../../components/company/company-create/company-create.component";
import {CompanyGetComponent} from "../../components/company/company-get/company-get.component";
import {JobGetComponent} from "../../components/company/job-get/job-get.component";
import {JobCreateComponent} from "../../components/company/job-create/job-create.component";
import {
  JobGetByCompanyIdComponent
} from "../../components/company/job-get-by-company-id/job-get-by-company-id.component";
import {FilterJobsPipe} from "../../components/company/company-get/filter-jobs.pipe";
import {
  JobApplicationListComponent
} from "../../components/application/job-application-list/job-application-list.component";
import {AdminComponent} from "../../components/admin/admin.component";

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule, ComponentsModule,
    NgbModule,
    ClipboardModule
  ],
  exports: [
    CandidateComponent,
    CreateCandidateComponent
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CandidateComponent,
    UpdateCandidateComponent,
    CreateCandidateComponent,
    FileUploadComponent,
    ImageDownloadComponent,
    PdfDownloadComponent,
    CompanyComponent,
    CompanyCreateComponent,
    CompanyGetComponent,
    JobGetComponent,
    JobCreateComponent,
    JobGetByCompanyIdComponent,
    FilterJobsPipe,
    JobApplicationListComponent,
    AdminComponent,

  ]
})

export class AdminLayoutModule {
}
