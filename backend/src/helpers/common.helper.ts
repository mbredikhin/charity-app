export const addPrefix = (obj: any, prefix = '$') =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [`${prefix}${key}`]: obj[key] }),
    {}
  );
