export const useValidation = () =>  {
  
  const validateEmail = (email: string) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  /*
    * password validation, should contain:
    * (?=.*\d): At least one digit is required.
    * (?=.*[a-z]): At least one lowercase letter is required.
    * (?=.*[A-Z]): At least one uppercase letter is required.
    * (?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]): At least one special character is required.
    * .{8,}: Minimum length of 8 characters is required.
 */
  const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;
    return regex.test(password);
  }
    
  return { validateEmail, validatePassword}
};