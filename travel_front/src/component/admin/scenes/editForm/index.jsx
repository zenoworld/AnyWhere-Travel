import {
  Box,
  Button,
  TextField,
  CardMedia,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import Header from "../../AdminComponents/Header";
import { BASE_URL } from '../../../../utils/config';

import upload from '../../../../data/image/folder1.gif';
import loadingIcon from '../../../../data/image/icons8-loading.gif';

import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from '@mui/material/Checkbox';

const EditForm = ({ tour }) => {
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [featured, setFeatured] = useState(tour.featured);
  const [posterPreview, setPosterPreview] = useState(tour.photo);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const uploadUpdateTourOnDatabase = async (values, { resetForm }) => {
    const updateTourData = {
      ...values,
      bookedPersonCount: tour.bookedPersonCount,
      remainingSlots: values.maxGroupSize - tour.bookedPersonCount,
      photo: photoURL || tour.photo,
      featured,
      reviews: tour.reviews,
    };

    try {
      const response = await fetch(`${BASE_URL}/tour/${tour._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTourData),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updatedResult = await response.json();
      console.log(updatedResult);
      
      resetForm();
      setPosterPreview(photoURL || tour.photo);
      setPhotoURL("");
      setFeatured(featured);
      alert("Tour Updated Successfully");
      window.location.reload()
    } catch (error) {
      console.error("Error Updating tour:", error);
      alert("Error Updating Tour. Please try again!");
    }
  };

  const uploadUpdatedPosterOnCloudinary = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setLoading(false); // Reset loading if no file is selected
      return;
    }
    setLoading(true);
    setPosterPreview(file);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Subhro_Bolte");
    data.append("cloud_name", "dfprmq1og");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dfprmq1og/image/upload", {
        method: "POST",
        body: data,
      });
      const imageURL = await res.json();
      setPhotoURL(imageURL.url);
      console.log(imageURL.url);
    } 
    catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again!");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof posterPreview !== "string") {
        URL.revokeObjectURL(posterPreview);
      }
    };
  }, [posterPreview]);

  return (
    <Box m="20px">
      <Header title="UPDATE TOUR" subtitle="Update Tour Package" />
      <Formik
        onSubmit={uploadUpdateTourOnDatabase}
        initialValues={{
          title: tour.title,
          city: tour.city,
          address: tour.address,
          desc: tour.desc,
          maxGroupSize: tour.maxGroupSize,
          availableDate: tour.availableDate,
          pricePerDay: tour.pricePerDay,
        }}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Name of Place"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Name of City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Address of the Place"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Max Group Size"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxGroupSize}
                name="maxGroupSize"
                error={!!touched.maxGroupSize && !!errors.maxGroupSize}
                helperText={touched.maxGroupSize && errors.maxGroupSize}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Available Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.availableDate}
                name="availableDate"
                error={!!touched.availableDate && !!errors.availableDate}
                helperText={touched.availableDate && errors.availableDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Price Per Day ($)/Person"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pricePerDay}
                name="pricePerDay"
                error={!!touched.pricePerDay && !!errors.pricePerDay}
                helperText={touched.pricePerDay && errors.pricePerDay}
                sx={{ gridColumn: "span 2" }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ gridColumn: "span 2" }}
                style={{ borderBottom: '0.5px solid white' }}
              >
                <div style={{ color: 'white' }}>
                  {loading ? (
                    <div>
                      Uploading....
                      <img src={loadingIcon} style={{ marginLeft: '20px' }} alt="loading" />
                    </div>
                  ) : (
                    <div style={{ gap: "10px" }}>
                      Upload Updated Poster Image
                      <img src={upload} width="40px" height="35px" style={{ marginLeft: '10px' }} alt="upload" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={uploadUpdatedPosterOnCloudinary}
                />
              </Button>
              <div style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                Featured
                <Checkbox
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="secondary"
                />
              </div>
              {posterPreview && (
                <CardMedia
                  component="img"
                  alt="Poster"
                  height="140"
                  image={typeof posterPreview === "string" ? posterPreview : URL.createObjectURL(posterPreview)}
                />
              )}
            </Box>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Tour"}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  desc: yup.string().required("Description is required"),
  maxGroupSize: yup
    .number()
    .integer("Enter a whole number for group size")
    .required("Max group size is required")
    .min(1, "Group size must be at least 1"),
  availableDate: yup.date().required("Available date is required"),
  pricePerDay: yup
    .number()
    .integer("Enter a whole number for price")
    .required("Price per day is required")
    .min(0, "Cannot be negative"),
});

export default EditForm;
