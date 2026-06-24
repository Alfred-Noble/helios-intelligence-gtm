import Link from "next/link";

export default function Footer() {

  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "60px",
        padding: "20px",
        color: "#94a3b8"
      }}
    >
      <Link
        href="/about"
        style={{
          color: "#60a5fa",
          textDecoration: "none"
        }}
      >
        About Helios
      </Link>

      <br />
      <br />

      Built by Alfred Noble
    </footer>
  );
}