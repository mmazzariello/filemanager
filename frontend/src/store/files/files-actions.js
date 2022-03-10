export const receiveFiles = (files) => {
  return {
    type: "files/receiveFiles",
    files,
  };
};

export const refreshFiles = () => {
  return async (dispatch) => {
    const res = await fetch("api/files");
    const data = await res.json();

    console.log("data", data);
    // [ { id, parentId, name, kind, size, } ]

    dispatch(receiveFiles(data));
  };
};
