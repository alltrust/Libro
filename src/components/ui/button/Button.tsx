interface ButtonProps {
  label: string;
  status: 'primary' | 'secondary' | 'tertiary';
  onClick: () => void;
  disabled?: boolean;
  isFormat?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  status,
  onClick,
  disabled,
  isFormat,
}) => {
  const btnVariatnts = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
  };

  return (
    <button
      className={`btn ${btnVariatnts[status]}${
        disabled ? ' opacity-25 cursor-not-allowed' : ''
      } ${
        isFormat
          ? ' absolute top-1 right-1 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
export type { ButtonProps };
