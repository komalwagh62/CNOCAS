// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { PhoneNumberUtil } from 'google-libphonenumber';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-student-crud',
//   templateUrl: './user-register.component.html',
//   styleUrls: ['./user-register.component.css']
// })
// export class USerRegisterComponent implements OnInit {

//   userForm!: FormGroup | any;
//   userArray : any[] = [];
//   isResultLoaded = false;
//   isUpdateFormActive = false;
//   uname: string ="";
//   phone_number: string ="";
//   address: string ="";
//   email: string ="";
//   password: string ="";
//   currentUserID = "";


//   generatedOTP: string | undefined;
//   otpSent: boolean = false;
//   phoneNumberUtil = PhoneNumberUtil.getInstance();
//   public showPassword: boolean = false;

//   constructor(
//     private http: HttpClient,
//     private formBuilder: FormBuilder,
//     private toastr: ToastrService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       uname: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       address: ['', Validators.required],
//       phone_number: ['', Validators.required], // Change here
//       password: ['', [Validators.required, Validators.minLength(7)]]
//     });

//     this.getAllUser();
//   }
//   public togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }
//   onPhoneNumberChange(): void {
//   const phoneNumberControl = this.userForm.get('phone_number');
//   let phoneNumberString: string = phoneNumberControl.value.trim();
//   const countryCode = 'IN'; // Country code for India

//   // Check if the phone number field is not empty and is valid
//   if (phoneNumberControl && phoneNumberControl.valid) {
//     // Remove spaces, hyphens, and plus sign if present
//     phoneNumberString = phoneNumberString.replace(/[\s-+]/g, '');

//     // Validate Indian phone numbers with a regular expression
//     const isValid = /^()?[789]\d{9}$/.test(phoneNumberString);

//     if (isValid) {
//       console.log('Phone number is valid:', phoneNumberString);
//       // Perform OTP generation here
//       this.generateOTP();
//       this.otpSent = true;
//     } else {
//       alert('Invalid Phone Number');
//       this.otpSent = false;
//     }
//   } else {
//     this.otpSent = false;
//   }

//   // Set the generatedOTP variable here
//   this.generatedOTP = ''; // Reset the generated OTP
// }

//   generateOTP() {
//     // Generate a random 4-digit OTP
//     this.generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
//     // Display OTP in an alert
//     alert('Generated OTP: ' + this.generatedOTP);
//   }

//   validateOTP(): void {
//     // Get the entered OTP from the form
//     const enteredOTP = this.userForm.get('otp')?.value;

//     // Check if the entered OTP matches the generated OTP
//     if (enteredOTP === this.generatedOTP) {
//       this.toastr.success('OTP verification successful', 'Success');
//     } else {
//        alert('Invalid OTP. Please try again');
//     }
// }


  // getAllUser() {
  //   this.http.get<any[]>("http://localhost:3000/api/users/")
  //     .subscribe(
  //       (resultData: any) => {
  //         this.isResultLoaded = true;
  //         this.userArray = resultData.data;
  //       },
  //       (error: any) => {
  //         console.error("Error fetching user data:", error);
  //       }
  //     );
  // }

//   register() {
//     if (this.userForm.valid) {
//       this.http.post("http://localhost:3000/api/users/add", {
//         uname: this.userForm.value.uname,
//         phone_number: this.userForm.value.phone_number,
//         address: this.userForm.value.address,
//         email: this.userForm.value.email,
//         password: this.userForm.value.password
//       }).subscribe(
//         (resultData: any) => {
//           console.log("User registration response:", resultData);
//           alert("User registered successfully");
//           this.getAllUser();
//           this.userForm.reset();
//         },
//         (error: any) => {
//           console.error("Error registering user:", error);
//           if (error.status === 401) {
//             alert("Unauthorized: Please check your credentials and try again.");
//           } else if (error.status === 403) {
//             alert("Forbidden: You don't have permission to access this resource.");
//           } else if (error.status === 404) {
//             alert("Not Found: The requested resource was not found on the server.");
//           } else {
//             alert("Failed to register user. Please try again later.");
//           }
//         }
//       );
//     } else {
//       alert("Please fill in all the required fields correctly before registering.");
//     }
//   }



//   setUpdate(data: any) {
//     this.userForm.patchValue({
//         uname: data.uname,
//         phone_number: data.phone_number,
//         address: data.address,
//         email: data.email,
//         password: data.password
//     });
//     this.currentUserID = data.id;
// }

// save() {
//     if (this.currentUserID === '') {
//         this.register();
//     } 
//     // else {
//     //     this.UpdateRecords();
//     // }
// }




// // UpdateRecords() {
// //   // Ensure that currentUserID is set properly
// //   console.log("Current User ID:", this.currentUserID);

// //   // Get form values
// //   this.uname = this.userForm.value.uname;
// //   this.phone_number = this.userForm.value.phone_number;
// //   this.address = this.userForm.value.address;
// //   this.email = this.userForm.value.email;
// //   this.password = this.userForm.value.password;

// //   // Construct the body data
// //   const bodyData = {
// //     uname: this.uname,
// //     phone_number: this.phone_number,
// //     address: this.address,
// //     email: this.email,
// //     password: this.password
// //   };

// //   const userID = this.currentUserID;

// //   // Update the PUT request URL to include the user ID
// //   this.http.put(`http://localhost:3000/api/users/update/${userID}`, bodyData)
// //     .subscribe(
// //       (resultData: any) => {
// //         console.log(resultData);
// //         alert("User Updated Successfully");
// //         this.getAllUser();
// //       },
// //       (error: any) => {
// //         console.error("Error updating user:", error);
// //         alert("Failed to update user");
// //       }
// //     );
// // }


//   setDelete(data: any)
//   {
//     this.http.delete("http://localhost:3000/api/users/delete"+ "/"+ data.id).subscribe((resultData: any)=>
//     {
//         console.log(resultData);
//         alert("user Deletedddd")
//         this.getAllUser();
//     });
//   }
// }






import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class USerRegisterComponent implements OnInit {

  userForm!: FormGroup;
  otpSent: boolean = false;
  generatedOTP: string | undefined;
  isResultLoaded: boolean = false; // Initialize isResultLoaded
  userArray: any[] = []; // Initialize userArray as an array
  showPassword: boolean = false; // Initialize showPassword

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]],
      otp: ['', [Validators.required,Validators.pattern(/^\d{4}$/)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onPhoneNumberChange(): void {
    const phoneNumberControl = this.userForm.get('phone_number');
    if (phoneNumberControl && phoneNumberControl.valid && phoneNumberControl.value.length === 10) {
      // Generate OTP and enable OTP field
      this.generateOTP();
      this.otpSent = true;
    } else {
      // Show error message for invalid mobile number
      alert('Invalid mobile number. Please enter a 10-digit number.');
      this.otpSent = false;
    }
  }
  

  generateOTP(): void {
    // Generate a random 4-digit OTP
    this.generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    // Display OTP in an alert
    alert('Generated OTP: ' + this.generatedOTP);
  }

  validateOTP(): void {
    const enteredOTP = this.userForm.get('otp')?.value;
    if (enteredOTP === this.generatedOTP) {
      this.toastr.success('OTP verification successful', 'Success');
      // Proceed with user registration
      // this.register();
    } else {
      this.toastr.error('Invalid OTP. Please try again', 'Error');
    }
  }

  // register() {
  //   if (this.userForm.valid) {
  //     // Check if the email or password already exists
  //     this.http.post("http://localhost:3000/api/users/check", {
  //       email: this.userForm.value.email,
  //       password: this.userForm.value.password
  //     }).subscribe(
  //       (resultData: any) => {
  //         // If email or password doesn't exist, proceed with user registration
  //         if (!resultData.exists) {
  //           this.createUser();
  //         } else {
  //           // If email or password already exists, display error message
  //           alert("Email or password already exists. Please choose a different one.");
  //         }
  //       },
  //       (error: any) => {
  //         console.error("Error checking email or password:", error);
  //         alert("Failed to check email or password. Please try again later.");
  //       }
  //     );
  //   } else {
  //     alert("Please fill in all the required fields correctly before registering.");
  //   }
  // }
  
  createUser() {
    // Send registration data to the server
    this.http.post("http://localhost:3001/api/user/createUser", {
      uname: this.userForm.value.uname,
      phone_number: this.userForm.value.phone_number,
      address: this.userForm.value.address,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    }).subscribe(
      (resultData: any) => {

        console.log("User registration response:", resultData);
        alert("User registered successfully");
        
      },
      (error: any) => {
          console.error("Error registering user:", error);
          // if (error.status === 409) {
            alert(error.error.message);
          
        }
    );
  }
  

 
}
