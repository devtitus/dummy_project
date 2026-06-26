export const Button = ({ buttonType, text, buttonStyle }) => {
  return (
    <button type="button" className={`btn btn-${buttonType} ${buttonStyle}`}>
      {text}
    </button>
  );
};
