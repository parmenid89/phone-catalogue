import { ProductCategory } from './ProductCategory';
import { SortBy } from './SortBy';
import { SortOrder } from './SortOrder';

export type RequestOptions = {
  page?: number,
  limit?: number,
  category?: ProductCategory,
  sortBy?: SortBy,
  orderIn?: SortOrder,
};
