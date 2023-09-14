/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

// import homeIcon from '../../assets/icons/Home.svg';
// import arrowRight from '../../assets/icons/Arrow-right.svg';

import { ButtonBack } from '../../components/ButtonBack';
import { Button } from '../../components/Button';
import { LineElement } from '../../components/LineElement';
import { SwiperPhones } from '../../components/SwiperPhones';
import { ButtonLike } from '../../components/ButtonLike';
import { PhoneDetails } from '../../types/PhoneDetails';
import { getDetailsById, getImgUrl } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ColorLink } from './components/ColorLink';
import { CapacityLink } from './components/CapacityLink';
import { SpecItem } from './components/SpecItem';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductPage = () => {
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const imgs = product?.images.map(getImgUrl) || [];

  const [mainImg, setMainImg] = useState(imgs[0]);

  const { productId } = useParams();

  const preparedId = productId?.split('-').slice(0, -2) || [];

  const changeColor = (newColor: string) => {
    const idParts = productId?.split('-');

    if (idParts) {
      idParts[idParts?.length - 1] = newColor;
    }

    return idParts?.join('-') || '';
  };

  const changedId = (...params: string[]) => {
    const normalizedParams = params.map((param) => param.toLowerCase());

    return [...preparedId, ...normalizedParams].join('-');
  };

  useEffect(() => {
    setLoading(true);
    if (productId) {
      getDetailsById<PhoneDetails>(productId)
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [productId]);

  useEffect(() => {
    setMainImg(imgs[0]);
  }, [product]);

  const changeMainImgHandler = (img: string) => {
    if (img !== mainImg) {
      setMainImg(img);
    }
  };

  return loading || !product ? (
    <Loader />
  ) : (
    <div className="product">
      <Breadcrumbs />

      <ButtonBack />

      <h2 className="product__title">{product?.name}</h2>

      <section className="product__section product__preview">
        <div className="product__imgs">
          {imgs.map((img) => (
            <button
              key={img}
              type="button"
              className={classNames('product__imgs-item', {
                'img-active': img === mainImg,
              })}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: '80%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => changeMainImgHandler(img)}
            />
          ))}
        </div>

        <img src={mainImg} alt={product?.name} className="product__img-main" />

        <div className="product__info">
          <div className="product__colors">
            <div className="product__colors-heading">
              <h5 className="product__colors-label product__info-label">
                Avaible Colors
              </h5>
              <h6 className="product__colors-id">{`ID: ${product?.id}`}</h6>
            </div>

            <div className="product__colors-list">
              {product?.colorsAvailable.map((color) => (
                <ColorLink
                  key={color}
                  color={color}
                  prodColor={product.color}
                  changedId={changeColor}
                />
              ))}
            </div>

            <LineElement />
          </div>

          <div className="product__capacity">
            <h5 className="product__capacity-label product__info-label">
              Select Capacity
            </h5>

            <div className="product__capacity-list">
              {product?.capacityAvailable.map((capacity) => (
                <CapacityLink
                  key={capacity}
                  capacity={capacity}
                  prodCapacity={product.capacity}
                  prodColor={product.color}
                  changedId={changedId}
                />
              ))}
            </div>

            <LineElement />
          </div>

          <div className="product__price">
            <>
              <span className="product__price--bold">
                {`$${product?.priceDiscount}`}
              </span>
              {product?.priceRegular && (
                <span className="product__price--grey">{`$${product?.priceRegular}`}</span>
              )}
            </>
          </div>

          <div className="product__btns">
            <Button text="Add to cart" productId={product.id} />

            <ButtonLike itemId={product?.id} />
          </div>

          <div className="product__stats">
            <p className="product__stat">
              <span className="product__stat--name">Screen</span>
              {product?.screen}
            </p>
            <p className="product__stat">
              <span className="product__stat--name">Capacity</span>
              {product?.capacity}
            </p>
            <p className="product__stat">
              <span className="product__stat--name">RAM</span>
              {product?.ram}
            </p>
          </div>
        </div>
      </section>

      <section className="product__section product__information">
        <div className="product__about">
          <h2 className="product__about-title product__information-title">
            About
          </h2>

          <LineElement />

          <div className="product__about-description">
            {product?.description.map(({ title, text }) => (
              <div className="product__about-content" key={title}>
                <h3 className="product__about-subtitle">{title}</h3>

                <div className="product__about-text">
                  {text.map((paragraph) => (
                    <p key={paragraph} className="product__about-paragraph">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product__specs">
          <h2 className="product__specs-title product__information-title">
            Tech specs
          </h2>

          <LineElement />

          <ul className="product__specs-list">
            <SpecItem name="Screen" value={product.screen} />
            <SpecItem name="Resolution" value={product.resolution} />
            <SpecItem name="Processor" value={product.processor} />
            <SpecItem name="RAM" value={product.ram} />
            <SpecItem name="Built in memory" value={product.capacity} />
            <SpecItem name="Camera" value={product.camera} />
            <SpecItem name="Zoom" value={product.zoom} />
            <SpecItem name="Ceel" value={product.cell.join(', ')} />
          </ul>
        </div>
      </section>

      <section className="product__section product__swiper">
        <SwiperPhones
          customTitle="You may also like"
          recommendations
          productId={productId}
        />
      </section>
    </div>
  );
};
