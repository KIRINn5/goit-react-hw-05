import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h3 className={css.title}>
        <MdErrorOutline className={css.icons} />
        Error
      </h3>
      <Link to="/" className={css.link}>
        Go back
      </Link>
    </div>
  );
};
export default NotFoundPage;
