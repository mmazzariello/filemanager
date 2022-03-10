import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "use-interval";

import FileExplorer from "../components/FileExplorer";
import FileContent from "../components/FileContent";
import { refreshFiles } from "../store/files/files-actions";
import { selectFile } from "../store/filemanager/filemanager-actions";

import styles from "./App.module.css";

const POLL_INTERVAL = 5000;

function App() {
  const dispatch = useDispatch();

  useInterval(
    () => {
      dispatch(refreshFiles());
    },
    POLL_INTERVAL,
    true
  );

  const { list } = useSelector((store) => store.files);
  const { selectedFile } = useSelector((store) => store.filemanager);

  return (
    <div className={styles.App}>
      <FileExplorer files={list} />
      <FileContent file={selectedFile} />
    </div>
  );
}

export default App;
