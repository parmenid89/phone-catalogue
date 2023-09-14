/* eslint-disable max-len */

import React from 'react';
import { SwiperPhones } from '../../components/SwiperPhones';
import { Category } from './components/Category';
import { Banner } from './components/Banner';

import phonesCategory from '../../assets/img/categories/category-phones.png';
import tabletsCategory from '../../assets/img/categories/category-tablets.png';
import accessoriesCategory from '../../assets/img/categories/category-accessories.png';

const categoriesData = [
  {
    linkTo: '/phones',
    title: 'Mobile phones',
    image: phonesCategory,
  },
  {
    linkTo: '/tablets',
    title: 'Tablets',
    image: tabletsCategory,
  },
  {
    linkTo: '/accessories',
    title: 'Accessories',
    image: accessoriesCategory,
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__header">
        <h1 className="homepage__header-title">
          Welcome to Nice Gadgets store!
        </h1>

        <Banner />
      </div>

      <div className="homepage__body">
        <SwiperPhones customTitle="Brand new models" />

        <div className="homepage__categories">
          <h2 className="homepage__blocktitle">Shop by category</h2>

          <div className="homepage__categories-links">
            {categoriesData.map((category) => (
              <Category
                linkTo={category.linkTo}
                title={category.title}
                key={category.title}
                image={category.image}
              />
            ))}
          </div>
        </div>

        <SwiperPhones customTitle="Hot prices" sortValue="discount" />
      </div>
    </div>
  );
};
