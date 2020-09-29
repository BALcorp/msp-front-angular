import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  // url = 'https://nominatim.openstreetmap.org/search/';
  url = 'https://9f9rgakshg.execute-api.eu-west-3.amazonaws.com/dev/osm/';

  constructor(private http: HttpClient) {
  }

  getLongLarge(address: string) {
    return this
      .http
      .get(this.url + address + '?format=json');
  }
}
