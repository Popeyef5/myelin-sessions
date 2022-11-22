function match(obj: any, filter: string): Boolean {
  if (obj == null) {
    return false;
  }

  return Object.values(obj).some((val) => {
    switch (typeof val) {
      case "number":
        return String(val).includes(filter);
      case "string":
        return val.toLowerCase().includes(filter.toLowerCase());
      case "object":
        return match(val, filter);
      default:
        return false;
    }
  });
}

export function filter(objs: any[], filters: string[]): any[] {
  let ret = objs;
  for (const filter of filters) {
     ret = ret.filter((obj) => match(obj, filter));
  }
  return ret
}
