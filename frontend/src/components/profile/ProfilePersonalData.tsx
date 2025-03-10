import { Box } from '@mui/material';
import { Profile } from '@/entities/profile';
import { PersonalDataBlock } from './PersonalDataBlock';
import { PersonalDataEntry } from './lib';

interface ProfilePersonalDataProps {
  profile: Profile;
}

export function ProfilePersonalData({ profile }: ProfilePersonalDataProps) {
  const {
    last_name,
    first_name,
    birthdate,
    locations,
    education,
    additional_info,
  } = profile;
  const blocks = [
    {
      title: 'Профиль',
      entries: [
        ['Фамилия', last_name],
        ['Имя', first_name],
      ] as PersonalDataEntry[],
      visible: true,
    },
    {
      title: 'Дата рождения',
      entries: [
        ['', new Date(birthdate ?? '').toLocaleDateString()],
      ] as PersonalDataEntry[],
      visible: Boolean(birthdate),
    },
    {
      title: 'Локации для помощи',
      entries: locations.map(({ district, city }) => [
        ['Область:', district],
        ['Населенный пункт:', city],
      ]) as PersonalDataEntry[][],
      visible: locations.length,
    },
    {
      title: 'Образование',
      entries: education.map(
        ({ organization, level, graduation_year, specialization }) => [
          ['Учреждение:', organization],
          ['Уровень образования:', level],
          ['Направление:', specialization],
          ['Год окончания:', graduation_year],
        ]
      ) as PersonalDataEntry[][],
      visible: education.length,
    },
    {
      title: 'Обо мне',
      entries: [['', additional_info]] as PersonalDataEntry[],
      visible: Boolean(additional_info),
    },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {blocks.map(({ title, entries, visible }) =>
        visible ? (
          <PersonalDataBlock key={title} title={title} entries={entries} />
        ) : null
      )}
    </Box>
  );
}
