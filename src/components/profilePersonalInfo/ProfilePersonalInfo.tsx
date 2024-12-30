import { Box, Typography } from '@mui/material';
import { Profile } from '@/entities/profile';

interface ProfilePersonalInfoProps {
  profile: Profile;
}

export function ProfilePersonalInfo({ profile }: ProfilePersonalInfoProps) {
  const {
    lastName,
    name,
    birthdate,
    baseLocations,
    educations,
    additionalInfo,
  } = profile;
  const formatedBirthdate = new Date(birthdate).toLocaleDateString();
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
            {lastName}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" display="inline">
            Имя:
          </Typography>
          <Typography variant="body2" display="inline">
            {' '}
            {name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Дата рождения
        </Typography>
        <Typography variant="body2" display="inline">
          {' '}
          {formatedBirthdate}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
          Локация для помощи
        </Typography>
        {baseLocations.map(({ district, city }, index) => (
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
        {educations.map(
          (
            { organizationName, level, graduationYear, specialization = null },
            index
          ) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" display="inline">
                  Учреждение:
                </Typography>
                <Typography variant="body2" display="inline">
                  {' '}
                  {organizationName}
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
                  {graduationYear}
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
          {additionalInfo}
        </Typography>
      </Box>
    </Box>
  );
}
