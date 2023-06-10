export function InputField({
  placeholder,
  labelName,
  setFieldValue,
  fieldValue,
  isValid,
  error,
  type,
  max,
}) {
  const inputId = `board-${labelName.toLowerCase().replace(/\s/g, "-")}-input`;

  const handleChange = (e) => {
    setFieldValue(e.target.value);
  };

  const validateErrorBaseOnType = () => {
    if (["email", "password", "text"].includes(type)) return !fieldValue.trim();
    return fieldValue < 0 || fieldValue > max;
  };

  return (
    <>
      {labelName && <label htmlFor={inputId}>{labelName}</label>}
      <div className="input-container">
        <input
          max={max}
          value={fieldValue}
          onChange={handleChange}
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={!isValid && validateErrorBaseOnType() ? "red-border" : ""}
        />
        {!isValid && validateErrorBaseOnType() && (
          <span className="cant-be-empty-span text-L">{error}</span>
        )}
      </div>
    </>
  );
}

// List of filter options
export const filterList = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Graphic Design",
  "SEO and Digital Marketing",
  "Cybersecurity",
  "Data Analysis and Visualization",
  "Cloud Computing",
  "E-commerce Solutions",
  "IT Consulting",
];

// Function to handle the categories based on the provided options
const categories = (opt) => {
  if (opt) return opt;

  return filterList;
};

export function InputFieldSelect({
  labelName,
  setFieldValue,
  fieldValue,
  optionsValue,
}) {
  return (
    <div className="select-column-container">
      <label className="text-M">{labelName}</label>
      <select
        className="select-status text-L"
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
      >
        {categories(optionsValue).map((col, index) => (
          <option className="status-options" key={index}>
            {col}
          </option>
        ))}
      </select>
    </div>
  );
}

export function InputFieldFile({
  labelName,
  setFieldValue,
  fieldValue,
  isValid,
  error,
}) {
  const inputId = `board-${labelName.toLowerCase().replace(/\s/g, "-")}-input`;

  const handleChange = (e) => {
    setFieldValue(e.target.files[0]);
  };

  return (
    <>
      <label htmlFor={inputId}>{labelName}</label>
      <div className="input-container">
        <input
          onChange={handleChange}
          id={inputId}
          type="file"
          className={!isValid && !fieldValue ? "red-border" : ""}
          style={{ paddingLeft: "10px" }}
        />
        {!isValid && !fieldValue && (
          <span className="cant-be-empty-span text-L">{error}</span>
        )}
      </div>
    </>
  );
}

export function Button({ validate, onSubmit, label, loading }) {
  const handleClick = async () => {
    const isValid = validate();
    if (isValid === true) {
      await onSubmit();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${loading ? "active" : ""}`}
      disabled={loading}
      style={{
        marginInline: "auto",
      }}
    >
      <span className="spiner"></span>
      {label}
    </button>
  );
}
