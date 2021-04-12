import { Component, OnInit } from '@angular/core';
import { User } from '../common/user';
import { LoginService } from './login.service';
import { TokenErrorService } from '../errors/token-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string
  password: string
  user: User
  credentialsError: string
  tokenError: string

  constructor(private loginService: LoginService, private tokenErrorService: TokenErrorService) { }

  ngOnInit(): void {
    this.tokenErrorService.errorChannel.subscribe(tokenError => {
      this.tokenError = tokenError
    })

    this.loginService.errorChannel.subscribe(credentialsError => {
      this.credentialsError = credentialsError
    })
  }

  onSubmit() {
    this.loginService.onLogin(this.email, this.password, this.user)
  }

  onClickDismissError() {
    this.tokenErrorService.errorChannel.next("")
    this.credentialsError = ""
  }
}