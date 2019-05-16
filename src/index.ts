import createServer from "./server";

createServer()
  .then(app => {
    const listener = app.listen(4321, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server started on port ${(listener.address() as any).port}`);
    });
  })
  .catch(e => {
    // tslint:disable-next-line:no-console
    console.error(e);
  });
