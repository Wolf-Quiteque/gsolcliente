import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Layout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [usuario, setusuario] = useState();

  const getsession = async () => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  };

  const getinfo = async () => {
    const res = await fetch("/api/usuarios/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const data = await res.json();
    setusuario(data);
  };

  useEffect(() => {
    getsession();
    if (session) {
      getinfo();
    }
  }, [status, session]);

  return (
    <>
      {status == "authenticated" ? (
        router.pathname != "/empresa/[empresa_id]" ? (
          <div
            className={
              router.pathname == "/login"
                ? "wrapper login-page-inactivo"
                : router.pathname == "/recuperacao"
                ? "wrapper login-page-inactivo"
                : router.pathname == "/empresa/[empresa_id]"
                ? "wrapper login-page-inactivo"
                : "login-page-activo"
            }
          >
            <nav className="main-header navbar navbar-expand navbar-white navbar-light sticky-top">
              <ul className="navbar-nav">
                <Link href="/">
                  <li className="nav-item mt-3">
                    <h4>
                      <i className=" fas fa-solid fa-circle text-success"></i>{" "}
                      {usuario && usuario.nome}
                    </h4>
                  </li>
                </Link>

                {/* <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Clientes
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <Link href="/cliente-pipeline">
                  <a className="dropdown-item">Pipeline</a>
                </Link>
              </li>

              <li>
                <a href="#/vendas" className="dropdown-item">
                  Vendas
                </a>
              </li>

              <li>
                <a href="#/crm-clientes" className="dropdown-item">
                  Ver clientes
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Negociações
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <a href="#/negociacao" className="dropdown-item">
                  Nova
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item">
                  ver negociações
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Empresas
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <Link href="/cadastar-empresa">
                  <a className="dropdown-item">Nova</a>
                </Link>
              </li>
              <li>
                <Link href="/ver-empresas">
                  <a className="dropdown-item">Gerir Empresas</a>
                </Link>
              </li>
            </ul>
          </li>*/}
              </ul>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="navbar-search-block">
                    <form className="form-inline">
                      <div className="input-group input-group-sm">
                        <input
                          className="form-control form-control-navbar"
                          type="search"
                          placeholder="Pesquisar Empresa"
                          aria-label="Search"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                          </button>
                          <button
                            className="btn btn-navbar"
                            type="button"
                            data-widget="navbar-search"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <li></li>
                <li className="nav-item dropdown">
                  {usuario && (
                    <Link href={"/messeges/" + usuario.idempresa}>
                      <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments"></i>
                      </a>
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    onClick={signOut}
                  >
                    <i className="fas fa-power-off text-danger"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#" role="button">
                    <i className="fas fa-email"></i>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="content-wrapper">
              <div className="content">
                <div className="container">{children}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-page-activo">{children}</div>
        )
      ) : (
        <div
          className={
            router.pathname == "/login"
              ? "login-page-activo"
              : router.pathname == "/recuperacao"
              ? "login-page-activo"
              : "login-page-inactivo"
          }
        >
          {children}
        </div>
      )}
    </>
  );
}
