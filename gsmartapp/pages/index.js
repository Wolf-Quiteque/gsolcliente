import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [anuncios, setanuncios] = useState();

  const getAnuncios = async () => {
    const res = await fetch("/api/anuncio/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setanuncios(data);
  };

  useEffect(() => {
    getAnuncios();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Gsmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />
        <div className="row mt-5">
          {anuncios &&
            anuncios.map((a) => (
              <div className="col-md-6 mb-5">
                <div className="card">
                  <div className="card-body">
                    {a.img != "none" && (
                      <img src={a.img} className="img-thumbnail" />
                    )}
                  </div>
                  <div className="card-footer">
                    {" "}
                    {a.text != "none" && <h5>{a.text}</h5>}{" "}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
