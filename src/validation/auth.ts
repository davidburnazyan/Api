const yup = require("yup");

// Hidden for simplicity

const authScheme = yup.object({
  body: yup.object({
    url: yup.string().url().required(),
    title: yup.string().min(8).max(32).required(),
    content: yup.string().min(8).max(255).required(),
    contact: yup.string().email().required(),
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

module.exports = {
  authScheme,
};
