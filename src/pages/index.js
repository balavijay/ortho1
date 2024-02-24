import Head from "next/head";
import React, { useState, useEffect } from "react";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { FileUpload } from "src/sections/overview/file-upload";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const now = new Date();

const Page = () => {
  const [scanCount, setScanCount] = useState(0);
  const [augmentedCount, setAugmentedCount] = useState(0);
  const [augmentedPercentage, setAugmentedPercentage] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  async function GetOrthos() {
    const response = await fetch("http://54.161.201.248:8080/api/ortho/GetOrthos");
    handleClose();
    const dashboardData = await response.json();
    console.log(dashboardData.OrthoData[0]);

    setScanCount(dashboardData.OrthoData[0].Scan.count);
    setAugmentedCount(dashboardData.OrthoData[0].Scan.count * 40);
    let total = dashboardData.OrthoData[0].Scan.count + dashboardData.OrthoData[0].Scan.count * 40;
    setAugmentedPercentage(Math.floor((dashboardData.OrthoData[0].Scan.count * 40 * 100) / total));
    setAccuracy(80);
  }
  GetOrthos();

  // COMPONENT -----------------------------------------------------------------
  return (
    <>
      <Head>
        <title>Overview | OrthoSynth AI</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} md={12} lg={12}>
              <FileUpload from={"dataop"} onCompleted={()=>{}}></FileUpload>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget difference={12} positive sx={{ height: "100%" }} value={scanCount} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive
                sx={{ height: "100%" }}
                value={augmentedCount}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={augmentedPercentage} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={accuracy} />
            </Grid>
            {/* <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "Actual",
                    data: [8, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Augmented",
                    data: [12, 20, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[100 - augmentedPercentage, augmentedPercentage]}
                labels={["Actual", "Augmented"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
