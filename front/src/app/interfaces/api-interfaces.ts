export interface Permission {
  read: boolean;
  write: boolean;
  exec: boolean;
}

export interface Document {
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
  content: Document[];
}
