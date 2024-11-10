export const asyncMap = async <Item, Res>(
  arr: Item[],
  callback: (value: Item, index: number, array: Item[]) => Promise<Res>
) => {
  const a = await Promise.all(arr.map(callback));
  return a;
};

export const asyncFlatMap = async <Item, Res>(
  arr: Item[],
  callback: (value: Item, index: number, array: Item[]) => Promise<Res>
) => {
  const a = await Promise.all(arr.map(callback));
  return a.flat();
};
