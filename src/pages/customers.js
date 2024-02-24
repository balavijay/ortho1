import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import { FileUpload } from "src/sections/overview/file-upload";
import { styled } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@OrthoSynth.ai",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@OrthoSynth.ai",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@OrthoSynth.ai",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Jinny Doe",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "dataop@OrthoSynth.ai",
    name: "Jinny Doe",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@OrthoSynth.ai",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@OrthoSynth.ai",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@OrthoSynth.ai",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@OrthoSynth.ai",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@OrthoSynth.ai",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@OrthoSynth.ai",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledSeverityRed = styled(Dialog)(({  }) => ({
  fontSize: 22,
  borderWidth: 0,
  color: "red"
}));

const StyledSeverityGreen = styled(Dialog)(({  }) => ({
  fontSize: 22,
  borderWidth: 0,
  color: "green"
}));


const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleLLM, setToggleLLM] = useState(false);
  const [severity, setSeverity] = useState(false);
  const [chatHistory, setChatHistory] = useState("");
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  function toggleFormHandler() {
    setToggleForm(true);
    
    
  }

  function toggleFormClose() {
    setToggleForm(false);
  }

  function toggleLLMClose() {
    setToggleLLM(false);
  }

  function openLLMResponse() {
    toggleFormClose();
    setToggleLLM(true);
    
    //set setSeverity based on ML output
    setSeverity(true);

    setChatHistory(`*Findings:* 
    \n 


    1. *Joint Space Narrowing:* Severe narrowing of the medial and lateral compartments of the knee joint, measuring approximately [specific measurement] mm, consistent with advanced cartilage loss.
    2. *Osteophyte Formation:* Large osteophytes present along the joint margins, particularly pronounced in the tibiofemoral and patellofemoral compartments.
    3. *Subchondral Sclerosis:* Diffuse subchondral sclerosis observed throughout the femoral condyles and tibial plateaus, indicative of chronic and advanced osteoarthritic changes.
    4. *Subchondral Cyst Formation:* Multiple large subchondral cysts identified in the weight-bearing regions of the medial and lateral compartments, contributing to joint instability.
    5. *Joint Alignment:* Severe varus deformity noted, with significant angulation of the knee joint axis, leading to altered biomechanics and increased stress on the medial compartment.
    6. *Meniscal Abnormalities:* Extensive meniscal degeneration and tearing, with evidence of meniscal extrusion and loss of meniscal tissue integrity.
    7. *Synovial Changes:* Severe synovial hypertrophy and inflammation, with extensive thickening of the synovial lining and evidence of synovitis.
    8. *Joint Effusion:* Large joint effusion present, indicating ongoing inflammation and intra-articular fluid accumulation.
    *Impression:*
    The imaging findings are consistent with severe osteoarthritis of the knee joint, characterized by advanced cartilage loss, osteophyte formation, subchondral sclerosis, cyst formation, malalignment, meniscal degeneration, synovial hypertrophy, and joint effusion. These changes contribute to significant pain, functional impairment, and reduced quality of life for the patient.
    ---
    This report provides a comprehensive overview of the radiological manifestations of severe knee osteoarthritis, aiding in clinical decision-making and treatment planning.
    
    `);

    
  }

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = chatHistory;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));
      console.log(stringResponse.slice(0, i));
      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [chatHistory]);

  return (
    <>
      <Head>
        <title>Radiologist View | OrthoSynth AI</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Patients</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>

              <BootstrapDialog
                onClose={toggleFormClose}
                aria-labelledby="customized-dialog-title"
                open={toggleForm}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Add Patient
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={toggleFormClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >X</IconButton>
                <DialogContent dividers>
                   <FileUpload from={"radiology"} onCompleted={openLLMResponse}></FileUpload> 
                  
                </DialogContent>
              </BootstrapDialog>


              <BootstrapDialog
                onClose={toggleFormClose}
                aria-labelledby="customized-dialog-title1"
                open={toggleLLM}
                sx={{width: 800}}
              >
                <DialogTitle sx={{ m: 0, p: 2, }} id="customized-dialog-title1">
                  Radiological GenAI Report
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={toggleLLMClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >X</IconButton>
                <DialogContent dividers>
                <>
                {severity && <StyledSeverityRed>Severe:</StyledSeverityRed> }
                     {!severity && <StyledSeverityGreen>Normal:</StyledSeverityGreen> }
                     {severity && <div>Severe:</div> }
                     {!severity && <div>Normal:</div> }
                     
                      <span>
                        {displayResponse} 
                      </span>
                    </>
                </DialogContent>
              </BootstrapDialog>

               
                    
                  

              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={toggleFormHandler}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
