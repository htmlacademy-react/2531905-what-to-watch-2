import Logo from '@/components/logo/logo';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <Logo light />

      <div className="copyright">
        <p>© {year} What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
