import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  url = 'https://nominatim.openstreetmap.org/search/';

  constructor(private http: HttpClient) {
  }

  getLongLarge(address: string) {
    return this
      .http
      .get(this.url + address + '?format=json');
  }
}
