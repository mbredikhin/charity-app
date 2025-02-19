import { Box, Typography } from '@mui/material';
import VKIcon from '@/assets/images/vk.svg?react';
import TGIcon from '@/assets/images/telegram.svg?react';
import WAIcon from '@/assets/images/whatsapp.svg?react';
import { ProfileContacts, ProfileSocials } from '@/entities/profile';

interface ContactsProps {
  contacts: ProfileContacts;
  socials: ProfileSocials;
}

export function Contacts({ contacts, socials }: ContactsProps) {
  const { email, phone } = contacts;
  const { telegram, whatsapp, vk } = socials;
  const boldFontProps = { fontWeight: 500, fontSize: 20, lineHeight: 2.5 };
  const regularFontProps = { fontWeight: 400, fontSize: 14 };
  const socialProps = { display: 'flex', gap: 3.5, my: 1 };
  return (
    <Box>
      <Box sx={{ mb: 3.5 }}>
        <Typography sx={boldFontProps}>E-mail</Typography>
        <Typography sx={regularFontProps}>{email ?? ''}</Typography>
      </Box>
      <Box sx={{ mb: 3.5 }}>
        <Typography sx={boldFontProps}>Телефон</Typography>
        <Typography sx={regularFontProps}>{phone ?? ''}</Typography>
      </Box>
      <Box>
        <Typography sx={boldFontProps}>Социальные сети</Typography>
        <Box>
          <Box sx={socialProps}>
            <VKIcon />
            <Typography sx={regularFontProps}>{vk ?? ''}</Typography>
          </Box>
          <Box sx={socialProps}>
            <TGIcon />
            <Typography sx={regularFontProps}>{telegram ?? ''}</Typography>
          </Box>
          <Box sx={socialProps}>
            <WAIcon />
            <Typography sx={regularFontProps}>{whatsapp ?? ''}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
