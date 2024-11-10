export function xor(a, b) {
  return [
    ...a.filter((element) => !b.includes(element)),
    ...b.filter((element) => !a.includes(element)),
  ];
}

export function get(obj, path) {
  if (!path) {
    return obj;
  }
  const pathParts = path.split('.');
  const key = pathParts[0];
  return pathParts.length === 1
    ? obj[key]
    : get(obj[key], pathParts.slice(1).join('.'));
}

export function set(obj, path, value) {
  if (!path) {
    return obj;
  }
  const pathParts = path.split('.');
  const key = pathParts[0];
  if (pathParts.length === 1) {
    obj[key] = value;
  }
  return set(obj[key], pathParts.slice(1).join('.'), value);
}

function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function flatten(obj, head = '') {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(isObject(value)
        ? flatten(value, `${head}${key}.`)
        : { [`${head}${key}`]: value }),
    }),
    {}
  );
}

export function lens(obj, path) {
  if (!path) {
    return obj;
  }
  const pathParts = path.split('.');
  if (pathParts.length === 1) {
    return { [path]: obj[path] };
  }
  const key = pathParts[0];
  const value = obj[key];
  return {
    [key]: lens(value, pathParts.slice(1).join('.')),
  };
}
