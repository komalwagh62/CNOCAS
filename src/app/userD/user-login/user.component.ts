// // import { Component } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-user',
// //   templateUrl: './user.component.html',
// //   styleUrls: ['./user.component.scss']
// // })
// // export class UserComponent {
// //   email: string = '';
// //   password: string = '';
// //   loginError: string = '';
// //   public showPassword: boolean = false;

// //   constructor(private http: HttpClient,private router: Router) {}

// //   login() {
// //     const credentials = { email: this.email, password: this.password };
// //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

// //     this.http.post<any>('http://localhost:3000/api/login', credentials, { headers })
// //         .subscribe(
// //             response => {
// //                 // If authentication is successful, navigate to home page
// //                 this.router.navigate(['/users-profile']);
// //             },
// //             error => {
// //                 console.error('Error during login:', error);
// //                 alert('Failed to login. Please try again.'); // Show error message to the user
// //             }
// //         );
// // }


// //   public togglePasswordVisibility(): void {
// //     this.showPassword = !this.showPassword;
// //   }  
// // }



import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../Server/api.service';
import { User } from '../../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  public showPassword: boolean = false;
  isAuthenticated: boolean = false;
  
  constructor(private router: Router,private apiservice: ApiService) {}


  // ============================================User Login=================================================
  // login() {
  //   const credentials = { email: this.email, password: this.password };
  //   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   let url = this.apiservice.baseUrl + '/user/login'
    
  //   this.apiservice.http.post<any>(url, credentials)
  //     .subscribe(
  //       response => {
  //         if (response.success) {

  //           this.router.navigate(['/users-profile']); // Navigate to user profile on successful login
  //         } else {
  //           alert('Invalid email or password. Please try again.');
  //         }
  //       },
  //       error => {
  //         console.error('Error during login:', error);
  //         alert('Failed to login. Please try again.'); // Show error message to the user
  //       }
  //     );
  // }


  login() {
    const credentials = { email: this.email, password: this.password };
    let url = this.apiservice.baseUrl + '/user/userLogin';

    this.apiservice.http.post<any>(url, credentials)
      .subscribe(
        response => {
          console.log(response)
          if (response.success) {
            // let {id,uname,address,phone_number,email,password} = response.user
            // this.apiservice.userData = new User(id,uname,address,phone_number,email,password)
            this.apiservice.token = response.jwttoken
            console.log(response.jwttoken)
            this.router.navigate(['/users-profile']);
            // this.isAuthenticated = true;

          
              
            
          } else {
            alert('Invalid email or password. Please try again.');
          }
        },
        error => {
          console.error('Error during login:', error);
          alert('Failed to login. Please try again.');
        }
      );
}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}




