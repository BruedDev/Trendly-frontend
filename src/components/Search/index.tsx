import { IoIosSearch } from "react-icons/io";
import styles from "./Search.module.scss";

export default function Search() {
  return (
    <div className={styles.search}>
      <h2 className={styles.title}>tìm kiếm</h2>
      <span className={styles.horizontal_line}></span>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input_search}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <button className={styles.search_btn}>
          <IoIosSearch size={22} />
        </button>
      </div>
    </div>
  );
}
