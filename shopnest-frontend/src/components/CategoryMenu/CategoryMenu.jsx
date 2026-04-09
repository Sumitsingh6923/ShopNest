import { NavLink } from "react-router-dom";
import styles from "./CategoryMenu.module.css";

const CategoryMenu = () => {
  const getCategoryClassName = ({ isActive }) =>
    `${styles.categoryItem} ${isActive ? styles.activeCategory : ""}`;

  return (
    <div className={styles.categoryMenu}>
      <div className={styles.categoryContainer}>
        <NavLink className={getCategoryClassName} to="/">
          All
        </NavLink>
        <NavLink className={getCategoryClassName} to="/category/men">
          Men
        </NavLink>
        <NavLink className={getCategoryClassName} to="/category/women">
          Women
        </NavLink>
        <NavLink className={getCategoryClassName} to="/category/electronics">
          Electronics
        </NavLink>
        <NavLink className={getCategoryClassName} to="/category/shoes">
          Shoes
        </NavLink>
        <NavLink className={getCategoryClassName} to="/category/accessories">
          Accessories
        </NavLink>
      </div>
    </div>
  );
};

export default CategoryMenu;
