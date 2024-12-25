export interface SearchListItemProps<ItemProp extends object> {
  name: string;
  item: ItemProp;
  onClick: (item: ItemProp) => void;
}

export const SearchListItem = <ItemProp extends object>({
  name,
  item,
  onClick,
}: SearchListItemProps<ItemProp>) => (
  <div
    onClick={() => onClick(item)}
    className="cursor-pointer border-b p-2 last:border-b-0 hover:bg-gray-100"
  >
    <div>{name}</div>
  </div>
);
