module.exports = async (conn, q) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result)
    }
    conn.query(q, handler);
  }
);