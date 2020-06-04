import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TotalResultResponse} from '../shared/shared.interfaces';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  resultData: TotalResultResponse;
  resultLink;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(window.location);
    this.resultLink = window.location.href;
    this.route.params.subscribe((params: Params) => {
      this.http.get<TotalResultResponse>('http://127.0.0.1:8000/api/v1/speedtest/total_result_list/'.concat(params.id))
        .subscribe(response => {
          this.resultData = response;
          console.log('expiration', response.expiration_date);
          console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ'));
          if (moment(response.expiration_date).isBefore(moment())) {
            console.log('expiration', response.expiration_date);
            console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ'));
            this.router.navigate(['error'], {
              queryParams: {
                noLongerAvailable: true
              }
            });
          }
        });
    });
  }

}
