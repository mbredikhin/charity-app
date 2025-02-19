import { Box, Typography } from '@mui/material';
import { Profile } from '@/entities/profile';

interface ProfilePersonalInfoProps {
  profile: Profile;
}

export function ProfilePersonalInfo({ profile }: ProfilePersonalInfoProps) {
  const {
    last_name,
    first_name,
    birthdate,
    locations,
    education,
    additional_info,
  } = profile;
  const formattedBirthdate = new Date(birthdate).toLocaleDateString();
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Профиль
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" display="inline">
            Фамилия:
          </Typography>
          <Typography variant="body2" display="inline">
            {' '}
            {last_name ?? ''}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" display="inline">
            Имя:
          </Typography>
          <Typography variant="body2" display="inline">
            {' '}
            {first_name ?? ''}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Дата рождения
        </Typography>
        <Typography variant="body2" display="inline">
          {' '}
          {formattedBirthdate}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Локация для помощи
        </Typography>
        {locations.map(({ district, city }, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" display="inline">
                Область:
              </Typography>
              <Typography variant="body2" display="inline">
                {' '}
                {district}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" display="inline">
                Населенный пункт:
              </Typography>
              <Typography variant="body2" display="inline">
                {' '}
                {city}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Образование
        </Typography>
        {education.map(
          ({ organization, level, graduation_year, specialization }, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" display="inline">
                  Учреждение:
                </Typography>
                <Typography variant="body2" display="inline">
                  {' '}
                  {organization}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" display="inline">
                  Уровень образования:
                </Typography>
                <Typography variant="body2" display="inline">
                  {' '}
                  {level}
                </Typography>
              </Box>
              {specialization ? (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" display="inline">
                    Направление:
                  </Typography>
                  <Typography variant="body2" display="inline">
                    {' '}
                    {specialization}
                  </Typography>
                </Box>
              ) : null}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" display="inline">
                  Год окончания:
                </Typography>
                <Typography variant="body2" display="inline">
                  {' '}
                  {graduation_year}
                </Typography>
              </Box>
            </Box>
          )
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Обо мне
        </Typography>
        <Typography variant="body2" display="inline">
          {additional_info}
        </Typography>
      </Box>
    </Box>
  );
}
