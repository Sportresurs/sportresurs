import React, { useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import Slider from "../Slider";
import AddImage from "../../public/svg/addImage.svg";
import styles from "./CustomDropzone.module.scss";
import EmptyImage from "../../public/svg/emptyImage.svg";
import DefaultEmptyImage from "../../public/svg/defaultEmptyImage.svg";
import BasketIcon from "../../public/svg/basketIcon.svg";

const reorder = (files, startIndex, endIndex) => {
  const result = files;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CustomDropzone = ({ files, setFiles }) => {
  const lastId = useRef(1);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    noClick: false,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles((currentFiles) =>
        [].concat(
          currentFiles,
          acceptedFiles.map((file) => {
            lastId.current += 1;
            return { id: lastId.current, file, url: URL.createObjectURL(file) };
          })
        )
      );
    },
  });
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const addImageWrapperClass = classNames(
    styles.emptyImageContainer,
    styles.addImage
  );
  const handleImageDelete = (id) => {
    setFiles((prevState) => prevState.filter((file) => file.id !== id));
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const file = reorder(files, result.source.index, result.destination.index);
    setFiles([...file]);
  };

  return (
    <div>
      {files.length > 0 ? (
        <div className={styles.sliderWrapper}>
          <Slider isModal={true} arrayLength={files.length}>
            {files.map((file) => (
              <img key={file.id} src={file.url} alt="" />
            ))}
          </Slider>
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <div className={styles.icon}>
            <DefaultEmptyImage />
          </div>
        </div>
      )}
      <div className={styles.emptyImagesWrapper}>
        <div {...getRootProps()} className={addImageWrapperClass}>
          <input {...getInputProps()} />
          <AddImage />
        </div>
        {files.length > 0 ? (
          <div className={styles.scrollBox}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.imagesWrapper}
                  >
                    {files.map((file, index) => (
                      <Draggable
                        key={file.id}
                        draggableId={file.id.toString()}
                        index={index}
                      >
                        {/* eslint-disable-next-line no-shadow */}
                        {(provided) => (
                          <div
                            className={styles.emptyImageContainer}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={styles.deleteIcon}
                              onClick={() => handleImageDelete(file.id)}
                            >
                              <BasketIcon />
                            </div>
                            <img
                              src={file.url}
                              alt=""
                              className={styles.image}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : (
          <div className={styles.imagesWrapper}>
            {new Array(3).fill(1).map((_, index) => (
              <div key={index} className={styles.emptyImageContainer}>
                <EmptyImage />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropzone;
