import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser';
import {Product} from '../interfaces/product';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  private client: Client;
  private searchedProducts: Product[];

  constructor(public productService: ProductService) {
    if (!this.client) {
      this._connect();
    }
  }

  private connect(): void {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  private _connect(): void {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello grokonez!'
    });
  }

  fullTextSearch(index: string, type: string, title: string, description: string, queryText: string): Promise<Product[]> {
    return this.client.search({
      index,
      type,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        query: {

          match_phrase_prefix: {
            [title]: queryText
          }
          // multi_match: {
          //   query: queryText,
          //   fields: [title, description]
          // }
        }
      },
      _source: 'idProduct'
    }).then(result => {
      console.log(result.hits.hits);
      return result.hits.hits.map(hit => this.productService.findProduct(hit._source.idProduct));
    });
  }
}
