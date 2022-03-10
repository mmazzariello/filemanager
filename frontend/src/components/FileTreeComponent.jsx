import * as React from "react";

export const FileTreeComponent = ({ tree, onSelectFile }) => {
  return (
    <div
      style={{
        borderRadius: "4px",
        padding: "8px",
        userSelect: "none",
        cursor: "default",
      }}
    >
      {tree.map((item) => {
        return (
          <TreeItem key={item._id} item={item} onSelectFile={onSelectFile} />
        );
      })}
    </div>
  );
};

const TreeItem = ({ item, onSelectFile }) => {
  const marginLeft = item.parentId ? "18px" : 0;

  const [showingChildren, setShowingChildren] = React.useState(true);

  return (
    <div style={{ marginLeft }}>
      {item.kind === "folder" ? (
        <FolderItem
          item={item}
          showingChildren={showingChildren}
          onClick={() => setShowingChildren(!showingChildren)}
        />
      ) : (
        <FileItem
          item={item}
          onClick={() => {
            onSelectFile(item);
          }}
        />
      )}
      {showingChildren
        ? item.children.map((childrenItem) => {
            return (
              <TreeItem
                key={childrenItem._id}
                item={childrenItem}
                onSelectFile={onSelectFile}
              />
            );
          })
        : null}
    </div>
  );
};

const itemDefaultStyles = {
  padding: "3px 6px",
  display: "inline-block",
  borderRadius: "4px",
};

const FolderItem = ({ item, showingChildren, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...itemDefaultStyles,
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {showingChildren ? (
        <CaretDownIcon style={{ paddingTop: "3px" }} />
      ) : (
        <CaretRightIcon style={{ paddingTop: "3px" }} />
      )}
      {item.name}
    </div>
  );
};

const FileItem = ({ item, onClick }) => {
  return (
    <div
      className="fileItem"
      onClick={onClick}
      style={{
        ...itemDefaultStyles,
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <FileIcon style={{ paddingTop: "2px" }} />
      {item.name}
    </div>
  );
};

const CaretDownIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.182 6.182a.45.45 0 0 1 .636 0L7.5 8.864l2.682-2.682a.45.45 0 0 1 .636.636l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 0 1 0-.636Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const CaretRightIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.182 4.182a.45.45 0 0 1 .636 0l3 3a.45.45 0 0 1 0 .636l-3 3a.45.45 0 1 1-.636-.636L8.864 7.5 6.182 4.818a.45.45 0 0 1 0-.636Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const FileIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 2.5a.5.5 0 0 1 .5-.5h5.586a.5.5 0 0 1 .353.146l2.415 2.415a.5.5 0 0 1 .146.353V12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-10ZM3.5 1A1.5 1.5 0 0 0 2 2.5v10A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V4.914a1.5 1.5 0 0 0-.44-1.06l-2.414-2.415A1.5 1.5 0 0 0 9.086 1H3.5Zm1 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);
