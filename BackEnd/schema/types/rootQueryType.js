const graphql = require("graphql");
const axios = require("axios");
const EmployeeType = require("./employeeType");
const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: async (parentValue, args, req) => {
        const result = await axios.get(
          `http://localhost:5000/employees/${args.id}`
        );
        return result.data;
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: async (parentValue, args, req) => {
        const result = await axios.get("http://localhost:5000/employees");
        return result.data;
      },
    },
  },
});
module.exports = RootQuery;
