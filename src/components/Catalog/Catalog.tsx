/* eslint-disable max-len */
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';
import { CardItem } from '../CardItem';
import { Phone } from '../../types/Phone';
import { Dropdown } from '../Dropdown';
import { getAll } from '../../api/products';

import { AppContext } from '../AppContext/AppContext';
import { buildSortByParam } from '../../utils/functions';
import { Loader } from '../Loader';
import { Quantities } from '../../types/Quantities';
import { DropdownResponse } from '../../types/DropdownResponse';
import { Breadcrumbs } from '../Breadcrumbs';

type CatalogProps = {
  productName?: string;
  pathName?: string[];
};

const sortOptions = [
  'Newest',
  'Oldest',
  'Alphabetically',
  'Cheapest',
  'Expensive',
];

const itemsOnPageOptions = ['4', '8', '16'];

export const Catalog = ({
  productName = 'Mobile phones',
  pathName = ['Phones'],
}: CatalogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('Newest');
  const [phonesPerPage, setPhonesPerPage] = useState('16');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const quantitiesKey = pathName[0].toLowerCase() as keyof Quantities;

  const { products, setProducts, quantities } = useContext(AppContext);

  useEffect(() => {
    const params = searchParams.toString();

    let url = `?category=${pathName[0].toLowerCase()}`;

    url += params ? `&${params}` : '';

    getAll<Phone[]>(url)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [pathName, searchParams]);

  function handleChangeItemsPerPage(option: DropdownResponse) {
    const { value } = option;
    const params = new URLSearchParams(searchParams);

    setPhonesPerPage(value);
    setCurrentPage(1);

    if (value === '16') {
      params.delete('limit');
    } else {
      params.set('limit', value.toLowerCase());
    }

    setSearchParams(params);
  }

  function handleChangeSortOption(option: DropdownResponse) {
    const { value } = option;

    setSortOption(value);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);

    setSearchParams(buildSortByParam(value, params));
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);

    const params = new URLSearchParams(searchParams);

    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  }

  useEffect(() => {
    handlePageChange(1);
  }, [phonesPerPage]);

  return (
    <>
      <div className="catalog">
        <div className="catalog__content">
          <Breadcrumbs />

          <h1 className="catalog__title">{productName}</h1>

          <p className="catalog__subtitle">
            {`${quantities ? quantities[quantitiesKey] : 0} models`}
          </p>

          <div className="catalog__dropdown--container">
            <div className="catalog__dropdown">
              <label htmlFor="sortDropdown" className="dropdown__title">
                Sort by
              </label>
              <Dropdown
                options={sortOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                handleChange={handleChangeSortOption}
                currentValue={{ label: sortOption, value: sortOption }}
              />
            </div>
            <div className="catalog__dropdown">
              <label htmlFor="itemsPerPageDropdown" className="dropdown__title">
                Items on page
              </label>
              <Dropdown
                options={itemsOnPageOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                handleChange={handleChangeItemsPerPage}
                currentValue={{ label: phonesPerPage, value: phonesPerPage }}
              />
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="catalog__list">
              {products.map((phone) => (
                <div className="catalog__list--item" key={phone.id}>
                  <CardItem phone={phone} />
                </div>
              ))}
            </div>
          )}

          <div className="catalog__pagination">
            <Pagination
              total={quantities ? quantities[quantitiesKey] : 0}
              perPage={phonesPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
