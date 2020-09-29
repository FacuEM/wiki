const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wiki", {
  logging: false,
});
// for Hooks
/* function generateUrlTitle(title) {
  if (title) {
    // Remueve todos los caracteres no-alfanuméricos
    // y hace a los espacios guiones bajos.
    return title.replace(/\s+/g, "_").replace(/\W/g, "");
  } else {
    // Generá de forma aleatoria un string de 5 caracteres
    return Math.random().toString(36).substring(2, 7);
  }
} */
//-- Page Model
class Page extends Sequelize.Model {}
Page.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("open", "closed"),
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    route: {
      type: Sequelize.VIRTUAL,
      get() {
        return "/wiki/" + this.getDataValue("urlTitle");
      },
    },
    /* hooks: {
      beforeValidate: generateUrlTitle,
    }, */
  },
  { sequelize: db, modelName: "page" }
);

//-- User Model
class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize: db, modelName: "user" }
);
//--
Page.beforeValidate(function (page) {
  if (page.title) {
    return (page.urlTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, ""));
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
});
module.exports = {
  Page: Page,
  User: User,
  db: db,
};
