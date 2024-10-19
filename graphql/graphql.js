const { buildSchema, graphql } = require("graphql");
const { ProductServices } = require("./products/service");
const { UserServices } = require("./Users/service");
const { UserServiceClass } = require("./Users/userServiceClasses");
const { CartService } = require("./Cart/CartServices");

const mySchema = buildSchema(`
  ${ProductServices.ProductSchema}
  ${UserServices.UserSchema}
  ${CartService.CartSchema}

  type Query {
    ${ProductServices.ProductQueries}
    ${UserServices.UserQueries}
    ${CartService.CartQueries}
  }

  type Mutation{
    ${ProductServices.ProductMutations}
    ${UserServices.UserMutations}
    ${CartService.CartMutations}
  }
`);

const root = {

  //Resolvers Queries
  ...ProductServices.ProductResolvers.queries,
  ...UserServices.UserResolver.queries,
  ...CartService.CartResolver.queries,
  
  //Resolvers Mutations
  ...ProductServices.ProductResolvers.mutations,
  ...UserServices.UserResolver.mutations,
  ...CartService.CartResolver.mutations,
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
            const User = await UserServiceClass.userAuthentication(session_token);
            return User || null;
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
