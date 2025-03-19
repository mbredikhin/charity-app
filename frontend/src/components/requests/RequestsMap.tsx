import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
} from '@/lib/ymaps';
import type {
  YMapLocationRequest,
  LngLat,
  YMapMarkerProps,
  LngLatBounds,
} from 'ymaps3';
import { Request } from '@/entities/request';
import { Box } from '@mui/material';
import styles from './RequestsMap.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface RequestsMapProps {
  requests: Request[];
}

type Coords = [lat: number, lon: number];

function getBounds(coordinates: Coords[]) {
  const latitudes = coordinates.map(([latitude]) => latitude);
  const longitudes = coordinates.map(([, longitude]) => longitude);
  return [
    [Math.max(...latitudes), Math.min(...longitudes)],
    [Math.min(...latitudes), Math.max(...longitudes)],
  ] as LngLatBounds;
}

function RequestsMap({ requests }: RequestsMapProps) {
  const coordinates = requests.reduce(
    (acc, request) => [
      ...acc,
      ...(request.locations.map(({ latitude, longitude }) => [
        latitude,
        longitude,
      ]) as Coords[]),
    ],
    [] as Coords[]
  );
  const markers: Omit<YMapMarkerProps, 'popup'>[] = coordinates.map(
    (latLong) => ({
      coordinates: [...latLong] as LngLat,
    })
  );
  const defaultLocation: YMapLocationRequest = {
    bounds: getBounds(coordinates),
  };

  return (
    <Box className={cx('requests-map')}>
      <YMap location={reactify.useDefault(defaultLocation)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {markers.map((marker, index) => (
          <YMapMarker key={index} {...marker}>
            <div className={cx('requests-map__marker')}></div>
          </YMapMarker>
        ))}
      </YMap>
    </Box>
  );
}

export default RequestsMap;
