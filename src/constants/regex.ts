/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 30 chars
 * Note: I upped the max to 30 to try and accommodate for longer names and to be as inclusive as possible. I guess
 * to be as inclusive as possible, we wouldn't want to define a max but this could cause UI issues down the road.
 */
export const name: RegExp = /[a-zA-Z\ ]{3,30}/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): At least one digit is required.
 * (?=.*[a-z]): At least one lowercase letter is required.
 * (?=.*[A-Z]): At least one uppercase letter is required.
 * (?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]): At least one special character is required.
 * .{8,}: Minimum length of 8 characters is required.
 */
export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;
