const { buildSchema, graphql } = require("graphql");
const { ProductServices } = require("./products/service");
const { UserServices } = require("./Users/service");
const { UserServiceClass } = require("./Users/userServiceClasses");

const mySchema = buildSchema(`
  ${ProductServices.ProductSchema}
  ${UserServices.UserSchema}

  type Query {
    ${ProductServices.ProductQueries}
    ${UserServices.UserQueries}
  }

  type Mutation{
    ${ProductServices.ProductMutations}
    ${UserServices.UserMutations}
  }
`);

const root = {
  ...ProductServices.ProductResolvers.queries,
  ...UserServices.UserResolver.queries,

  ...ProductServices.ProductResolvers.mutations,
  ...UserServices.UserResolver.mutations,
};

const handleGraphQLRequest = async (req, res, headers, body) => {
  try {
    const { query, variables } = JSON.parse(body);

    const response = await graphql({
      schema: mySchema,
      source: query,
      rootValue: root,
      variableValues: variables,
      contextValue: {
        authentication: async() => {
          const session_token = await UserServiceClass.getUserToken(req , res);
  
          if (session_token) {
            const UserToken = await UserServiceClass.userAuthentication(session_token);
            return UserToken || null;
          }

          return null;
        },
      },
    });

    res.writeHead(200, headers);
    res.end(JSON.stringify(response));
  } catch (error) {
    res.writeHead(500, headers);
    res.end("Error occured", error.message);
  }
};

module.exports = {
  handleGraphQLRequest,
};
