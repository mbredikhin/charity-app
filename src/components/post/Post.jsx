import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

export function Post({ id, title, body, loading, onDeletePost }) {
  return (
    <Card variant="outlined">
      <CardContent
        style={{
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ marginLeft: 'auto' }}
          size="small"
          variant="outlined"
          startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
          onClick={() => onDeletePost(id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  loading: PropTypes.bool,
  onDeletePost: PropTypes.func,
};
