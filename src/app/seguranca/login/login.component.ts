import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }


  ngOnInit(): void {    
  }

  login(usuario: string, senha: string) {
    console.log(usuario, senha);
    this.auth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
