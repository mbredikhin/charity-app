import { Box, Typography } from '@mui/material';
import VKIcon from '@/assets/images/vk.svg?react';
import TGIcon from '@/assets/images/telegram.svg?react';
import WAIcon from '@/assets/images/whatsapp.svg?react';
import {
  ProfileContacts as IProfileContacts,
  ProfileSocials,
} from '@/entities/profile';
import styles from './ProfileContacts.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface ProfileContactsProps {
  contacts: IProfileContacts;
  socials: ProfileSocials;
}

export function ProfileContacts({ contacts, socials }: ProfileContactsProps) {
  const { email, phone } = contacts;
  const { telegram, whatsapp, vk } = socials;

  return (
    <Box>
      <Box className={cx('profile-contacts')}>
        <Typography className={cx('profile-contacts__title')}>
          E-mail
        </Typography>
        <Typography className={cx('profile-contacts__text')}>
          {email ?? ''}
        </Typography>
      </Box>
      <Box className={cx('profile-contacts')}>
        <Typography className={cx('profile-contacts__title')}>
          Телефон
        </Typography>
        <Typography className={cx('profile-contacts__text')}>
          {phone ?? ''}
        </Typography>
      </Box>
      <Box>
        <Typography className={cx('profile-contacts__title')}>
          Социальные сети
        </Typography>
        <Box>
          <Box className={cx('profile-socials')}>
            <VKIcon />
            <Typography className={cx('profile-socials__text')}>
              {vk ?? ''}
            </Typography>
          </Box>
          <Box className={cx('profile-socials')}>
            <TGIcon />
            <Typography className={cx('profile-socials__text')}>
              {telegram ?? ''}
            </Typography>
          </Box>
          <Box className={cx('profile-socials')}>
            <WAIcon />
            <Typography className={cx('profile-socials__text')}>
              {whatsapp ?? ''}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
