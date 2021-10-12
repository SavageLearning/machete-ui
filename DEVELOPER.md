# Testing Machete

## Template Best Practices
Use change-resilient attributes to your templates to make testing easier.

> **Note:** Example: `data-mtest=submit` for a form submit button or `data-mtest=form-edit-toggle`. 

## Unit Tests
We use Karma as the unit test framework. All components, services, pipes, custom validators should have an isolated unit test. All unit tests are run during builds. 

**Mocking**: Use `shared/testing/services.spy.ts` to mock services. See sample mocks there. A very simple example is: 

``` typescript
export class ReportsStoreServiceSpy {
  reports$ = observableOf(
    new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    )
  );
}
```

**Special Testing cases**:
- Child Components with `ChangeDetectionStrategy: onPush` where data is rendered after some logic in `onChanges()`. See example below on how to catch changes after component is initialized.

``` typescript
 beforeEach(() => {
    fixture = TestBed.createComponent(RecordsTableComponent);
    component = fixture.componentInstance;
    // component.values = [];
    component.excludeCols = [
      "id",
      "subcategory",
      "name",
      "title",
      "inputs",
      "columns",
      "sqlquery",
      "inputsJson",
      "columnsJson",
    ];
    component.colOrder = ["commonName"];
    component.values = new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    );
    const previous = [];
    const current = new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    );
    const changes: SimpleChanges = {
      values: new SimpleChange(previous, current, false),
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();
  });
```

## Integration Testing
We use [`cypress`](https://docs.cypress.io/guides/overview/why-cypress) as the integration testing framwork. We require integration testing on more ui flows like multi-step forms, form validation, etc. Testing scripts can be found in `package.json`.

- `cypress:open` runs the tests in a browser.
- `cypress:run`: headless tests

**tests on local env**
The `baseUrl` variable in `cypress.json` should point to `http://localhost:4213/V2`. You can also change the cypress testing constants in `cypress/machete-constants.ts` like username and password.

**Remote Tests**
Change the constants in `cypress.json` and `cypress/machete-constants.ts`.


