// Refactoring need
import { MdDelete }            from 'react-icons/md';
import { useState, useEffect } from 'react';
import Link                    from "next/link";

import { deleteDoorById } from '../../../redux/slices/catalogSlice';
import { directions }     from '../../../constants';
import { notify }         from './../../shared/notify/notify';
import { useAppDispatch } from './../../../redux/hook';
import { useAppSelector } from "../../../redux/hook";
import Modal              from '../../shared/modal/modal';

import styles from './catalogItem.module.scss';

const CatalogItem = ({ door }) => {
  const [inCart, setInCart] = useState([]);
  const [chosenSize, setChosenSize] = useState('');
  const [chosenDirection, setChosenDirection] = useState(directions[0]);
  const [choseModalIsOpen, setChoseModalIsOpen] = useState(false);
  const { isAuth, currentUser } = useAppSelector(state => state.user);
  const isAdmin = currentUser.roles?.includes('admin');
  const dispatch = useAppDispatch();

  const handleDelete = async(doorId) => {
    dispatch(deleteDoorById(doorId));
  };

  const addToCart = () => {
    if (chosenSize === '') {
      notify('warn', 'Необходимо выбрать размер');
      return;
    }

    let cartDoors = JSON.parse(localStorage.getItem('cartDoors')) || [];
    cartDoors.push({
      ...door, 
      chosenSize: chosenSize, 
      count: 1,
      direction: chosenDirection,
    });
    localStorage.setItem('cartDoors', JSON.stringify(cartDoors));
    setInCart(cartDoors);
    notify('success', 'Товар успешно добавлен в корзину');
    closeModal();
  };

  const isInCart = (door) => { // Вынести в хелпер.
    return inCart.map(door => door._id).includes(door._id);
  };

  useEffect(() => {
    if (localStorage.getItem('cartDoors')) {
      setInCart(JSON.parse(localStorage.getItem('cartDoors')));
    }
  }, []);

  const openModal = () => {
    setChoseModalIsOpen(true);
  };

  const closeModal = () => {
    setChoseModalIsOpen(false);
  };

  const inCartNotify = () => {
    notify('info', 'Для выбора другого размера перейдите в карточку товара');
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        {isAuth && isAdmin && <MdDelete onClick={() => handleDelete(door._id)} className={styles.deleteIcon}/>} 
        <div className={styles.doorCard}>
          <Link href={`/doors/${door._id}`}>
            <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
            <p className={styles.doorArticle}>Арт. {door.article}</p>
            <p className={styles.doorName}>{door.name}</p>
          </Link>
            <div className={styles.bottomSide}>
              <p className={styles.doorPrice}>{door.price}&#8381;</p>
              {isInCart(door) ? (
                  <button 
                    className={styles.inCartButton}
                    onClick={inCartNotify}
                  >
                    В корзине
                  </button>
                ) :
                <button onClick={openModal}>В корзину</button>
              }
            </div>
        </div>
      </div>
      <Modal
        title='Выберите характеристики'
        isOpen={choseModalIsOpen}
        onCloseFunction={closeModal}
        secondText='В корзину'
        secondAction={addToCart}
      >
        <div className={styles.specWrapper}>
          <span>Размер: </span>
          {door.sizes && door.sizes.toString().split(',').map(size => (
            <li 
              key={size} 
              className={size === chosenSize && styles.active}
              onClick={() => setChosenSize(size)}
            >
              {size}
            </li>
          ))}
        </div>
        {door.withLeftRight &&
          <div className={styles.specWrapper}>
            <span>Нправление:</span>
            {directions && directions.map(direction => (
              <li 
                key={direction}
                className={direction === chosenDirection && styles.active}
                onClick={() => setChosenDirection(direction)}
              >
                {direction}
              </li>
            ))}
          </div>
        }
      </Modal>
    </>
  );
};

export default CatalogItem;
