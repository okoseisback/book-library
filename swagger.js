const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'book-library',
    description: 'Powered by OKTAY KÖSE(okoseisback@gmail.com)'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.ts'];


swaggerAutogen(outputFile, routes, doc);