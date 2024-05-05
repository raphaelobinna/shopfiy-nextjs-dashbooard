import React from "react";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function Products() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [allProducts, setAllProducts] = React.useState([]);

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/api/actions");
    const result = await res.json();

    setAllProducts(result);
    return result;
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Products</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p className={classes.cardCategoryWhite}>
                Primary products may include multiple variants
              </p>

              <Link legacyBehavior href={"/admin/products/create"}>
                <Button size="sm" color="white" round>
                  Create
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["", "Image", "Title", "Product #", "Created"]}
              tableData={allProducts.map((item, index) => [
                index + 1,
                <img
                  src={item?.image?.src ?? ""}
                  style={{ height: 50, width: 60 }}
                />,
                item?.title,
                item?.id,
                new Date(item?.created_at).toDateString(),
              ])}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Products.layout = Admin;

export default Products;
