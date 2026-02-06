export const UserPreferencesFactory = () => ({
  get: (property: string) => ({}),
  set: (property: string, value: any, skipSync?: boolean) => ({}),
  delete: (property: string, skipSync?: boolean) => ({}),
  sync: () => ({})
});