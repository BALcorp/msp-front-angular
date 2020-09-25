import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {

  constructor(private router: Router) {

  }

  // build the start of canActivate method
  canActivate(
    next: ActivatedRouteSnapshot, // Current route informations
    // state => represents the state of the router as a tree of activated routes
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Dans url j'ai un tableau avec les différentes parties que composent notre url => ['products','2'];
    let id = +next.url[1].path;

    if (isNaN(id) || id < 1) {
      alert('Invalid product id');
      this.router.navigate(['/products-catalog']);
      return false;
    }

    return true;
  }

}
