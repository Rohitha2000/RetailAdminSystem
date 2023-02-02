import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginService } from '../service/admin-login.service';
import { Router } from '@angular/router';



// describe('LoginForm', () => {
//   let loginform: FormGroup;

//   beforeEach(() => {
//     loginform = new FormGroup({
//       username: new FormControl('', Validators.required),
//       password: new FormControl('', Validators.required)
//     });
//   });
//   it('should create a form with two controls (username and password)', () => {
//     expect(loginform.contains('username')).toBeTruthy();
//     expect(loginform.contains('password')).toBeTruthy();
//   });

//   it('should make the username control required', () => {
//     const usernameControl = loginform.get('username');

//     usernameControl.setValue('');

//     expect(usernameControl.valid).toBeFalsy();
//   });

//   it('should make the password control required', () => {
//     const passwordControl = loginform.get('password');

//     passwordControl.setValue('');

//     expect(passwordControl.valid).toBeFalsy();
//   });  
// });

// it('heloo',()=>{
//   expect('hello').toBe('hello')
// })
describe("A suite", ()=> {
  it("contains spec with an expectation", function() {
      expect(true).toBe(true);
  });
})
