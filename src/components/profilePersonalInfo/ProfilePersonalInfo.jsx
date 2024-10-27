import { Box, Typography } from '@mui/material';

export function PersonalData({ profile }) {
  const {
    lastName,
    name,
    birthdate,
    baseLocations,
    educations,
    additionalInfo,
  } = profile;
  const bigFontProps = { fontWeight: 500, fontSize: 20, lineHeight: 2.5 };
  const smallRegularFontProps = {
    display: 'inline',
    fontWeight: 400,
    fontSize: 14,
  };
  const smallBoldFontProps = {
    display: 'inline',
    fontWeight: 500,
    fontSize: 14,
  };
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={bigFontProps}>Профиль</Typography>
        <Box>
          <Typography sx={smallBoldFontProps}>Фамилия:</Typography>
          <Typography sx={smallRegularFontProps}> {lastName}</Typography>
        </Box>
        <Box>
          <Typography sx={smallBoldFontProps}>Имя:</Typography>
          <Typography sx={smallRegularFontProps}>{name}</Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={bigFontProps}>Дата рождения</Typography>
        <Typography sx={smallRegularFontProps}>
          {birthdate.split('-').reverse().join('.')}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={bigFontProps}>Локация для помощи</Typography>
        {baseLocations.map(({ district, city }) => (
          <Box key={Math.random() * 100} sx={{ mb: 1 }}>
            <Box>
              <Typography sx={smallBoldFontProps}>Область:</Typography>
              <Typography sx={smallRegularFontProps}> {district}</Typography>
            </Box>
            <Box>
              <Typography sx={smallBoldFontProps}>Населенный пункт:</Typography>
              <Typography sx={smallRegularFontProps}> {city}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={bigFontProps}>Образование</Typography>
        {educations.map(({ organizationName, level, graduationYear }) => (
          <Box key={Math.random() * 100} sx={{ mb: 1 }}>
            <Box>
              <Typography sx={smallBoldFontProps}>Учреждение:</Typography>
              <Typography sx={smallRegularFontProps}>
                {organizationName}
              </Typography>
            </Box>
            <Box>
              <Typography sx={smallBoldFontProps}>
                Уровень образования:
              </Typography>
              <Typography sx={smallRegularFontProps}> {level}</Typography>
            </Box>
            <Box>
              <Typography sx={smallBoldFontProps}>Год окончания:</Typography>
              <Typography sx={smallRegularFontProps}>
                {graduationYear}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={bigFontProps}>Обо мне</Typography>
        <Typography sx={smallRegularFontProps}>{additionalInfo}</Typography>
      </Box>
    </Box>
  );
}
