const Footer = () => {
  const today = new Date();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Copyright &copy; {today.getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;

