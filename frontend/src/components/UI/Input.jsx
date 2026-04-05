import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  helperText,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`mb-5 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 bg-white border rounded-xl text-sm
            transition-all duration-300
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/30' 
              : isFocused
                ? 'border-blue-500 ring-4 ring-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            }
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center">
          <span className="mr-1">⚠️</span> {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;