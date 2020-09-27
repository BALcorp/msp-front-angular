import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Sweet Paris';

  stickToTop(): void {
    const navBar = document.getElementById('navBar');
    const stickyNavBar = navBar.offsetTop;
    const navBarStandIn = document.getElementById('navBarStandIn');
    if (window.pageYOffset > stickyNavBar) {
      navBar.classList.add('he-stick-to-top');
      navBarStandIn.classList.add('he-stand-in');
      navBarStandIn.classList.remove('he-stand-out');
    } else {
      navBar.classList.remove('he-stick-to-top');
      navBarStandIn.classList.add('he-stand-out');
      navBarStandIn.classList.remove('he-stand-in');
    }
  }
}
