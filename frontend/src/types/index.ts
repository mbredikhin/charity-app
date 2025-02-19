import { Request } from '@/entities/request';

export interface CatalogFilters {
  requester_type: Request['requester_type'][];
  help_type: Request['help_type'][];
  helper_requirements: {
    helper_type: Request['helper_requirements']['helper_type'][];
    is_online: Request['helper_requirements']['is_online'][];
    qualification: Request['helper_requirements']['qualification'][];
  };
}

export interface Pagination {
  page: number;
  from: number;
  to: number;
  total: number;
  pagesCount: number;
}
