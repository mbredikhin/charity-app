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
import styles from './Map.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

type Coords = [lat: number, lon: number];

function getLocationLimits(coordinates: Coords[]) {
  const latitudes = coordinates.map(([latitude]) => latitude);
  const longitudes = coordinates.map(([, longitude]) => longitude);
  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLng = Math.max(...longitudes);
  const minLng = Math.min(...longitudes);
  return [
    [maxLat, minLng],
    [minLat, maxLng],
  ] as LngLatBounds;
}

interface MapProps {
  requests: Request[];
}

function Map({ requests }: MapProps) {
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

  const markersGeoJsonSource: Omit<YMapMarkerProps, 'popup'>[] =
    coordinates.map((latLong) => ({
      coordinates: [...latLong] as LngLat,
    }));

  const location: YMapLocationRequest = {
    bounds: getLocationLimits(coordinates),
  };

  return (
    <div style={{ width: '1000px', height: '850px' }}>
      <YMap location={reactify.useDefault(location)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {markersGeoJsonSource.map((markerSource, i) => (
          <YMapMarker key={i} {...markerSource}>
            <div className={cx('marker')}></div>
          </YMapMarker>
        ))}
      </YMap>
    </div>
  );
}

export default Map;
