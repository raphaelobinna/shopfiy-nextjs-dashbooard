import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  input: {
    display: "none",
    width: "100%",
    height: "100%",
  },
  card: {
    width: "40vh",
    height: "15vh",
    // border: "4px dotted",
    // borderColor: "#AAAAAA !important",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function CreateProduct() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const MAX_IMAGES = 4;

  const [input, setInput] = React.useState({});
  const [variants, setVariants] = React.useState([]);

  const [images, setImages] = React.useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (images.length == MAX_IMAGES) {
      // Handle error or notify user about exceeding the maximum number of images
      alert(`You can only select up to ${MAX_IMAGES} images`);
      return;
    }

    const newImageSrcs = [];

    // Iterate over each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        newImageSrcs.push(base64Image);
        // If all files are processed, update the state with all base64 representations
        if (newImageSrcs.length === files.length) {
          for (let image of newImageSrcs) {
            image = image.split(",")[1];
            setImages((oldImages) => [...oldImages, { attachment: image }]);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((item, i) => {
      if (i !== index) {
        return item;
      }
    });

    setImages(newImages);
  };

  const onSubmit = async () => {
    const data = {
      ...input,
      images,
      variants,
    };
    const res = await fetch("http://localhost:3000/api/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="You are the vendor"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(event) =>
                      setInput({ ...input, title: event.target.value })
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Type"
                    id="type"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(event) =>
                      setInput({ ...input, product_type: event.target.value })
                    }
                  />
                </GridItem>
              </GridContainer>

              <InputLabel style={{ color: "#AAAAAA", marginTop: 10 }}>
                Variants
              </InputLabel>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Option eg First"
                    id="options"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(event) =>
                      setVariants((prevVariants) => [
                        {
                          ...prevVariants[0],
                          option1: event.target.value,
                        },
                      ])
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Price"
                    id="price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(event) =>
                      setVariants((prevVariants) => [
                        {
                          ...prevVariants[0],
                          price: event.target.value,
                        },
                      ])
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="SKU"
                    id="code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(event) =>
                      setVariants((prevVariants) => [
                        {
                          ...prevVariants[0],
                          sku: event.target.value,
                        },
                      ])
                    }
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>
                    About product
                  </InputLabel>
                  <CustomInput
                    labelText="Product Description"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                    onChange={(event) =>
                      setInput({ ...input, body_html: event.target.value })
                    }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                disabled={
                  !input?.title || images.length == 0 || variants.length == 0
                }
                onClick={() => onSubmit()}
                color="primary"
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <GridContainer>
              {images.length > 0 &&
                images.map((a, i) => (
                  <CardAvatar key={i} profile>
                    <a
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        removeImage(i);
                      }}
                    >
                      <img
                        src={"data:image/png;base64," + a?.attachment}
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                ))}
            </GridContainer>

            <CardBody className={classes.card}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              {/* Upload icon that acts as the trigger */}
              <label
                htmlFor="contained-button-file"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CloudUploadIcon fontSize="large" />
              </label>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

CreateProduct.layout = Admin;

export default CreateProduct;
