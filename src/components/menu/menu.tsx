import { NavLink } from "react-router-dom";

export default function Menu() {
    const menuItems = [
        {id: 0, caption: 'Главная', url: "/"},
        {id: 1, caption: 'Поиск', url: "/search"},
        {id: 2, caption: 'Избранное', url: "/favourites"},
    ];

    return (
      <nav className="menu">
          {menuItems.map((item) =>
              <NavLink key={item.id}
                to={item.url}
                className = {({isActive}) => ["menu__item", isActive ? "menu__item-active" : ""].join(" ")}>
                <span>{item.caption}</span>
              </NavLink>
          )}
      </nav>
    )
}
