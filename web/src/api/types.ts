export interface IdentifyResult {
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
  };
}
