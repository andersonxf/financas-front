import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.css']
})
export class MenuTopoComponent implements OnInit {

  exibindoMenu = false;

  constructor( 
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })
    .catch(erro => this.errorHandler.handle(erro));

  }
}
