import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, error }) => {
    return (
        <div className="form-group">
            <label className="font-semibold capitalize"
                   style={{
                       color: 'white',
                   }}>
                {label}
            </label>
            <input
                style={{background:'#eadbbf'}}
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