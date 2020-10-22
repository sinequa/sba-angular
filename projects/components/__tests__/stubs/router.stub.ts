export class RouterStub {
  url = '';
  events = {subscribe: f => f({})};
  getCurrentNavigation = () => ({extras: {state: {}}});
  navigate = (array, extras) => ({});
  navigateByUrl = (url: string) => this.url = url;
};