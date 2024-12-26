import { type CSSProperties, type ReactNode } from "react";

export interface SearchListItemProps<ItemProp extends object> {
  style?: CSSProperties | undefined;
  name: string;
  item: ItemProp;
  onClick: (item: ItemProp) => void;
  asideElement?: ReactNode;
}

export const SearchListItem = <ItemProp extends object>({
  name,
  item,
  onClick,
  asideElement,
  style,
}: SearchListItemProps<ItemProp>) => (
  <div
    onClick={() => onClick(item)}
    className="flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-gray-100"
    style={style}
  >
    <div className="shrink-0">{name}</div>
    {asideElement && <div>{asideElement}</div>}
  </div>
);
