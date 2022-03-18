export interface ApiGetList {
  totalCount: number;
  pagesCount: number;
  currentPage: number;
  onPage: number;
}

export interface PaginatedHttpSuccessResponse<Data> extends ApiGetList {
  data: Data;
}

export interface ApiListParams {
  page: number;
  onPage?: number;
  orderField?: string;
  sortType?: string;
}

export type NormalizedListValues<T> = { [key: string | number]: T };

export interface NormalizedList<E, K = string | number> {
  entities: NormalizedListValues<E>;
  keys: K[];
}
