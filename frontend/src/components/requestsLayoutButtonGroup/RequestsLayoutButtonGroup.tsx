import { Button, ButtonGroup } from '@mui/material';
import { GridOnOutlined, ListAltOutlined, Room } from '@mui/icons-material';
import styles from './RequestsLayoutButtonGroup.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

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
        activeStyle: (
          <GridOnOutlined
            className={cx([
              'requests-layout-button-group__icon',
              'requests-layout-button-group__icon--active',
            ])}
          />
        ),
      },
    },
    {
      layout: 'horizontal',
      icon: {
        baseStyle: <ListAltOutlined color="action" />,
        activeStyle: (
          <ListAltOutlined
            className={cx([
              'requests-layout-button-group__icon',
              'requests-layout-button-group__icon--active',
            ])}
          />
        ),
      },
    },
    ...(import.meta.env.VITE_MAPS_ENABLED === 'true'
      ? [
          {
            layout: 'map',
            icon: {
              baseStyle: <Room color="action" />,
              activeStyle: (
                <Room
                  className={cx([
                    'requests-layout-button-group__icon',
                    'requests-layout-button-group__icon--active',
                  ])}
                />
              ),
            },
          } as { layout: 'vertical' | 'horizontal' | 'map'; icon: any },
        ]
      : []),
  ];

  return (
    <ButtonGroup
      className={cx('requests-layout-button-group')}
      variant="outlined"
      color="secondary"
      aria-label="Buttons for choosing layout type for requests"
    >
      {buttons.map((button) => (
        <Button
          className={cx({
            'requests-layout-button-group__action-button': true,
            'requests-layout-button-group__action-button--active':
              button.layout === layout,
          })}
          key={button.layout}
          onClick={() => changeLayout(button.layout)}
        >
          {button.layout === layout
            ? button.icon.activeStyle
            : button.icon.baseStyle}
        </Button>
      ))}
    </ButtonGroup>
  );
}
