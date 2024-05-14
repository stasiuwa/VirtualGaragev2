import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="flex justify-between">
            <label className="font-semibold capitalize">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 my-2 border border-gray-300 rounded-md"
            />
        </div>
    );
};

export default InputField;