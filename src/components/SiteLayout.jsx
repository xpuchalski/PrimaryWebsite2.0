import { NavLink } from "react-router-dom";

function SiteLayout({ pages, children }) {
  return (
    <>
      <header className="top-nav">
        <nav>
          <ul>
            {pages
              .filter((page) => page.showInNav !== false)
              .map((page) => (
                <li key={page.path}>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={page.path}
                  >
                    {page.navLabel ?? page.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default SiteLayout;
