interface Filter {
  [key: string]: any;
}

export function isEmptyFilter(filter: Filter) {
  return !filter || Object.keys(filter).length === 0;
}

// To prevent sending empty filter to the server
export function cleanUpFilter(filter: Filter) {
  const result: Filter = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      result[key] = value;
    }
  });
  return result;
}
