const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const EmployeeType = new GraphQLObjectType({
  name: "Employees",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    designation: { type: GraphQLString },
  },
});

module.exports = EmployeeType;
