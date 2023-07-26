import './Title.css';

function Title({ title, className }) {
  return <h2 className={`title ${className}`}>{title}</h2>;
}

export default Title;
