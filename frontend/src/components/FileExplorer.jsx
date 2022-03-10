import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./FileExplorer.module.css";
import { selectFile } from "../store/filemanager/filemanager-actions";
import { useDispatch } from "react-redux";
import { FileTreeComponent } from "./FileTreeComponent";

function FileExplorer({ files = [] }) {
  const dispatch = useDispatch();

  const filesAsTree = React.useMemo(() => {
    return listToTree(files);
  }, [files]);

  return (
    <div className={styles.FileExplorer}>
      {files.length === 0 && (
        <div className={styles.FileExplorerEmpty}>
          The root folder is empty.
        </div>
      )}
      <FileTreeComponent
        tree={filesAsTree}
        onSelectFile={(file) => {
          dispatch(selectFile(file));
        }}
      />
    </div>
  );
}

FileExplorer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileExplorer;

function listToTree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

//
// Icons
//
