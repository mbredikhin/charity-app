import * as pt from 'prop-types';
import { ButtonGroup, Button } from '@mui/material';
import { GridOnOutlined, ListAltOutlined, Room } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ActionButton = styled(Button)(() => ({
  padding: '8px',
  width: '40px',
  height: '40px',
}));

interface RequestsLayoutButtonGroupProps {
  layout: 'vertical' | 'horizontal' | 'map';
  changeLayout: (layout: 'vertical' | 'horizontal' | 'map') => void;
}

export function RequestsLayoutButtonGroup({
  layout,
  changeLayout,
}: RequestsLayoutButtonGroupProps) {
  const buttons: { layout: 'vertical' | 'horizontal' | 'map'; icon: any }[] = [
    {
      layout: 'vertical',
      icon: {
        baseStyle: <GridOnOutlined color="action" />,
        activeStyle: <GridOnOutlined sx={{ color: 'black' }} />,
      },
    },
    {
      layout: 'horizontal',
      icon: {
        baseStyle: <ListAltOutlined color="action" />,
        activeStyle: <ListAltOutlined sx={{ color: 'black' }} />,
      },
    },
    ...(import.meta.env.VITE_MAPS_ENABLED === 'true'
      ? [
          {
            layout: 'map',
            icon: {
              baseStyle: <Room color="action" />,
              activeStyle: <Room sx={{ color: 'black' }} />,
            },
          } as { layout: 'vertical' | 'horizontal' | 'map'; icon: any },
        ]
      : []),
  ];

  return (
    <ButtonGroup
      variant="outlined"
      color="secondary"
      sx={{
        border: '2px',
      }}
      aria-label="Buttons for choosing layout type for requests"
    >
      {buttons.map((button) => {
        const isButtonActive = button.layout === layout;
        const backgroundColor = isButtonActive ? grey[100] : 'white';
        const icon = isButtonActive
          ? button.icon.activeStyle
          : button.icon.baseStyle;
        return (
          <ActionButton
            key={button.layout}
            onClick={() => changeLayout(button.layout)}
            sx={{ backgroundColor }}
          >
            {icon}
          </ActionButton>
        );
      })}
    </ButtonGroup>
  );
}

RequestsLayoutButtonGroup.propTypes = {
  layout: pt.string,
  changeLayout: pt.func,
};
