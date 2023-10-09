import {Component, OnInit} from '@angular/core';
import {AppService} from "src/app/pages/login/_services/app.service";
import {CandidateService} from "../candidate.service";
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})

export class CreateCandidateComponent implements OnInit {
  isUpdate: boolean = false;

  candidate: any = {
    userId: '',
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    birthDate: null,
    skills: [{name: '', level: ''}],
    languageLevel: [{language: '', level: ''}],
    experiences: [],
    educationHistory: []
  };
  selectedFile: File | undefined;
  levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  languages = ['ARABIC', 'ENGLISH', 'FRENCH', 'SPANISH', 'GERMAN', 'OTHER'];
  constructor(private appService: AppService, private candidateService: CandidateService, private toastr: ToastrService) {
    this.candidate = {
      userId: '',
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      birthDate: null,
      skills: [],
      languageLevel: [],
      experiences: [],
      educationHistory: []
    };
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.candidate.userId = userId;
    }
  }

  addSkill() {
    this.candidate.skills.push({name: '', level: ''});
  }

  removeSkill(index: number) {
    this.candidate.skills.splice(index, 1);
  }

  addLanguage() {
    this.candidate.languageLevel.push({language: '', level: ''});
  }

  removeLanguage(index: number) {
    this.candidate.languageLevel.splice(index, 1);
  }

  addEducation() {
    this.candidate.educationHistory.push({
      school: null,
      startDate: null,
      endDate: null,
      degree: null
    });
  }

  removeEducation(index: number) {
    if (index >= 0 && index < this.candidate.educationHistory.length) {
      this.candidate.educationHistory.splice(index, 1);
    }
  }

  addExperience() {
    this.candidate.experiences.push({
      companyName: '',
      poste: '',
      position: '',
      startDate: null,
      endDate: null,
      description: ''
    });
  }

  removeExperience(index: number) {
    this.candidate.experiences.splice(index, 1);
  }

  getSkillsMap(): { [key: string]: string } {
    let skillsMap: { [key: string]: string } = {};
    for (let skill of this.candidate.skills) {
      skillsMap[skill.name] = skill.level;
    }
    return skillsMap;
  }

  getLanguageLevelMap(): { [key: string]: string } {
    let languageMap: { [key: string]: string } = {};
    for (let lang of this.candidate.languageLevel) {
      languageMap[lang.language] = lang.level;
    }
    return languageMap;
  }



  onSubmit() {

    const candidateToSend = {...this.candidate};
    candidateToSend.skills = this.getSkillsMap();
    candidateToSend.languageLevel = this.getLanguageLevelMap();
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile || '');
    console.log(candidateToSend);

    this.appService.createCandidate(candidateToSend)
        .subscribe(
            data => {
              console.log('Candidate created!', data);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your profile has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              this.toastr.success('Candidate successfully created!');

              if (data && data.id) {
                localStorage.setItem('id', data.id);
              }
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              console.error('Error creating candidate', error);
              this.toastr.error('Error creating candidate!');
            }
        );
  }
}
