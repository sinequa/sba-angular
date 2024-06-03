import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppService } from '@sinequa/core/app-utils';
import { LoginService } from '@sinequa/core/login';
import { IntlService } from '@sinequa/core/intl';
import { SearchService } from '@sinequa/components/search';
import { UIService } from '@sinequa/components/utils';
import { FEATURES } from '../../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isDark$= this.ui.isDarkTheme$;

  constructor(
    public loginService: LoginService,
    public searchService: SearchService,
    private readonly ui: UIService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService) { }

  /**
   * On initialization set the page title
   */
  ngOnInit() {
    this.titleService.setTitle(this.intlService.formatMessage("msg#app.name"));
  }

  toggleDark() {
    this.ui.toggleDark();
    return false;
  }

  /**
   * Manage login and logout
   */
  toggleLogin(){
    if (!!this.loginService.complete) {
      this.loginService.logout();
    }
    else {
      this.loginService.login();
    }
    return false;
  }

  /**
   * Returns the list of features activated in the top right menus.
   * The configuration from the config.ts file can be overridden by configuration from
   * the app configuration on the server
   */
  public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }

  /**
   * Returns the sublist of features which gets displayed on the home page.
   */
  public get homeFacets(): string[] {
    return this.features.filter(feature => ['recent-documents', 'recent-queries', 'saved-queries', 'baskets'].indexOf(feature) !== -1);
  }

  /**
   * Return bootstrap classes allowing to position and size each facet on the home page.
   * @param i The index of the facet in the list
   * @param n The number of facets
   */
  public facetSizing(i: number, n: number): string {
    switch(n){
      case 1: return 'offset-md-3 col-md-6 offset-lg-4 col-lg-4';
      case 2: return i === 0 ? 'offset-md-1 col-md-5 offset-lg-3 col-lg-3' : 'col-md-5 col-lg-3';
      case 3: return i === 0 ? 'offset-md-1 col-md-5 offset-lg-0 col-lg-4' : i === 1 ? 'col-md-5 col-lg-4' : 'offset-md-3 col-md-6 offset-lg-0 col-lg-4';
      case 4: return i%2 === 0 ? 'offset-md-1 col-md-5 offset-lg-0 col-lg-3' : 'col-md-5 col-lg-3';
      case 5: return i === 0 || i === 2 ? 'offset-md-1 col-md-5 offset-lg-0 col-lg-4' : i === 1 ? 'col-md-5 col-lg-4' : i === 3 ? 'offset-md-0 col-md-5 offset-lg-3 col-lg-3' : 'offset-md-3 col-md-6 offset-lg-0 col-lg-3';
    }
    return i%2 === 0? 'offset-md-1 col-md-5 offset-lg-0 col-lg-3' : 'col-md-5 col-lg-3';
  }
}
