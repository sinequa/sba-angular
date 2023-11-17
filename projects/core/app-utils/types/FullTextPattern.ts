export type FullTextPattern = {
  type: 'group' | 'adjacent' | 'exact' | 'regex' | 'token',
  value: string,
  op?: '+' | '-'
};
