export const Button = ({ type, buttonType, text, buttonStyle }) => {
  return (
    <button type={type} className={`btn btn-${buttonType} ${buttonStyle}`}>
      {text}
    </button>
  );
};
