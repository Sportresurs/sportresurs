import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import axiosInstance from "../../../api/axiosInstance";

const UseCreateUpdate = ({ area, images, onClose }) => {
  const [initialData, setInitialData] = useState({
    districtsOptions: [],
    purposesOptions: [],
    typesOptions: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(images || []);
  const [onFocus, setOnFocus] = useState(false);
  const [isInitialDataLoading, setInitialDataLoading] = useState(true);

  const router = useRouter();

  const getDistricts = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/district");

      const { districts } = data;

      setInitialData((prev) => ({
        ...prev,
        districtsOptions: districts.map((el) => ({
          label: el.name,
          value: el.id,
        })),
      }));
    } catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPurpose = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/purpose");

      const { purposes } = data;

      setInitialData((prev) => ({
        ...prev,
        purposesOptions: purposes.map((el) => ({
          label: el.title,
          value: el.id,
        })),
      }));
    } catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypes = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/type");

      const { types } = data;

      setInitialData((prev) => ({
        ...prev,
        typesOptions: types.map((el) => ({
          label: el.name,
          value: el.id,
        })),
      }));
    } catch (error) {
      throw new Error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getDistricts();
      await getPurpose();
      await getTypes();
      setInitialDataLoading(false);
    }
    fetchData();
  }, [getDistricts, getPurpose, getTypes]);

  const handleFocus = (e) => {
    if (e.currentTarget === e.target) {
      setOnFocus(true);
    } else {
      setOnFocus(true);
    }
  };
  const handleBlur = () => {
    setOnFocus(false);
  };

  const updateImages = async () => {
    const { data: existingImages } = await axiosInstance.get(
      `/images/images?id=${area.id}`
    );

    if (!existingImages) {
      throw new Error("No area for update");
    }

    const imagesForUpdate = files.filter((file) => !file.name);

    if (imagesForUpdate.length === 0) {
      return false;
    }

    const lastOrder =
      existingImages.length > 0
        ? Math.max(...existingImages.map((image) => image.order || 0))
        : 0;

    const formData = new FormData();

    formData.append("area_id", area.id);
    formData.append("order", lastOrder);

    imagesForUpdate.forEach((file) => {
      formData.append("images", file.file);
    });

    const createdImages = await axiosInstance.patch(
      "/images/update",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return createdImages.data;
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = arr1
      .slice()
      .sort((a, b) => (a.value > b.value ? 1 : -1));
    const sortedArr2 = arr2
      .slice()
      .sort((a, b) => (a.value > b.value ? 1 : -1));

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i].value !== sortedArr2[i].id) {
        return false;
      }
    }

    return true;
  };

  const updateArea = async (values) => {
    const { data } = await axiosInstance.get(`/areas/${area.id}`);

    if (!data.area) {
      throw new Error("No area found to update");
    }

    const dataForUpdate = {};

    Object.keys(values).forEach((key) => {
      const newValue = values[key];
      const currentValue = data.area[key];

      if (Array.isArray(newValue) && Array.isArray(currentValue)) {
        if (!arraysEqual(newValue, currentValue)) {
          dataForUpdate[key] = newValue;
        }
      } else if (newValue !== currentValue) {
        dataForUpdate[key] = newValue;
      }
    });

    if (Object.keys(dataForUpdate).length === 0) {
      return true;
    }

    const updatedArea = await axiosInstance.patch(
      `/areas/${area.id}`,
      dataForUpdate
    );

    await updateImages();

    return updatedArea;
  };

  const createImages = async (id) => {
    const formData = new FormData();
    formData.append("area_id", id);

    files.forEach((file) => {
      formData.append("images", file.file);
    });

    const createdImages = await axiosInstance.post("/images/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return createdImages;
  };
  const createArea = async (values) => {
    const { data } = await axiosInstance.post(`/areas`, values);

    if (!data.newArea) {
      throw new Error("Problem with create area");
    }

    await createImages(data.newArea.id);

    return true;
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file.file);
    });

    try {
      if (area) {
        await updateArea(values);
      } else {
        await createArea(values);
      }
    } finally {
      onClose();
      router.reload();
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onFocus,
    handleFocus,
    handleBlur,
    handleSubmit,
    isInitialDataLoading,
    files,
    setFiles,
    initialData,
  };
};

export default UseCreateUpdate;
