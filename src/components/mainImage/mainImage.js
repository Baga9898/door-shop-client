import Link          from "next/link";

import { doorsRoute } from '../../constants';
import * as INTL      from '../../texts';
import Slogan         from './slogan/slogan';

import styles from './mainImage.module.scss';

const MainImage = () => {
    return (
        <div className={styles.mainImage}>
            <Slogan />
            <img src='/assets/main-screen-door.jpg' alt='door main image' />
            <Link href={doorsRoute}>
                <button>{INTL.catalogButton}</button>
            </Link>
        </div>
    );
};

export default MainImage;
