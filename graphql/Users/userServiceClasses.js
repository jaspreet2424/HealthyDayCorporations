const { GraphQLError } = require("graphql");
const { userModel } = require("../../modals/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const GMAIL = "js9316713287@gmail.com";
const GMAIL_PASS = "hfinlclkxcvpcrwp";
const SECRET_TOKEN =
  process.env.SECRET_KEY || "{[(#@24**$ecretKeyFortoken**24@#)]}";

const Models = {
  userDatabaseModel: userModel,
};

class UserHelperMethods {
  static passwordValidation(password) {
    let symReg = /[!@#$%^/|<.>,;:&*?_=+-]/;
    let numRegrex = /[0-9]/;
    return (
      password.length > 8 && symReg.test(password) && numRegrex.test(password)
    );
  }

  static async encryptPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async decryptPassword(userPassword, password) {
    return await bcrypt.compare(password, userPassword);
  }

  static generateOTP(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static async generateToken(user) {
    return jwt.sign({ UserId: user._id, UserEmail: user.email }, SECRET_TOKEN);
  }

  static async mailTransport(mailMessage) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: GMAIL,
        pass: GMAIL_PASS,
      },
    });

    transporter.sendMail(mailMessage, (err, info) => {
      if (err) {
        throw new GraphQLError(
          "Failed to send Notification {User Registration}",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      } else {
        console.log(`Mail Sent Successfully ${info.response}`);
      }
    });
  }
}

class UserServiceClass {
  static async createUser({ name, email, password }) {
    if (!name || !email || !password) {
      throw new GraphQLError("All Input Fields are required", {
        extensions: {
          code: "BAD_USER_INPUT",
          arguments: ["name", "email", "password"],
        },
      });
    }

    const correctPassword = UserHelperMethods.passwordValidation(password);

    if (!correctPassword) {
      throw new GraphQLError(
        "Password is not Secure. Password must be combination of Letters, Symbols and Numbers",
        {
          extensions: { code: "BAD_USER_INPUT", argumentName: "Password" },
        }
      );
    }

    const existingUser = await Models.userDatabaseModel.findOne({ email });

    if (existingUser) {
      throw new GraphQLError("User already registered with this email", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    let userOTP = UserHelperMethods.generateOTP(100000, 999999);

    const newUser = await Models.userDatabaseModel.create({
      name,
      email,
      password: await UserHelperMethods.encryptPassword(password),
      otp: userOTP,
    });

    if (!newUser) {
      throw new GraphQLError("Server Error : Failed to Register User", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }

    const mailMessage = {
      from: GMAIL,
      to: email,
      subject: "Welcome to HealthyDay",
      html: `
          <div style="width: 100%; padding: 10px 20px;">
            <h1 style="text-align: center; color: #283618;">HealthyDay</h1>
            <h5>Account Registration</h5>
            <br>
            <p>Your Account has been Successfully registered with HealthyDay. This is your OTP to verify your account with HealthyDay-<Strong>${userOTP}</Strong>. Please don't share your OTP with anyone.</p>
            <br><br>
            <p>Follow Us on Instagram</p>
            <a href="https://instagram.com">Click Here</a>
            <p>Follow Us on Twitter</p>
            <a href="https://twitter.com">Click Here</a>
            <hr>
            <p>Greetings</p>
            <p>HealthyDay-Corporations</p>
          </div>
        `,
    };

    await UserHelperMethods.mailTransport(mailMessage);

    return "New User Registered successfully";
  }

  static async OTPVerification({ email, otp }) {
    if (!email || !otp) {
      throw new GraphQLError("Missing Data", {
        extensions: {
          code: "BAD_USER_INPUT",
          arguments: ["email", "otp"],
        },
      });
    }

    const isUser = await Models.userDatabaseModel.findOne({ email });

    if (!isUser) {
      throw new GraphQLError("No User found with this Email", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    if (isUser.otp !== otp) {
      throw new GraphQLError("Incorrect OTP", {
        extensions: {
          code: "BAD_USER_INPUT",
          arguments: "OTP",
        },
      });
    }

    if (isUser.otp === otp) {
      isUser.otp = null;
      isUser.userVerified = true;
      await isUser.save();
    }

    return "Otp verified successfully";
  }

  static async resendOTPMethod({ email }) {
    if (!email) {
      throw new GraphQLError("Missing Data", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const isUser = await Models.userDatabaseModel.findOne({ email });

    if (!isUser) {
      throw new GraphQLError("No User found with this Email", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    const userOTP = UserHelperMethods.generateOTP(100000, 999999);
    isUser.otp = userOTP;

    await isUser.save();

    const mailMessage = {
      from: GMAIL,
      to: email,
      subject: "Account Verification",
      html: `
      <div style="width: 100%; padding: 10px 20px;">
        <h1 style="text-align: center; color: #283618; text-decoration : underline;">HealthyDay</h1>
        <br>
        <p>This is your new OTP to verify your account with HealthyDay-<Strong>${userOTP}</Strong>. Please don't share your OTP with anyone.</p>
        <br><br>
        <p>Follow Us on Instagram</p>
        <a href="https://instagram.com">Click Here</a>
        <p>Follow Us on Twitter</p>
        <a href="https://twitter.com">Click Here</a>
        <hr>
        <p>Greetings</p>
        <p>HealthyDay-Corporations</p>
      </div>
    `,
    };

    await UserHelperMethods.mailTransport(mailMessage);

    return "New OTP Send Successfully";
  }

  static async loginUser({ email, password }) {
    if (!email || !password) {
      throw new GraphQLError("All Input fields are required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const isUser = await Models.userDatabaseModel.findOne({ email });

    if (!isUser) {
      throw new GraphQLError("No User found with this email", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (isUser.otp !== null) {
      throw new GraphQLError(
        "Account is not verified, please verify your account first.",
        {
          extensions: {
            code: "BAD_REQUEST",
          },
        }
      );
    }

    const isCorrectPassword = await UserHelperMethods.decryptPassword(
      isUser.password,
      password
    );

    if (!isCorrectPassword) {
      throw new GraphQLError("Password is incorrect", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const userToken = await UserHelperMethods.generateToken(isUser);

    isUser.token = userToken;

    await isUser.save();

    return userToken;
  }

  static async getUserToken(req, res) {
    const token = req.headers.authorization;
    return token.split(" ")[1] || null;
  }

  static async userAuthentication(token) {
    let User = null;
    await jwt.verify(token, SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        throw new GraphQLError("Unauthorised Access", {
          extensions: {
            code: "UNAUTHORISED",
          },
        });
      } else {
        const isUser = await Models.userDatabaseModel.findById(decoded.UserId);

        if (!isUser) {
          throw new GraphQLError("Unauthorised Access. No User Found!", {
            extensions: {
              code: "UNAUTHORISED",
            },
          });
        }

        if (isUser.token !== token) {
          throw new GraphQLError(
            "Unauthorised Access. Invalid Token Provided!",
            {
              extensions: {
                code: "UNAUTHORISED",
              },
            }
          );
        }

        User = isUser;
      }
    });

    return User || null;
  }
}

module.exports = {
  UserServiceClass,
};
