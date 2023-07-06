import { Component,OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{


  name: string="";
  email: string="";
  password: string="";

  constructor( private http: HttpClient,private router: Router,private loginService:LoginService){}

  
  onSignupSubmit(){
    let signupData={
      "name":this.name,
      "email":this.email,
      "password":this.password
    }
    if(this.name==null|| this.email==null|| this.password==null || this.name=='' || this.email=='' || this.password=='') alert("Please fill the credentials");
    else{
      this.loginService.doSignup(signupData).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("signup successful");
      this.name='';
      this.email='';
      this.password='';
    })

    }
  }

  // onLoginSubmit(){
  //   let loginData={
  //     "email":this.email,
  //     "password":this.password
  //   }
  //   if(this.email==null || this.password==null || this.email=='' || this.password=='') console.log("Please fill the credentials");
  //   else{
  //     this.loginService.doLogin(loginData).subscribe((resultData:any)=>{
  //     const authenticationResponse = resultData;
  //     console.log(authenticationResponse);
  //     //localStorage.setItem('response',authenticationResponse);
  //     localStorage.setItem('token',authenticationResponse.jwtToken);
  //     localStorage.setItem('user',authenticationResponse.username);
  //     localStorage.setItem('userId',authenticationResponse.userId);
  //     this.router.navigate(['/home']);
  //   })

  //   }
    
  // }


  onLoginSubmit() {
    let loginData = {
      "email": this.email,
      "password": this.password
    };
  
    if (!this.email || !this.password || this.email === '' || this.password === '') {
      console.log("Please fill in the credentials");
    } else {
      this.loginService.doLogin(loginData).subscribe(
        {
          next: (resultData: any) => {
            const authenticationResponse = resultData;
            console.log(authenticationResponse);
            localStorage.setItem('token', authenticationResponse.jwtToken);
            localStorage.setItem('user', authenticationResponse.username);
            localStorage.setItem('userId', authenticationResponse.userId);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.log("An error occurred during login:", error);
            alert("Invalid Credentials")
            // Handle specific error scenarios or display appropriate error message to the user
          }
        }
      );
    }
  }

  
  





  // name: string="";
  // email: string="";
  // password: string="";

  // constructor( private http: HttpClient,private router: Router){}

  
  // onSignupSubmit(){
  //   let signUpData={
  //     "name":this.name,
  //     "email":this.email,
  //     "password":this.password
  //   }
  //   if(this.name==null|| this.email==null|| this.password==null || this.name=='' || this.email=='' || this.password=='') alert("Please fill the credentials");
  //   else{
  //     this.http.post("http://localhost:8080/auth/signup",signUpData).subscribe((resultData:any)=>{
  //     console.log(resultData);
  //     alert("signup successful");
  //     this.name='';
  //     this.email='';
  //     this.password='';
  //   })

  //   }
  // }

  // onLoginSubmit(){
  //   let loginData={
  //     "email":this.email,
  //     "password":this.password
  //   }
  //   if(this.email==null || this.password==null || this.email=='' || this.password=='') console.log("Please fill the credentials");
  //   else{
  //     this.http.post("http://localhost:8080/auth/login",loginData).subscribe((resultData:any)=>{
  //     const authenticationResponse = resultData;
  //     console.log(authenticationResponse);
  //     localStorage.setItem('response',authenticationResponse);
  //     this.router.navigate(['/home']);
  //   })

  //   }
    
  // }
}

