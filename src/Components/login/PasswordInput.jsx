import React, { useState, forwardRef } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./PasswordInput.css";

const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={ref}
        className="login-input"
        type={showPassword ? "text" : "password"}
        {...props}
        style={{ width: '100%', paddingRight: '2.5rem', ...props.style }}
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#6366f1',
          fontSize: '1.3rem',
          userSelect: 'none'
        }}
        title={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </span>
    </div>
  );
});

export default PasswordInput;
