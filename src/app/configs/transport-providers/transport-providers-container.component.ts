import { Component } from "@angular/core";

@Component({
  selector: "app-transport-providers-container",
  template: `
    <p-toolbar styleClass="p-shadow-1 p-mb-4">
      <div class="p-toolbar-group-left"></div>

      <div class="p-toolbar-group-right">
        <button
          pButton
          pRipple
          class="p-button-raised p-mr-2"
          icon="pi pi-plus"
          label="New"
          tooltipPosition="bottom"
          routerLink="/configuration/transport-providers/new"
        ></button>
      </div>
    </p-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class TransportProvidersContainerComponent {}
