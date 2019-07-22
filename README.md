## Overview
Yet another  `node` starter. This one is for a basic BFF server side project. 

Configured with 
*   TypeScript
*   CheckStyle
*   ESLint
*   TSLint
*   Jest
*   Babel 7
*   Express
*   Morgan
*   DotEnv

 Contains a single endpoint to return a status indicator

```bash
yarn start
curl http://localhost:3000/api/health
```

## Debugging
```bash
nodemon --exec \"node_modules/@babel/node/bin/babel-node.js\" --extensions \".ts,.tsx\" --inspect=51079
```

## Configuration
Using DotEnv, config props are initialised by analyzing the APP_MODE var.  


