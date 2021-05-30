import express from 'express';

let app = require('./svr/server').default;

if (module.hot) {
  module.hot.accept('./svr/server', function() {
    console.log('🔁  HMR Reloading `./svr/server`...');
    try {
      app = require('./svr/server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
