import { toast } from 'react-toastify';

export function xor(a: any[], b: any[]) {
  return [
    ...a.filter((element) => !b.includes(element)),
    ...b.filter((element) => !a.includes(element)),
  ];
}

export function get(obj: Record<string, any>, path: string): any {
  if (!path) {
    return obj;
  }
  const pathParts = path.split('.');
  const key = pathParts[0];
  return pathParts.length === 1
    ? obj[key]
    : get(obj[key], pathParts.slice(1).join('.'));
}

export function set(obj: Record<string, any>, path: string, value: any) {
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

function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function flatten(
  obj: Record<string, any>,
  head = ''
): Record<string, any> {
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

export function lens(
  obj: Record<string, any>,
  path: string
): Record<string, any> {
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

export function toDictionary<K extends string | number | symbol, T extends any>(
  list: T[],
  key = 'id',
  transform = (el: T) => el
) {
  return list.reduce(
    ([dictionary, ids], element: T) => {
      const id = element[key as keyof T] as K;
      return [
        { ...dictionary, [id]: transform(element) },
        [...(ids as K[]), id],
      ];
    },
    [{} as Record<K, any>, [] as K[]]
  );
}

export function toList<K extends string | number | symbol>(
  dictionary: Record<K, any>,
  keys: K[]
) {
  return keys.map((key) => dictionary[key]);
}

export function donationNotify() {
  return toast.success('Спасибо за ваш вклад!', {
    position: 'bottom-right',
  });
}

export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const result = { ...obj };

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete result[key];
  }

  return result as Omit<T, K>;
}
