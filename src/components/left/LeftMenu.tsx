import { Link } from "react-router-dom";

type LeftMenuItem = {
  link: string;
  text: string;
};

function Leftmenu({
  title,
  leftMenu,
}: {
  title: string;
  leftMenu: LeftMenuItem[];
}) {
  return (
    <div className="w-60">
      <h4>{title}</h4>
      <ul>
        {leftMenu.map((item: LeftMenuItem, index: number) => (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leftmenu;
