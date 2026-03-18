import React, { useEffect, useState } from "react";
import {  useAppSelector } from "../../../ReduxToolkit/Store";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
} from "@mui/material";
import ProfileFieldCard from "./ProfileFieldCard";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { sellers } = useAppSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("persionalDetails");
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;
      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;
      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (sellers.profileUpdated || sellers.error) {
      setOpenSnackbar(true);
    }
  }, [sellers.profileUpdated]);

  return (
    <div className="lg:px-20 pt-5 pb-20 space-y-20">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Salon Owner
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          />
          <div>
            <ProfileFieldCard
              keys={"Seller Name"}
              value={sellers.profile?.sellerName}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Seller Email"}
              value={sellers.profile?.email}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Seller Mobile"}
              value={sellers.profile?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Bussiness Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>

        <div className=" ">
          <ProfileFieldCard
            keys={"Business Name/Brand Name"}
            value={sellers.profile?.businessDetails?.businessName}
          />
          <Divider />
          <ProfileFieldCard
            keys={"GSTIN"}
            value={sellers.profile?.GSTIN || "not provided"}
          />
          <Divider />
          <ProfileFieldCard
            keys={"Account Status"}
            value={sellers.profile?.accountStatus}
          />
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFieldCard
              keys={"Adress"}
              value={sellers.profile?.pickupAddress?.address}
            />
            <Divider />
            <ProfileFieldCard
              keys={"City"}
              value={sellers.profile?.pickupAddress?.city || "not provided"}
            />
            <Divider />
            <ProfileFieldCard
              keys={"State"}
              value={sellers.profile?.pickupAddress?.state}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Mobile"}
              value={sellers.profile?.pickupAddress?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFieldCard
              keys={"Account Holder Name"}
              value={sellers.profile?.bankDetails?.accountHolderName}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Account Number"}
              value={
                sellers.profile?.bankDetails?.accountNumber || "not provided"
              }
            />
            <Divider />
            <ProfileFieldCard
              keys={"IFSC CODE"}
              value={sellers.profile?.bankDetails?.ifscCode}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellers.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellers.error ? sellers.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
