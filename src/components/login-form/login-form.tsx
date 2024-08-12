import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import clsx from 'clsx';

import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {RequestStatus} from '@/constants';
import {validateEmail, validatePassword} from '@/utils';
import {getLoginResponseErrors, getRequestStatus} from '@/store/user/selectors';
import {login} from '@/store/user/api-actions';

type LoginFormData = {
  email: string;
  password: string;
}

function LoginForm() {
  const dispatch = useAppDispatch();
  const responseErrors = useAppSelector(getLoginResponseErrors);
  const status = useAppSelector(getRequestStatus);
  const isLoading = status === RequestStatus.Pending;
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const isBtnDisabled = isLoading || Object.values(formErrors).some((field) => field.length > 0);

  const validateForm = () => {
    let formValid = true;
    if (!validateEmail(formData.email)) {
      setFormErrors((prevState) => ({ ...prevState, email: 'Wrong Email format' }));
      formValid = false;
    }
    if (!validatePassword(formData.password)) {
      setFormErrors((prevState) => ({ ...prevState, password: 'Password should have both letter and number' }));
      formValid = false;
    }

    return formValid;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  const handleFormDataChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = evt.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  const errorMessages = [...responseErrors, ...Object.values(formErrors)].filter((value) => value !== '');

  return (
    <form className="sign-in__form" onSubmit={handleFormSubmit}>
      <div className="sign-in__fields">
        <div className="sign-in__message">
          <p>
            {
              errorMessages.map((message) => (
                <Fragment key={message}><span>{message}</span><br /></Fragment>
              ))
            }
          </p>
        </div>
        <div className="sign-in__field">
          <input
            className={`sign-in__input ${clsx(formErrors.email.length && 'sign-in__field--error')}`}
            type="email"
            placeholder="Email address"
            name="email"
            id="user-email"
            disabled={isLoading}
            onChange={handleFormDataChange}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">
            Email address
          </label>
        </div>
        <div className="sign-in__field">
          <input
            className={`sign-in__input ${clsx(formErrors.password.length && 'sign-in__field--error')}`}
            type="password"
            placeholder="Password"
            name="password"
            id="user-password"
            disabled={isLoading}
            onChange={handleFormDataChange}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">
            Password
          </label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit" disabled={isBtnDisabled}>
          {isLoading ? 'Loading ...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
