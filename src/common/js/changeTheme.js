export default {
  getStyleTemplate(data) {
    const colorMap = {
      "#3a8ee6": "shade-1",
      "#409eff": "primary",
      "#53a8ff": "light-1",
      "#66b1ff": "light-2",
      "#79bbff": "light-3",
      "#8cc5ff": "light-4",
      "#a0cfff": "light-5",
      "#b3d8ff": "light-6",
      "#c6e2ff": "light-7",
      "#d9ecff": "light-8",
      "#ecf5ff": "light-9"
    };
    Object.keys(colorMap).forEach(key => {
      const value = colorMap[key];
      data = data.replace(new RegExp(key, "ig"), value);
    });
    return data;
  },
  // ajax读取文件
  getFile(url, isBlob = false) {
    return new Promise((resolve, reject) => {
      const client = new XMLHttpRequest();
      client.responseType = isBlob ? "blob" : "";
      client.onreadystatechange = () => {
        if (client.readyState !== 4) {
          return;
        }
        if (client.status === 200) {
          const urlArr = client.responseURL.split("/");
          resolve({
            data: client.response,
            url: urlArr[urlArr.length - 1]
          });
        } else {
          reject(new Error(client.statusText));
        }
      };
      client.open("GET", url);
      client.send();
    });
  }
}
