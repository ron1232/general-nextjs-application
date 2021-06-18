import Tokens from 'csrf';
const tokens = new Tokens();

const secret = process.env.CSRF_SECRET || 'dfgdfher7645yw45w';
export const csrfToken = tokens.create(secret);

export const verifyCsrfToken = (token) => {
  if (!tokens.verify(secret, token)) {
    throw new Error('Invalid Token');
  }
};
