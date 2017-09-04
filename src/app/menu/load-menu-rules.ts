
import { MenuRule, LRole } from "./menu-rule";
import { Log } from "oidc-client";

export function loadMenuRules(authList: string[]): Array<MenuRule> {
  let rules = [
    new MenuRule({
      id: 1, 
      label: 'Place an order', 
      icon: 'business', 
      routerLink: ['/online-orders/introduction'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.HIRER
      ]
    }),
    new MenuRule({
      id: 2, 
      label: 'Employers', 
      icon: 'business', 
      routerLink: ['/employers'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.HIRER
      ]
    }),
    new MenuRule({
      id: 3, 
      label: 'Work Orders', 
      icon: 'work', 
      routerLink: ['/work-orders']
    }),
    new MenuRule({id: 4, label: 'Dispatch', icon: 'today', url: ['/workassignment']}),
    new MenuRule({id: 5, label: 'People', icon: 'people', url: ['/person']}),
    new MenuRule({id: 6, label: 'Activities', icon: 'local_activity', url: ['/Activity']}),
    new MenuRule({id: 7, label: 'Sign-ins', icon: 'track_changes', url: ['/workersignin']}),
    new MenuRule({id: 8, label: 'Emails', icon: 'email', url: ['/email']}),
    new MenuRule({
      id: 9, 
      label: 'Reports', 
      icon: 'subtitles', 
      routerLink: ['/reports'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.MANAGER
      ]
    }),
    new MenuRule({
      id: 10, 
      label: 'Exports', 
      icon: 'file_download', 
      routerLink: ['/exports'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.MANAGER
      ]
    }),
    new MenuRule({
      id: 11, 
      label: 'Dashboard', 
      icon: 'file_download', 
      routerLink: ['/dashboard'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.CHECKIN,
        LRole.HIRER,
        LRole.MANAGER,
        LRole.PHONEDESK,
        LRole.TEACHER,
        LRole.USER
      ]}),
  ];
  // lambda-fu
  return rules.filter(rule => {
    return rule.authorizedRoles.findIndex(role => {
      return authList.findIndex(auth => auth == role) > -1
    }) > -1
  });
}