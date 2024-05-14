import React from 'react';

interface ButtonProps {
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children, disabled }) => {
    return (
        <div>
            <button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</button>
        </div>
    )
}

export default Button
