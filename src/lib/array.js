/**
 * Split an array into consecutive groups of at most `size` items.
 *
 * @template T
 * @param {T[]} items
 * @param {number} size
 * @returns {T[][]}
 */
export function chunk(items, size) {
  if (size <= 0) return [items];

  return items.reduce((groups, item, index) => {
    if (index % size === 0) groups.push([]);
    groups[groups.length - 1].push(item);
    return groups;
  }, []);
}

/**
 * Return the item at `index`, wrapping around both ends of the array.
 *
 * @template T
 * @param {T[]} items
 * @param {number} index
 * @returns {T | undefined}
 */
export function wrapIndex(items, index) {
  if (items.length === 0) return undefined;
  return items[((index % items.length) + items.length) % items.length];
}
