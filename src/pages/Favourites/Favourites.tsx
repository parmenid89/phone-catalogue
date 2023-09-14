/* eslint-disable max-len */

import { useContext, useEffect, useState } from 'react';

import { CardItem } from '../../components/CardItem';
import { AppContext } from '../../components/AppContext/AppContext';
import { AppContextType } from '../../types/AppContextType';
import { EmptyValueComponent } from '../../components/EmptyValueComponent';
import { Phone } from '../../types/Phone';
import { Loader } from '../../components/Loader';
import { getDetailsByIdsArr } from '../../api/details';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const Favourites = () => {
  const { favouriteArr } = useContext(AppContext) as AppContextType;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedIds, setLoadedIds] = useState<Phone[]>([]);

  useEffect(() => {
    getDetailsByIdsArr<Phone[]>(favouriteArr)
      .then(setLoadedIds)
      .finally(() => setIsLoading(false));
  }, [favouriteArr]);

  return (
    <>
      <div className="favourites">
        <div className="favourites__content">

          <Breadcrumbs />

          <h1 className="favourites__title">Favourites</h1>

          <p className="favourites__subtitle">
            {` ${loadedIds.length}
            items `}
          </p>

          {loadedIds.length === 0 && !isLoading && <EmptyValueComponent />}

          {isLoading ? (
            <Loader />
          ) : (
            <div className="favourites__list">
              {loadedIds.map((phone) => (
                <div className="favourites__list--item" key={phone.id}>
                  <CardItem phone={phone} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
