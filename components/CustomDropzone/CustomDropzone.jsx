import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddImage from "../../public/svg/addImage.svg";
import styles from "./CustomDropzone.module.scss";
import EmptyImage from "../../public/svg/emptyImage.svg";
import DefaultEmptyImage from "../../public/svg/defaultEmptyImage.svg";
import Slider from "../Slider";

const CustomDropzone = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles((currentFiles) =>
        [].concat(
          currentFiles,
          acceptedFiles.map((file) =>
            Object.assign(file, {
              url: URL.createObjectURL(file),
            })
          )
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
  return (
    <div className={styles.dropzoneContainer}>
      {files.length > 1 ? (
        <div className={styles.sliderWrapper}>
          <Slider isModal={true} arrayLength={files.length}>
            {files.map((file) => (
              <img key={file.toString()} src={file.url} alt="" />
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
        <div {...getRootProps()} className={styles.emptyImageContainer}>
          <input {...getInputProps()} />
          <AddImage onClick={open} />
        </div>
        {new Array(7).fill(1).map((_, index) => (
          <div key={index} className={styles.emptyImageContainer}>
            {files[index] ? (
              <img src={files[index].url} alt="" className={styles.image} />
            ) : (
              <EmptyImage />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropzone;
