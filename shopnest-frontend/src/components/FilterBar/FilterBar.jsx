import { useState } from "react";
import styles from "./FilterBar.module.css";

const noop = () => {};

const FilterBar = ({ onSort = noop }) => {
  const [draftSort, setDraftSort] = useState("");

  const applyFilters = () => {
    onSort(draftSort);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterRight}>
        <select
          className={styles.select}
          value={draftSort}
          onChange={(e) => setDraftSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="priceLow">Price Low → High</option>
          <option value="priceHigh">Price High → Low</option>
        </select>

        <button className={styles.filterButton} onClick={applyFilters} type="button">
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
