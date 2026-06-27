export const Input = ({ inputWrapperClass, type, placeholder, labelText, inputId, value, onChange, required }) => {
  return (
    <div className={`mb-3 ${inputWrapperClass}`}>
      <label htmlFor="formGroupExampleInput" className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
