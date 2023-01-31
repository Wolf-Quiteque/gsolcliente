import Head from "next/head";
import Link from "next/link";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Gsmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>HELLO</h1>
      </main>
    </div>
  );
}
