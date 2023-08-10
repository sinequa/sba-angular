import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndexingService, TokenData, TokenInfo } from '../indexing.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'sq-uploads-status',
  templateUrl: './uploads-status.component.html'
})
export class UploadsStatusComponent implements OnChanges {

  @Input() token: TokenInfo; // set with a new token to store

  tokensData: { token: TokenInfo, tokenData: TokenData }[] = [];

  refreshInterval = 3000; // the interval to refresh the documents that have not yet been indexed

  constructor(private indexingService: IndexingService) {
    this.indexingService.fetchTokens();
    this.fetchTokensData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.token && this.token) {
      this.indexingService.addToken(this.token);
      this.fetchTokensData();
    }
  }

  fetchTokensData(): void {
    this.tokensData = [];
    if (!this.indexingService.tokens.length) return;
    this.indexingService.readTokens().subscribe((data: (TokenData | undefined)[]) => {
      console.log('readTokens', data);
      this.tokensData = (data.filter(d => d !== undefined) as TokenData[]).map((d, index) => ({ token: this.indexingService.tokens[index], tokenData: d }));
      this.verifyTokens()
    })
  }

  verifyTokens(): void {
    const pendingTokens = this.tokensData.filter(data => data.tokenData.docs.find(doc => !doc.reindexed)); // tokens data containing docs with "reindexed" as false
    if (pendingTokens.length) {
      const observables = pendingTokens.map(token => this.indexingService.readToken(token.token.token));
      forkJoin(observables).subscribe((data: TokenData[]) => {
        pendingTokens.map((tokenData, index) => tokenData.tokenData = data[index]);
        setTimeout(() => this.verifyTokens(), this.refreshInterval);
      })
    }
  }

  indexed(tokenData: TokenData): boolean {
    return !tokenData.docs.find(doc => !doc.reindexed);
  }

  removeToken(index: number): void {
    this.tokensData.splice(index, 1);
    this.indexingService.removeToken(index);
    this.fetchTokensData();
  }

}
