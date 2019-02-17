export class User {
  expired: boolean = true;
  profile: UserProfile = new UserProfile();
  scope: string = '';
  session_state: string = '';
  state: string = '';
  token_type: string = '';
  expires_at: number = 0;
  expires_in: number = 0;
  scopes: Array<string> = new Array<string>();
}

export class UserProfile {
  roles: Array<string> = new Array<string>();
  preferred_username: string = 'Not logged in!';
}
