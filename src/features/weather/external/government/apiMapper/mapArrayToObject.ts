interface Item {
  name: string;
  value: string;
}

export const mapArrayToObject = (items: Item[]) => {
  return items.reduce(
    (sum, curr) => {
      const { name, value } = curr;
      sum[name] = value;
      return sum;
    },
    {} as Record<string, string>,
  );
};
