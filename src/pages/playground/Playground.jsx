import { Box } from '@mui/material';
// import { Requests } from '@/components';
import { AuthForm } from '../../components/authForm';

export function Playground() {
  return (
    <Box>
      {/* <Requests
        layout="horizontal"
        requests={Array.from({ length: 100 }).map((_, index) => ({
          id: String(index),
        }))}
      /> */}
      <Box sx={{ p: 2, border: '1px solid grey', width: 1 / 2 }}>
        <AuthForm
          error={false}
          onSubmit={({ login, password }) => {
            console.log(login);
            console.log(password);
          }}
        />
        <AuthForm error={true} />
      </Box>
    </Box>
  );
}
