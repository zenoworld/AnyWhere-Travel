import {
  Box,
  Button,
  TextField,
  CardMedia,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Header from "../../AdminComponents/Header";
import { BASE_URL } from '../../../../utils/config';

import upload from '../../../../data/image/folder1.gif'
import loadingIcon from '../../../../data/image/icons8-loading.gif'

import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from '@mui/material/Checkbox';

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [featured, setFeatured] = useState(false)

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [posterPreview, setPosterPreview] = useState(null);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);


  const uploadOnDatabase = async (values, { resetForm }) => {
    const newTourData = {
      title: values.title,
      city: values.city,
      address: values.address,
      desc: values.desc,
      maxGroupSize: values.maxGroupSize,
      availableDate: values.availableDate,
      pricePerDay: values.pricePerDay,
      photo: photoURL,
      featured: featured,
    };

    try {
      const response = await fetch(`${BASE_URL}/tour/createTour`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTourData),
      });

      if (!response.ok) {
        throw new Error("Failed to create tour");
      }
      const result = await response.json();
      console.log("Tour Created:", result);

      resetForm();
      setFormInitialValues(initialValues);
      setPosterPreview(null);
      setPhotoURL("");
      setFeatured(false);
      alert("Tour Created Successfully");
    }
    catch (error) {
      console.error("Error creating tour:", error);
      alert("Error creating tour. Please try again.");
    }
  };
  const uploadOnCloudinary = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    setPosterPreview(file);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Subhro_Bolte");
    data.append("cloud_name", "dfprmq1og");

    const res = await fetch("https://api.cloudinary.com/v1_1/dfprmq1og/image/upload", {
      method: 'POST',
      body: data
    }
    );
    const imageURL = await res.json();
    setPhotoURL(imageURL.url);
    console.log(imageURL.url);
    setLoading(false);
  }

  return (
    <Box m="20px">
      <Header title="CREATE TOUR" subtitle="Create a New Tour Package" />

      <Formik
        onSubmit={uploadOnDatabase}
        initialValues={formInitialValues}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Price Per Day($)/Person"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pricePerDay}
                name="pricePerDay"
                sx={{ gridColumn: "span 2" }}
              />

              <Button variant="contained" component="label" sx={{ gridColumn: "span 2" }} style={{ borderBottom: '0.5px solid white' }}>
                <div style={{ color: 'white' }}>
                  {
                    loading ? <div>
                      Uploading....
                      <img src={loadingIcon} style={{ marginLeft: '20px' }} alt=""></img>
                    </div>
                      :
                      <div style={{ gap: "10px" }}>
                        Upload Poster Image
                        <img src={upload} width='40px' height='35px' style={{ marginLeft: '10px' }} alt=""></img>
                      </div>
                  }
                </div>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={uploadOnCloudinary}
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
              {/* Poster Image */}
              {posterPreview && (
                <CardMedia
                  component="img"
                  alt="Poster"
                  height="140"
                  image={typeof posterPreview === "string" ? posterPreview : URL.createObjectURL(posterPreview)}
                />
              )}
            </Box>

            <Button type="submit" color="secondary" variant="contained" sx={{ mt: 3 }}>
              Create New Tour
            </Button>

          </form>
        )}
      </Formik>
    </Box>
  );
};


// STRUCTURE OF THE DATA
const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  desc: yup.string().required("Description is required"),
  maxGroupSize: yup.number().required("Max group size is required").min(1, "Must be greater than 0"),
  availableDate: yup.date().required("Available date is required"),
  pricePerDay: yup.number().required("Price per date is required").min(0, "Cannot be negative"),
});
const initialValues = {
  title: "",
  city: "",
  address: "",
  desc: "",
  maxGroupSize: 0,
  availableDate: "",
  pricePerDay: 0,
};

export default Form;