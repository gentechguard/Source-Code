import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Certificate, { type WarrantyData } from "../components/Certificate";
import {
  getWarrantyCertificateVariant,
  isPpf10WarrantyProduct,
} from "./warranty-certificate";

test("matches only warranty products identified as PPF 10", () => {
  assert.equal(isPpf10WarrantyProduct("Gentech Guard PPF 10"), true);
  assert.equal(isPpf10WarrantyProduct("GEN PPF 10"), true);
  assert.equal(isPpf10WarrantyProduct("gen-tech ppf-10 gloss"), true);
  assert.equal(isPpf10WarrantyProduct("Gentech PPF10+"), true);

  assert.equal(isPpf10WarrantyProduct("GEN 10 Ceramic Coating"), false);
  assert.equal(isPpf10WarrantyProduct("GEN 5 PPF"), false);
  assert.equal(isPpf10WarrantyProduct("PPF"), false);
  assert.equal(isPpf10WarrantyProduct(""), false);
  assert.equal(isPpf10WarrantyProduct(null), false);
  assert.equal(isPpf10WarrantyProduct(undefined), false);
});

test("selects the PPF 10 certificate only for PPF 10 products", () => {
  assert.equal(getWarrantyCertificateVariant("Gentech Guard PPF 10"), "ppf10");
  assert.equal(getWarrantyCertificateVariant("Gentech PPF10+"), "ppf10");
  assert.equal(getWarrantyCertificateVariant("GEN 10 Ceramic Coating"), "default");
  assert.equal(getWarrantyCertificateVariant("GEN 5 PPF"), "default");
});

test("renders roll serial details on the PPF 10 certificate", () => {
  const data: WarrantyData = {
    warrantyId: "GW-000123",
    productName: "Gentech Guard PPF 10",
    duration: "10 Years",
    serialNumber: "G126010002",
    materialConsumed: "Standard Kit",
    customer: {
      name: "Suresh Kumar",
      vehicleModel: "Vehicle",
      vin: "N/A",
      phone: "+919966660416",
    },
    installer: {
      studioName: "Gentech Signature Studio",
      location: "Hyderabad",
      technician: "Authorized Technician",
      date: "11/02/2026",
    },
  };

  const html = renderToStaticMarkup(React.createElement(Certificate, { data }));

  assert.match(html, /Roll Serial No\./);
  assert.match(html, /G126010002/);
});
