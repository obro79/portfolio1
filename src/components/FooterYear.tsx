
import { useState, useEffect } from 'react';

const FooterYear: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span id="year">{year}</span>;
};

export default FooterYear;
