import { loadMenuRules } from './load-menu-rules';

describe('loadMenuRules', () => {

  it('should load', () => {
    // brittle; coded to date in load-men-rules
    expect(loadMenuRules(['Hirer']).length).toBe(3);
  });
});
