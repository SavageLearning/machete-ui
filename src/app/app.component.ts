/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { environment } from "../environments/environment";
import { ConfigsService } from "./configs/configs.service";
import { LookupsService } from "./lookups/lookups.service";
import { Router, NavigationEnd } from "@angular/router";
import { MenuItem, Message, MessageService, PrimeNGConfig } from "primeng/api";
console.log("environment.name:", environment.name);

enum MenuOrientation {
  static,
  overlay,
  horizontal,
}

declare let jQuery: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [LookupsService, ConfigsService, MessageService],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild("layoutContainer", { static: false })
  layourContainerViewChild: ElementRef;

  @ViewChild("layoutMenuScroller", { static: false })
  layoutMenuScrollerViewChild: ElementRef;

  layoutCompact = false;
  layoutMode = MenuOrientation.static;
  darkMenu = true;
  profileMode = "inline";
  rotateMenuButton: boolean;
  topbarMenuActive: boolean;
  overlayMenuActive: boolean;
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  layoutContainer: HTMLDivElement;
  layoutMenuScroller: HTMLDivElement;
  menuClick: boolean;
  topbarItemClick: boolean;
  activeTopbarItem: any;
  documentClickListener: any;
  resetMenu: boolean;
  msgs: Message[] = [];

  constructor(
    public renderer: Renderer2,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  ngAfterViewInit(): void {
    this.layoutContainer = this.layourContainerViewChild
      .nativeElement as HTMLDivElement;
    this.layoutMenuScroller = this.layoutMenuScrollerViewChild
      .nativeElement as HTMLDivElement;

    //hides the horizontal submenus or top menu if outside is clicked
    this.documentClickListener = this.renderer.listen("body", "click", () => {
      if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
      }

      if (!this.menuClick && this.isHorizontal()) {
        this.resetMenu = true;
      }

      this.topbarItemClick = false;
      this.menuClick = false;
    });

    setTimeout(() => {
      jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }, 10);
  }

  onMenuButtonClick(event: Event): void {
    this.rotateMenuButton = !this.rotateMenuButton;
    this.topbarMenuActive = false;

    if (this.layoutMode === MenuOrientation.overlay) {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }
    }

    event.preventDefault();
  }

  onMenuClick(): void {
    this.menuClick = true;
    this.resetMenu = false;

    if (!this.isHorizontal()) {
      setTimeout(() => {
        jQuery(this.layoutMenuScroller).nanoScroller();
      }, 500);
    }
  }

  onTopbarMenuButtonClick(event: Event): void {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    if (this.overlayMenuActive || this.staticMenuMobileActive) {
      this.rotateMenuButton = false;
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
    }

    event.preventDefault();
  }

  onTopbarItemClick(event: Event, item: MenuItem): void {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  isTablet(): boolean {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  isMobile(): boolean {
    return window.innerWidth <= 640;
  }

  isOverlay(): boolean {
    return this.layoutMode === MenuOrientation.overlay;
  }

  isHorizontal(): boolean {
    return this.layoutMode === MenuOrientation.horizontal;
  }

  changeToStaticMenu(): void {
    this.layoutMode = MenuOrientation.static;
  }

  changeToOverlayMenu(): void {
    this.layoutMode = MenuOrientation.overlay;
  }

  changeToHorizontalMenu(): void {
    this.layoutMode = MenuOrientation.horizontal;
  }

  ngOnDestroy(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
    }

    jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
  }
}
