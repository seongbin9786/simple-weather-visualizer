import clsx from "clsx";
import { FaStar } from "react-icons/fa";

interface FavoriteToggleButtonProps<ItemProps extends object> {
  item: ItemProps;
  isToggled: boolean;
  onToggle: (item: ItemProps) => void;
}

export const FavoriteToggleButton = <ItemProps extends object>({
  item,
  isToggled,
  onToggle,
}: FavoriteToggleButtonProps<ItemProps>) => {
  return (
    <div
      className={clsx(
        "m-2 cursor-pointer rounded-md p-2",
        isToggled ? "hover:bg-gray-200" : "hover:bg-yellow-200",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(item);
      }}
      // NOTE: 이 요소에 대한 클릭으로 인한 focus 동작 때문에 input의 blur가 발생시키지 않아야 한다.
      // mousedown 이벤트를 막으면 focus가 발생하지 않는다.
      onMouseDown={(e) => e.preventDefault()}
    >
      <FaStar className={isToggled ? "fill-yellow-400" : "fill-gray-400"} />
    </div>
  );
};
