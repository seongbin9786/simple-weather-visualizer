import { type ReactNode, useState } from "react";

interface SearchProps<ItemProp extends object> {
  items: ItemProp[];
  nameFn: (item: ItemProp) => string;
  renderResult: (searchResult: ItemProp[]) => ReactNode;
}

export const SearchBar = <ItemProp extends object>({
  items,
  nameFn,
  renderResult,
}: SearchProps<ItemProp>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchResult = items.filter((item) =>
    nameFn(item).includes(searchQuery),
  );
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className="relative">
      <input
        className="w-full rounded-md border border-gray-300 p-2"
        type="text"
        value={searchQuery}
        onChange={({ target: { value } }) => setSearchQuery(value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setTimeout(() => setHasFocus(false), 100)} // NOTE: 검색어가 없는 상태라면 blur 시 즉시 사라지므로, onSelect가 호출될 수 있는 시간이 필요
      />
      {hasFocus && (
        <div className="absolute left-0 top-[46px] w-full rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-gray-accent2 pb-2">
            검색 결과 {searchResult.length}개
          </div>
          {renderResult(searchResult)}
        </div>
      )}
    </div>
  );
};
