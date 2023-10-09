import { Component, OnInit } from '@angular/core';
import { Candidate, Experience, Education, Language, Level } from '../model';
import { ToastrService } from 'ngx-toastr';
import {CandidateService} from "../candidate.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-candidate',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.css']
})
export class UpdateCandidateComponent implements OnInit {

  candidate: any = {
    id: 0,
    userId: 0,
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    birthDate: new Date(),
    skills: [{name: '', level: ''}],
    languageLevel: [{language: '', level: ''}],
    experiences: [],
    educationHistory: []
  };

  languages = Object.values(Language);
  levels = Object.values(Level);

  constructor(
      private candidateService: CandidateService,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idStr = localStorage.getItem('id');
    if (idStr) {
      const id = Number(idStr);
      this.candidateService.getCandidateById(id)
          .subscribe(candidate => {
                console.log("API Response:", candidate);
                this.candidate = candidate;
              },
              error => {
                console.error("Error fetching candidate:", error);
              });
    }
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

  addExperience() {
    const newExp: Experience = {
      id: 0,
      companyName: '',
      poste: '',
      position: '',
      startDate: null,
      endDate: null,
      description: ''
    };
    this.candidate.experiences.push(newExp);
  }

  removeExperience(index: number) {
    this.candidate.experiences.splice(index, 1);
  }

  addEducation() {
    const newEdu: Education = {
      id: 0,
      school: '',
      startDate: null,
      endDate: null,
      degree: ''
    };
    this.candidate.educationHistory.push(newEdu);
  }

  removeEducation(index: number) {
    this.candidate.educationHistory.splice(index, 1);
  }

  onSubmit(): void {
    const candidateToSend = {...this.candidate};
    candidateToSend.skills = this.getSkillsMap();
    candidateToSend.languageLevel = this.getLanguageLevelMap();

    this.candidateService.updateCandidate(candidateToSend).subscribe(
        data => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.toastr.success('Candidate successfully updated!');
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          this.toastr.error('Error updating candidate!');
        }
    );
  }
}
