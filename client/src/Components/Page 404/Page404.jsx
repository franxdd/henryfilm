import "../../Styles/components/_Page404.scss";
import imagen from "../../img/imagen-no-encontrada.jpg";
function Page404() {
  return (
    <div className="notfound">
      <img src={imagen} alt="404" />
    </div>
  );
}

export default Page404;
