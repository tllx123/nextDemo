export function request(url: string, params?: Record<string, any>) {
  try {
    console.log('url:', url, 'params:', params);
    if (params) {
    } else {
         params = {};
    }
    //    console.log(params)
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Connection": "keep-Alive"
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(response => {
          resolve(response);

        }).catch((error) => {
          reject(error)
          console.log(error);
        });
    });
  } catch (e) {

  }
}