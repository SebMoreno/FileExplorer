export interface Permission {
  read: boolean;
  write: boolean;
  exec: boolean;
}

export interface Doc {
  name: string;
  owner: string;
  type: 'dir' | 'file';
  permissions: {
    owner: Permission;
    group: Permission;
    other: Permission;
  };
}

export interface State {
  path: string;
  content: Doc[];
}

export interface User {
  user: string;
}
