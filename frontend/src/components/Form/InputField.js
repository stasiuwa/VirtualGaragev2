import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, error }) => {
    return (
        <div className="input-group">
            <label className="font-semibold capitalize">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <span className="text-danger">{error}</span>}
        </div>
    );
};

export default InputField;