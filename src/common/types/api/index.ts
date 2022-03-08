export interface PaginatedHttpSuccessResponse<Data> {
  data: Data;
  totalCount: number;
  pagesCount: number;
  currentPage: number;
  onPage: number;
}

export interface ApiListParams {
  page: number;
  onPage?: number;
  orderField?: string;
  sortType?: string;
}
