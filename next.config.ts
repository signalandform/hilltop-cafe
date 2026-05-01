import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/menu.html",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/print-menu.html",
        destination: "/print-menu",
        permanent: true,
      },
      {
        source: "/menu-board-coffee.html",
        destination: "/menu-board/coffee",
        permanent: true,
      },
      {
        source: "/menu-board-matcha.html",
        destination: "/menu-board/matcha",
        permanent: true,
      },
      {
        source: "/menu-board-specialty.html",
        destination: "/menu-board/pastries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
