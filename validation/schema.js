const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const passwordOptions = {
  min: 8,
  max: 100,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: Infinity,
};
const phoneOptions = {
  min: 10,
  max: 10,
  lowerCase: 0,
  upperCase: 0,
  numeric: 10,
  symbol: 0,
  requirementCount: Infinity,
};

/* creating the structure for storing data of User  */
const userSchema = new mongoose.Schema(
  {
    token: String,
    name: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    phone: String,
    password: String,
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);
/* creating collection for database of User*/
const User = new mongoose.model("User", userSchema);

/* creating the structure for storing data of addData  */
const addDataSchemaMongoose = new mongoose.Schema(
  {
    email : String,
    title: String,
    detail: String,
    attachment: String,
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);
/* creating collection for database */
const taskManager = new mongoose.model("taskManager", addDataSchemaMongoose);

/* creating Schema for signup  */
const signupSchema = joi.object({
  name: joi.string().min(4).max(30).required(),
  email: joi
    .string()
    .email({ tlds: { allow: ["com", "in"] } })
    .required(),
  password: passwordComplexity(passwordOptions).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  phoneNumber: passwordComplexity(phoneOptions).required(),
});

/* creating Schema for login  */
const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: ["com", "in"] } })
    .required(),
  password: passwordComplexity(passwordOptions).required(),
});

/* creating Schema for addData  */
const addDataSchema = joi.object({
  title: joi.string().min(1).required(),
  detail: joi.string().min(1).required(),
  attachment: joi.string().min(1),
});
const deleteSchema = joi.object({
    _id : joi.string().min(24).max(24).required(),
  });
const updateSchema = joi.object({
    _id : joi.string().min(24).max(24).required(),
    title: joi.string().min(1),
    detail: joi.string().min(1),
    attachment: joi.string().min(1),
  }).min(2);

const schemaValidate = (schema, body) => {
  const result = schema.validate(body);
  if (result.error) throw new Error(result.error.message);
};

module.exports = {
  signupSchema,
  loginSchema,
  addDataSchema,
  updateSchema,
  deleteSchema,
  schemaValidate,
  userSchema,
  addDataSchemaMongoose,
  User,
  taskManager,
};
