import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionServiceService } from 'src/app/services/interaction-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  LoggedIn: boolean;

  constructor(private authService: AuthService,private interactionService:InteractionServiceService) { }

  ngOnInit(): void {

    this.interactionService.loginStatus$.subscribe(msg => {
      this.LoggedIn = msg;
    })

    if (this.authService.isUserLoggedIn()) {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
  }

  logout(){
    this.authService.logout();
    this.interactionService.sendToHeader(false);
  }

}
