import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfigService, ServerResponse } from '@sunbird/shared';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import { PortalService } from '@sunbird/core';
import { RequestParam } from '../../../shared';

/**
 * Service to fetch resource bundle
 */
@Injectable()
export class RssfeedService {

  public config: ConfigService;

    constructor(config: ConfigService, public portalService: PortalService) {
      this.config = config;
    }


 getNewsFeed() {
    const option: RequestParam = {
      url: this.config.urlConFig.URLS.RSSFEED.NEWS
    };
    return this.portalService.get(option);
  }

  getOpportunitiesRssFeed() {
    const option: RequestParam = {
      url: this.config.urlConFig.URLS.RSSFEED.JOBS
    };
    return this.portalService.get(option);
  }
}