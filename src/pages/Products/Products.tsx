import Text from 'components/Text';
import styles from './Products.module.scss';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Api from 'config/Api';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import { ICategory, IProduct } from 'entities/product/types.ts';
import MultiDropdown, { Option } from 'components/MultiDropDown';

const Products = () => {
  const [data, setData] = useState<IProduct[] | null>(null);
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState<Option[]>([]);
  const [filterValues, setFilterValues] = useState<Option[]>([]);

  useEffect(() => {
    Api.getProducts().then((res) => setData(res.data));
    Api.getCategories().then((res) =>
      setFilterOptions(res.data.map((o: ICategory) => ({ key: o.name, value: o.name }))),
    );
  }, []);

  console.log(data);

  return (
    <div className={styles.products}>
      <Text tag="h1" view="title" align="center">
        Products
      </Text>
      <Text view="p-20" color="secondary" align="center" className={`${styles.secondary_text}`}>
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
      <div className={styles.search}>
        <Input value={search} onChange={setSearch} placeholder="Search product" />
        <Button>Find now</Button>
      </div>
      <MultiDropdown
        options={filterOptions}
        value={filterValues}
        onChange={setFilterValues}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Выберите категории' : values.map(({ value }) => value).join(', ')
        }
        className={styles.filter}
      />
      <div className={styles.products__info}>
        <Text tag="h2" className={styles.total}>
          Total Product
        </Text>
        <Text tag="span" view="p-20" color="accent" weight="bold">
          {data?.length || 0}
        </Text>
      </div>
      <div className={styles.products__list}>
        {data &&
          data.map((e) => (
            <Link to={`/products/${e.id}`} key={e.id} className={styles.products__card}>
              <Card
                image={e.images[0].replace(/^\["|"\]$/g, '')}
                title={e.title}
                subtitle={e.description}
                contentSlot={`$${e.price}`}
                actionSlot={<Button>Add to card</Button>}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Products;
