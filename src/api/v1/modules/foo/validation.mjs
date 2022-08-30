import lodash from 'lodash';

const body = {
  type: 'object',
  required: ['name', 'email', 'password', 'phone'],
  properties: {
    name: { type: 'string', maxLength: 100 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', maxLength: 100, format: 'email' },

    phone: { type: 'string', pattern: '^\\+639\\d{9}$' },
    photo: { type: 'string', maxLength: 300, format: 'url' },
    gender: { type: 'string', enum: ['Male', 'Female', 'Unspecified'] },

    active: { type: 'boolean' },
    verified: { type: 'boolean' },
    banReason: { type: 'string', maxLength: 100 },
    birthDate: { type: 'string', format: 'date-time' },
  },
};

const query = {
  _id: {
    anyOf: [
      { type: 'string', maxLength: 30 },
      { type: 'array', items: { type: 'string', maxLength: 30 } },
    ],
  },
  active: { type: 'boolean' },
};

export default {
  postSchema: { schema: { body } },
  getSchema: { schema: { querystring: query } },
  patchSchema: { schema: { body: lodash.pick(body, ['type', 'properties']) } },
};
