import app from "../app";

var port = normalizePort(process.env.PORT || "3006");
app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`API server is lisening on port:${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

export default app;
