/** Shown on the admin login screen. Plain <img>: the admin bundle has no next/image loader config. */
export function AdminLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/logo.png" alt="هات پست" style={{ height: 56, width: "auto", maxWidth: "100%" }} />
  );
}
