import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames/bind";
import debounce from "lodash-es/debounce";
import Modal from "../Modal";
import styles from "./SearchPlaygroundModal.module.scss";
import SearchInput from "../SearchInput";
import Button from "../Button/Button";
import useAsyncData from "../../utils/hooks/useAsyncData";
import playgroundService from "../../api/playgroundService";

const cx = cn.bind(styles);

export default function SearchPlaygroundModal({ visible, onClose, onSave }) {
  const elementsRef = useRef({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const getDataRequest = useCallback(
    (newSearch) => playgroundService.search(newSearch),
    []
  );
  const handleSave = () => {
    onSave(selected);
  };
  const { data, isInitialLoading, error, requestData } = useAsyncData(
    getDataRequest,
    {
      runOnMount: false,
    }
  );
  useEffect(() => {
    if (data?.areas) {
      const currentActiveIndex = data.areas.findIndex(
        (pl) => pl.id === selected
      );
      if (currentActiveIndex === -1) {
        setSelected(null);
      }
    }
  }, [data, selected]);
  const debouncedRequest = useMemo(
    () =>
      debounce((newSearch) => {
        requestData(newSearch);
      }, 300),
    [requestData]
  );
  const areas = data?.areas || [];
  const handleChange = (ev) => {
    setSearch(ev.currentTarget.value);
  };
  useEffect(() => {
    if (visible) {
      debouncedRequest(search);
    }
  }, [search, visible, debouncedRequest]);
  const handleKeyDown = (ev) => {
    const isDownButton = ev.code === "ArrowDown";
    const isUpButton = ev.code === "ArrowUp";
    if (!isDownButton && !isUpButton) {
      return;
    }
    ev.preventDefault();
    const startIndex = areas.findIndex((pl) => pl.id === selected);
    const newIndex = (() => {
      if (isDownButton) {
        const index = startIndex + 1;
        return index < areas.length ? index : 0;
      }
      const index = startIndex - 1;
      return index < 0 ? areas.length - 1 : index;
    })();
    if (areas[newIndex]) {
      setSelected(areas[newIndex].id);
      const element = elementsRef.current[areas[newIndex].id];
      if (element) {
        element.scrollIntoView();
      }
    }
  };
  function setElementRef(id) {
    return (element) => {
      elementsRef.current[id] = element;
    };
  }
  function renderContent() {
    if (isInitialLoading) {
      return <span className={cx("block")}>Завантаження...</span>;
    }
    if (error) {
      return (
        <span className={cx("errorMessage", "block")}>{error.message}</span>
      );
    }
    if (!areas?.length) {
      return (
        <span className={cx("block")}>Немає майданчиків, змініть пошук</span>
      );
    }
    return (
      <ul className={cx("searchList", "flex")}>
        {areas.map((playground) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={cx("searchItem", "block", {
              searchItemActive: playground.id === selected,
            })}
            key={playground.id}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex="0"
            ref={setElementRef(playground.id)}
            onClick={() => setSelected(playground.id)}
          >
            Майданчик №{playground.number}({playground.address})
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Modal variant="medium" visible={visible} onClose={onClose}>
      <div className={cx("content", "flex-parent")} onKeyDown={handleKeyDown}>
        <h3 className={cx("title", "static")}>Пошук майданчика</h3>
        <div className={cx("searchBox", "flex-parent")}>
          <SearchInput
            value={search}
            placeholder="Введіть номер майданчика"
            className={cx("searchInput", "static")}
            clear={() => setSearch("")}
            onChange={handleChange}
          />
          {renderContent()}
        </div>
        <div className={cx("actions", "static")}>
          <Button variant={"white"} size={"medium"} onClick={onClose}>
            Відмінити
          </Button>
          <Button
            variant="black"
            size="medium"
            className={cx("action")}
            disabled={!selected}
            onClick={handleSave}
          >
            Зберегти
          </Button>
        </div>
      </div>
    </Modal>
  );
}
