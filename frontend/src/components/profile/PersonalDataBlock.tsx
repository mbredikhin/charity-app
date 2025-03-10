import { Box, Typography } from '@mui/material';
import { PersonalDataEntry } from './lib';

interface PersonalDataBlockProps {
  title?: string;
  entries: PersonalDataEntry[] | PersonalDataEntry[][];
}

export function PersonalDataBlock({ title, entries }: PersonalDataBlockProps) {
  function renderEntries(entries: PersonalDataEntry[]) {
    return entries.map(([title, value]) =>
      value ? (
        <Box
          key={title}
          sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}
        >
          {title ? <Typography variant="subtitle2">{title}</Typography> : null}
          <Typography variant="body2">{value}</Typography>
        </Box>
      ) : null
    );
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {title ? (
        <Typography variant="h6" sx={{ lineHeight: 3 }}>
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
