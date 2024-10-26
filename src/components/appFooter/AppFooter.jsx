import { Box, Divider, Grid2, Link } from '@mui/material';

export const AppFooter = () => {
  return (
    <>
      <Divider />
      <Box
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '152px',
        }}
      >
        <Grid2 sx={{ flexGrow: 1, maxWidth: '1500px' }} container>
          <Grid2 size="grow" sx={{ display: 'flex', justifyContent: 'start' }}>
            <Link
              underline="hover"
              color="inherit"
              variant="body2"
              href="https://t.me/natti_jun_front/239"
              target="_blank"
            >
              Об ивенте
            </Link>
          </Grid2>
          <Grid2 size={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              underline="hover"
              color="inherit"
              variant="body2"
              href="https://github.com/mbredikhin/react-event"
              target="_blank"
            >
              Github проекта
            </Link>
          </Grid2>
          <Grid2 size="grow" sx={{ display: 'flex', justifyContent: 'end' }}>
            <Link
              underline="hover"
              color="inherit"
              variant="body2"
              href="https://t.me/natti_jun_front_chat"
              target="_blank"
            >
              Чат для джунов
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
