import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {AuthService} from './auth/auth.service';
import {CurrentUser} from './shared/shared.interfaces';
import {ActivatedRoute, Params, RouterOutlet} from '@angular/router';
import {animate, animateChild, query, sequence, style, transition, trigger} from '@angular/animations';
import {fader, routeChangeAnimation} from './shared/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // routeChangeAnimation,
    fader
  ]
})
export class AppComponent implements OnInit {
  title = 'practicefront2020';
  windowWidth = 0;
  @ViewChild('sidenav', {static: false})sideNav: MatSidenav;
  curUser: CurrentUser;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if (this.authService.isAuthenticated()) {
      this.authService.currentUser = JSON.parse(localStorage.getItem('curUser')) as CurrentUser;
    }
  }

  @HostListener('window.resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches && this.sideNav.opened) {
          this.sideNav.close();
        }
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    // tslint:disable-next-line:no-string-literal
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  // logout() {
  //   this.authService.logout();
  // }
  hideNav() {
    // this.breakpointObserver
    //   .observe(['(max-width: 768px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches && this.sideNav.opened) {
    //       this.sideNav.close();
    //     }
    //   });
  }
}
