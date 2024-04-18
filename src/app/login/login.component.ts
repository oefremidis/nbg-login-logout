import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public servive: AuthService, private router: Router) { }

  // succesful
  // data = {
  //   "email": "eve.holt@reqres.in",
  //   "password": "cityslicka"
  // }

  // unsuccesful
  data = {
    "email": "eve.holt@reqres.in",
  }


  login(){
    this.servive.login(this.data).subscribe({
      next: (result:any) => {
        if (result.token){
            this.router.navigateByUrl('home');
        }
      },
      error: err => alert(err)
    });
  }
}
