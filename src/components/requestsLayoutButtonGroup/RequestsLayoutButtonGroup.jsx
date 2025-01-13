import { ButtonGroup, Button } from '@mui/material';
import { GridOnOutlined, ListAltOutlined, Room } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export function RequestsLayoutButtonGroup({ handleLayoutChange }) {
  const ActionButton = styled(Button)(({ theme }) => ({
    padding: '8px',
    width: '40px',
    height: '40px',
  }));

  return (
    <ButtonGroup
      variant="outlined"
      color="secondary"
      sx={{
        border: '2px',
      }}
      aria-label="Buttons for choosing layout type for requests"
    >
      <ActionButton data-layout-type="vertical" onClick={handleLayoutChange}>
        <GridOnOutlined color="action" />
      </ActionButton>
      <ActionButton data-layout-type="horizontal" onClick={handleLayoutChange}>
        <ListAltOutlined color="action" />
      </ActionButton>
      <ActionButton data-layout-type="map" onClick={handleLayoutChange}>
        <Room color="action" />
      </ActionButton>
    </ButtonGroup>
  );
}
