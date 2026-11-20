// server.js — entry point
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`\n🎓 Student Portal API`);
  console.log(`   Running at : http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to stop.\n`);
});
