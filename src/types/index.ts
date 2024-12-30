export interface CatalogFilters {
  requesterType: ('person' | 'organization')[];
  helpType: ('finance' | 'material')[];
  helperRequirements: {
    helperType: ('group' | 'single')[];
    isOnline: boolean[];
    qualification: ('professional' | 'common')[];
  };
}

export interface Pagination {
  page: number;
  from: number;
  to: number;
  total: number;
  pagesCount: number;
}
