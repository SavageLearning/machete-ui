import { TestBed, inject } from '@angular/core/testing';
import { loadMenuRules } from "./load-menu-rules";

describe('loadMenuRules', () => {
  beforeEach(() => {

  });
  it('should load', () => {
    expect(loadMenuRules(['Hirer']).length).toBe(1);
  });
});