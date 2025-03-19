import { Box, Typography } from '@mui/material';
import { PersonalDataEntry } from './lib';
import styles from './PersonalDataBlock.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface PersonalDataBlockProps {
  title?: string;
  entries: PersonalDataEntry[] | PersonalDataEntry[][];
}

export function PersonalDataBlock({ title, entries }: PersonalDataBlockProps) {
  function renderEntries(entries: PersonalDataEntry[]) {
    return entries.map(([title, value]) =>
      value ? (
        <Box className={cx('personal-data-block')} key={title}>
          {title ? <Typography variant="subtitle2">{title}</Typography> : null}
          <Typography variant="body2">{value}</Typography>
        </Box>
      ) : null
    );
  }
  return (
    <Box className={cx('personal-data-group')}>
      {title ? (
        <Typography className={cx('personal-data-group__title')} variant="h6">
          {title}
        </Typography>
      ) : null}
      {Array.isArray(entries[0][0])
        ? (entries as PersonalDataEntry[][]).map((group, groupIndex) => (
            <Box key={groupIndex}>{renderEntries(group)}</Box>
          ))
        : renderEntries(entries as PersonalDataEntry[])}
    </Box>
  );
}
