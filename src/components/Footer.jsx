import React from "react";
import { Stack } from "react-bootstrap";
import ExcelExport from "./ExcelExport";
import GlassesModals from "./GlassesModals";
import { BrowserView } from "react-device-detect";

function Footer() {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <p></p>
        <GlassesModals />
        <BrowserView>
          <ExcelExport exportType="download" />
        </BrowserView>
        <ExcelExport exportType="email" />
      </Stack>
    </>
  );
}

export default Footer;
