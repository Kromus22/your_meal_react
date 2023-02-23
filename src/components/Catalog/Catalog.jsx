import { Order } from "../Order/Order";
import { Container } from "../Container/Container";
import style from './Catalog.module.css';
import { CatalogProduct } from "../CatalogProduct/CatalogProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productRequestAsync } from "../../store/product/productSlice";

export const Catalog = () => {
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { category, activeCategory } = useSelector(state => state.category);

  useEffect(() => {
    if (category.length) {
      dispatch(productRequestAsync(category[activeCategory].title));
    }
  }, [category, activeCategory]);

  const productList = products.map((item) => (
    <li key={item.id} className={style.item}>
      <CatalogProduct item={item} />
    </li>
  ))

  const emptyList = (
    <p>Простите, такого товара сейчас нет</p>
  )

  return (
    <section className={style.catalog}>
      <Container className={style.container}>
        <Order />
        <div className={style.wrapper}>
          <h2 className={style.title}>{category[activeCategory]?.rus}</h2>

          <div className={style.wrap_list}>
            <ul className={style.list}>

              {productList.length ? productList : emptyList}

            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}