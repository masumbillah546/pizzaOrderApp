import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

export const isValidEmail = (username: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(username);
};

export const strongRegexForPassword = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);
export const mediumRegexForPassword = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
);

export const passwordValidationRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const emailValidationRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getCharacterValidationError = (str = '') => {
  return `Your password must have at least 1 ${str} character`;
};

const DATE_FORMAT = 'YYYY-MM-DD';
export const viewDateFormat = (date: string, format = DATE_FORMAT) => {
  if (date) {
    return moment(date).format(format);
  }
  return 'N/A';
};

export const formatViewsCount = (views = 0) => {
  if (views < 1000) {
    return views.toString();
  } else if (views >= 1000 && views < 1_000_000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else if (views >= 1_000_000 && views < 1_000_000_000) {
    return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (views >= 1_000_000_000) {
    return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
};

export function formatTimeDifference(startDate, endDate = moment.utc()) {
  const start = moment.utc(startDate);
  const end = moment.utc(endDate);

  const duration = moment.duration(end.diff(start));

  const minutes = Math.floor(duration.asMinutes());
  const hours = Math.floor(duration.asHours());
  const days = Math.floor(duration.asDays());

  let value;
  let unit;

  if (days >= 365) {
    value = Math.floor(days / 365);
    unit = value > 1 ? 'years' : 'year';
  } else if (days >= 30) {
    value = Math.floor(days / 30);
    unit = value > 1 ? 'months' : 'month';
  } else if (days >= 7) {
    value = Math.floor(days / 7);
    unit = value > 1 ? 'weeks' : 'week';
  } else if (hours >= 24) {
    value = days;
    unit = value > 1 ? 'days' : 'day';
  } else if (hours >= 1) {
    value = hours;
    unit = value > 1 ? 'hours' : 'hour';
  } else {
    value = Math.max(1, minutes);
    unit = value > 1 ? 'minutes' : 'minute';
  }

  return `${value} ${unit}`;
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const radiusKm = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radiusKm * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getCoordinates = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        const coordinates = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        resolve(coordinates);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  });
};

export function decodeQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};
  const pairs = queryString.split('&');

  pairs.forEach(pair => {
    const [rawKey, rawValue] = pair.split('=');
    if (rawKey) {
      const key = decodeURIComponent(rawKey);
      const value = rawValue ? decodeURIComponent(rawValue) : '';
      params[key] = value;
    }
  });

  return params;
}

export const encodeQuery = (data: any) => {
  let query = '?';
  for (const d in data) {
    if (data[d]) {
      query += `${encodeURIComponent(d)}=${encodeURIComponent(data[d])}&`;
    }
  }
  return query.slice(0, -1);
};

export const handleFormErrors = (errors: any, setError: any) => {
  Object.entries(errors).forEach(([key, value]: any) => {
    setError(key, {
      type: 'manual',
      message: value[0],
    });
  });
};
