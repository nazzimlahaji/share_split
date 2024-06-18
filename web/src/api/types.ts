// GET
export interface IdentifyResponse {
  metadata: {
    message: string;
  };
  data: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Email: string;
    Name: string;
    Uuid: string;
    DeactivatedAt: string | null;
  };
}

export interface UserListResponse {
  data: {
    id: string;
    uuid: string;
    name: string;
    email: string;
    role_name: string;
    created_at: string;
    updated_at: string;
    deactivated_at: string | null;
  }[];
  metadata: {
    message: string;
    error?: string;
    page: number;
    per_page: number;
    total: number;
  };
}

export interface UserListFilter {
  per_page: number;
  page: number;
}

export interface RoleListResponse {
  data: {
    id: string;
    name: string;
  }[];
  metadata: {
    message: string;
  };
}

export interface UserDetailResponse {
  data: {
    id: number;
    uuid: string;
    name: string;
    email: string;
    role_name: string;
    deactivated_at: string;
    created_at: string;
    updated_at: string;
  };
  metadata: {
    message: string;
    error?: string;
  };
}

// POST
export interface CreateUserResponse {
  metadata: {
    message: string;
    error?: string;
  };
}
