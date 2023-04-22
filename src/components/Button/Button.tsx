import { ButtonColors } from '@/constants';

interface ButtonProps {
  color: ButtonColors;
  onClick: () => void;
  text: string;
}

const Button = ({ color, onClick, text }: ButtonProps): JSX.Element => (
  <button
    className={`button is-${color} is-outlined is-large is-fullwidth`}
    onClick={onClick}
  >
    <span className='has-text-weight-bold is-uppercase'>{text}</span>
  </button>
);

export default Button;
