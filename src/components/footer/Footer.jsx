
const Footer = () => {
  const today = new Date();

  return (
    <footer className="footer has-background-dark has-text-light py-2">
      <div className="content has-text-centered">
        <p className="is-size-6">
          © {today.getFullYear()} Crypto Riches | All Rights Reserved
        </p>
        <p className="is-size-7 has-text-grey-light">
          Powered by InternPulse | 💰 Secure & Transparent
        </p>
      </div>
    </footer>
  );
};

export default Footer;

