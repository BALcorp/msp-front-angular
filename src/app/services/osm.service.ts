import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  address = '65 quai du Halage 94290';
  url = 'https://nominatim.openstreetmap.org/search/'
    + this.address + '?format=json';

  constructor(private http: HttpClient) {
  }

  getLongLarge() {
    return this
      .http
      .get(this.url);
  }
}
