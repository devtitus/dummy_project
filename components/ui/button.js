export const Button = ({ type, buttonType, text, buttonStyle, disabled }) => {
  return (
    <button type={type} className={`btn btn-${buttonType} ${buttonStyle}`} disabled={disabled}>
      {text}
    </button>
  );
};
