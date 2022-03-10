import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FileIcon from "../assets/images/file.svg";
import FolderIcon from "../assets/images/folder.svg";

import styles from "./FileExplorer.module.css";
import { selectFile } from "../store/filemanager/filemanager-actions";
import { useDispatch } from "react-redux";

function FileExplorer({ files = [] }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.FileExplorer}>
      <div className={styles.FileExplorerEmpty}>The root folder is empty.</div>
      {files.length === 0 && (
        <div className={styles.FileExplorerEmpty}>
          The root folder is empty.
        </div>
      )}
      {files.map((file) => (
        <div
          className={styles.FileExplorerItem}
          onClick={() => {
            if (file.kind === "folder") return;
            dispatch(selectFile(file));
          }}
          key={file.id}
        >
          {file.kind === "folder" && (
            <FolderIcon className={styles.FileExplorerIcon} />
          )}
          {file.kind !== "folder" && (
            <FileIcon className={styles.FileExplorerIcon} />
          )}
          {file.name}
          <div className={styles.FileExplorerSize}>{file.size}</div>
        </div>
      ))}
    </div>
  );
}

FileExplorer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileExplorer;

//
// Build the file tree
//
