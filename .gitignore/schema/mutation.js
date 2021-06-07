const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;
const EmployeeType = require("./types/employeeType");
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      resolve: async (parentValue, { id, name, location, designation }) => {
        const result = await axios.post("http://localhost:5000/employees", {
          id,
          name,
          location,
          designation,
        });
        return result.data;
      },
    },
    deleteEmployee: {
      type: new GraphQLList(EmployeeType),
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parentValue, args) => {
        const result = await axios.delete(
          `http://localhost:5000/employees/${args.id}`
        );
        return result.data;
      },
    },
    editEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      resolve: async (parentValue, { id, name, location, designation }) => {
        const result = await axios.put("http://localhost:5000/employees", {
          id,
          name,
          location,
          designation,
        });
        return result.data;
      },
    },
  },
});

module.exports = mutation;
