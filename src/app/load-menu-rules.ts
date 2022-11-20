import { MenuRule, LRole } from "./menu-rule";

export function loadMenuRules(authList: string[]): Array<MenuRule> {
  const rules = [
    new MenuRule({
      id: 0,
      label: "Hiring portal",
      icon: "pi pi-fw pi-home",
      visible: true,
      authorizedRoles: [LRole.ADMIN, LRole.HIRER],
      items: [
        new MenuRule({
          id: 1,
          label: "Place an order",
          icon: "pi pi-fw pi-home",
          routerLink: ["/online-orders/introduction"],
          authorizedRoles: [LRole.ADMIN, LRole.HIRER],
          visible: true,
        }),
        new MenuRule({
          id: 2,
          label: "My profile",
          icon: "pi pi-fw pi-home",
          routerLink: ["/employers"],
          authorizedRoles: [LRole.ADMIN, LRole.HIRER],
          visible: true,
        }),
        new MenuRule({
          id: 3,
          label: "My work orders",
          icon: "pi pi-fw pi-home",
          routerLink: ["/my-work-orders"],
          authorizedRoles: [LRole.ADMIN, LRole.HIRER],
          visible: true,
        }),
      ],
    }),
    new MenuRule({
      id: 5,
      label: "Manager portal",
      authorizedRoles: [LRole.ADMIN, LRole.MANAGER],

      items: [
        new MenuRule({
          id: 9,
          label: "Reports",
          icon: "pi pi-fw pi-home",
          routerLink: ["/reports"],
          authorizedRoles: [LRole.ADMIN, LRole.MANAGER],
          visible: true,
        }),
        new MenuRule({
          id: 10,
          label: "Exports",
          icon: "pi pi-fw pi-home",
          routerLink: ["/exports"],
          authorizedRoles: [LRole.ADMIN, LRole.MANAGER],
          visible: true,
        }),
      ],
    }),

    new MenuRule({
      id: 12,
      label: "Configuration",
      icon: "pi pi-fw pi-home",
      routerLink: ["/configuration"],
      authorizedRoles: [LRole.ADMIN],
      visible: true,
      items: [
        // new MenuRule({
        //   id: 11,
        //   label: 'Auth diagnostics',
        //   icon: 'perm_identity',
        //   routerLink: ['/auth/dashboard'],
        //   authorizedRoles: [
        //     LRole.ADMIN,
        //     LRole.CHECKIN,
        //     LRole.MANAGER,
        //     LRole.PHONEDESK,
        //     LRole.TEACHER,
        //     LRole.USER
        //   ]
        // }),
        new MenuRule({
          id: 13,
          label: "Machete Settings",
          icon: "pi pi-fw pi-home",
          routerLink: ["configuration/settings"],
          authorizedRoles: [LRole.ADMIN],
          visible: true,
        }),
        new MenuRule({
          id: 14,
          label: "Transport Providers",
          icon: "pi pi-fw pi-home",
          routerLink: ["configuration/transport-providers"],
          authorizedRoles: [LRole.ADMIN],
          visible: true,
        }),
      ],
    }),
    // Hide unfinished work
    // !! TODO finish the workers in list feature
    // new MenuRule({
    //   id: 14,
    //   label: 'Workers',
    //   icon: 'assignment_ind',
    //   routerLink: ['/workers'],
    //   authorizedRoles: [
    //     LRole.ADMIN,
    //     LRole.MANAGER
    //   ]
    // }),
  ];
  // lambda-fu
  if (authList == null || authList === undefined) {
    return new Array<MenuRule>();
  }
  return rules.filter(
    (rule) =>
      Array.isArray(rule.authorizedRoles) &&
      rule.authorizedRoles.findIndex(
        (role) => authList.findIndex((auth) => auth === role) > -1
      ) > -1
  );
}
