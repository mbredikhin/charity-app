import ReactIcon from '@/assets/images/react.svg?react';
import styles from './Home.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function Home() {
  return (
    <div className={cx(['home'])}>
      <ReactIcon />
    </div>
  );
}
