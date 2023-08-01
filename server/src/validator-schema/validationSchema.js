const createUserProviderSchema = {
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Name must be at least 2 characters long',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
  },

  email: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/@.*\.com$/.test(value)) {
          throw new Error('Invalid email format');
        }
        return true;
      },
      notEmpty: {
        errorMessage: 'Email cannot be empty',
      },
    },
  },

  image: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/\.(png|jpg|jpeg)$/.test(value)) {
          throw new Error('Image must have a valid extension png, jpg, jpeg');
        }
        return true;
      },
    },
    optional: true,
  },
  bio: {
    in: ['body'],
    isString: {
      errorMessage: 'Invalid bio',
    },
    optional: true,
  },
  role: {
    in: ['body'],
    isString: {
      errorMessage: 'Invalid role value',
    },
    optional: true,
  },
  socials: {
    in: ['body'],
    isArray: {
      errorMessage: 'Socials must be an array',
    },
    optional: true,
  },
  'social.*.name': {
    isString: {
      errorMessage: 'Invalid name in socials',
    },
    optional: true,
  },
  'social.*.link': {
    isURL: {
      errorMessage: 'Invalid link in socials',
    },
    optional: true,
  },
};

const createUserSchema = {
  name: {
    in: ['body'],
    isLength: {
      options: { min: 2 },
      errorMessage: 'Name must be at least 2 characters long',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
  },
  email: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/@.*\.com$/.test(value)) {
          throw new Error('Invalid email format');
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
  },
  password: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}/.test(value)) {
          throw new Error(
            'Password must contain at least one alphabet, one number, one special character, and be minimum 6 characters long'
          );
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'password cannot be empty',
    },
  },
  image: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/\.(png|jpg|jpeg)$/.test(value)) {
          throw new Error('Image must have a valid extension png, jpg, jpeg');
        }
        return true;
      },
    },
    optional: true,
  },
  bio: {
    in: ['body'],
    isString: {
      errorMessage: 'Invalid bio',
    },
    optional: true,
  },
  role: {
    in: ['body'],
    isString: {
      errorMessage: 'Invalid role value',
    },
    optional: true,
    // notEmpty: {
    //   errorMessage: 'Role cannot be empty',
    // },
  },
  socials: {
    in: ['body'],
    isArray: {
      errorMessage: 'Socials must be an array',
    },
    optional: true,
  },
  'social.*.name': {
    isString: {
      errorMessage: 'Invalid name in socials',
    },
    optional: true,
  },
  'social.*.link': {
    isURL: {
      errorMessage: 'Invalid link in socials',
    },
    optional: true,
  },
};

const loginUserSchema = {
  email: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/@.*\.com$/.test(value)) {
          throw new Error('Invalid email');
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
  },
  password: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}/.test(value)) {
          throw new Error(
            'Password must contain at least one alphabet, one number, one special character, and be minimum 6 characters long'
          );
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'password cannot be empty',
    },
  },
};

const idSchema = {
  id: {
    in: ['params'],
    isString: {
      errorMessage: 'Invalid id',
    },
    notEmpty: {
      errorMessage: 'id cannot be empty',
    },
  },
};

const slugSchema = {
  slug: {
    in: ['params'],
    isString: {
      errorMessage: 'Invalid slug',
    },
    notEmpty: {
      errorMessage: 'Slug cannot be empty',
    },
  },
};

// body("age", "Invalid age")
// .optional({ values: "falsy" })
// .isISO8601()
// .toDate(),
// // …

const createSchema = {
  name: {
    in: ['body'],
    isLength: {
      options: { min: 2 },
      errorMessage: 'Name must be at least 2 characters long',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
  },
  organizer: { in: ['body'], isString: true, notEmpty: true },
  description: { in: ['body'], isString: true, notEmpty: true },

  address: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (
          typeof JSON.parse(value) !== 'object' ||
          Array.isArray(JSON.parse(value))
        ) {
          throw new Error('Address must be an object');
        }
        if (
          JSON.parse(value).isOnline === false &&
          JSON.parse(value).location.length === 0
        ) {
          throw new Error('If event is offline it should have a location');
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'Address cannot be empty',
    },
  },
  image: {
    in: ['body'],
    isString: true,
    // custom: {
    //   options: (value) => {
    //     if (!/\.(png|jpg|jpeg)$/.test(value)) {
    //       throw new Error('Image must have a valid extension png, jpg, jpeg'),
    //     }
    //     return true,
    //   },
    // },
    optional: true,
  },
  date: {
    in: ['body'],
    isDate: {
      errorMessage: 'Invalid date value',
    },
    notEmpty: {
      errorMessage: 'date cannot be empty',
    },
  },
  // time: {
  //   in: ['body'],
  //   notEmpty: {
  //     errorMessage: 'Time cannot be empty',
  //   },
  // },
  time: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/^\d{2}:\d{2}$/.test(value)) {
          throw new Error('Invalid time value');
        }
        const [hours, minutes] = value.split(':').map(Number);
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          throw new Error('Invalid time value');
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'Time cannot be empty',
    },
  },
  duration: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!/^\d+$/.test(value)) {
          throw new Error('Invalid duration value');
        }
        if (Number(value) < 1) {
          throw new Error('Duration must be greater than 0');
        }
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'duration cannot be empty',
    },
  },
  tags: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Tags must be an array');
        }
        if (JSON.parse(value).length < 1) {
          throw new Error('Tags array must contain at least one item');
        }
        return true;
      },
      notEmpty: {
        errorMessage: 'Tags array must not be empty',
      },
    },
  },
  speakers: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Speakers must be an array');
        }
        if (JSON.parse(value).length < 1) {
          throw new Error('Speakers array must contain at least one item');
        }
        JSON.parse(value).forEach((speaker) => {
          if (!speaker.name || !speaker.profile || !speaker.designation) {
            throw new Error(
              'Each speaker must have a name, profile, and designation'
            );
          }
          if (speaker.socials && !Array.isArray(speaker.socials)) {
            throw new Error('Socials must be an array');
          }
        });
        return true;
      },
    },
    notEmpty: {
      errorMessage: 'Speakers cannot be empty',
    },
  },
  requiresTicket: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'Invalid value for requiresTicket',
    },
    notEmpty: {
      errorMessage: 'requiresTicket cannot be empty',
    },
  },
  sponsors: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Sponsors must be an array');
        }
        return true;
      },
      optional: true,
    },
  },
};

const deleteSchema = {
  id: {
    in: ['body'],
    isString: true,
    optional: true,
  },
};

export const validationSchema = {
  createUserProviderSchema,
  createUserSchema,
  loginUserSchema,
  idSchema,
  slugSchema,
  createSchema,
  deleteSchema,
};
