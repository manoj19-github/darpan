"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        success: {
          duration: 3000,
          style: {
            background: "green",
            color: "#fff",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#ff0000",
            color: "#fff",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
