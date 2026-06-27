export const Input = ({ inputWrapperClass, type, placeholder, labelText, value, onChange, required }) => {
  return (
    <div className={`mb-3 ${inputWrapperClass}`}>
      <label htmlFor="formGroupExampleInput" className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
