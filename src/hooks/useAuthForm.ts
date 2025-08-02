import { useState } from 'react';
import { AuthFormData, AuthFormErrors } from '../types/auth/types';

export function useAuthForm() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    let error = '';
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = '올바른 이메일 형식을 입력해주세요';
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error = '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다';
        }
        break;
      case 'name':
        if (value && !validateName(value)) {
          error = '이름은 2자 이상 입력해주세요';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return {
    formData,
    errors,
    setFormData,
    setErrors,
    handleInputChange,
    validateEmail,
    validatePassword,
    validateName,
  };
}
