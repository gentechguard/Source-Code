import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Certificate, { type WarrantyData } from "../components/Certificate";
import {
  getWarrantyCertificateVariant,
  isGentech10WarrantyProduct,
} from "./warranty-certificate";

test("matches only warranty products identified as GenTech 10", () => {
  assert.equal(isGentech10WarrantyProduct("GenTech 10"), true);
  assert.equal(isGentech10WarrantyProduct("Gentech Guard GenTech 10"), true);
  assert.equal(isGentech10WarrantyProduct("gen-tech 10 gloss"), true);
  assert.equal(isGentech10WarrantyProduct("Gentech10+"), true);

  assert.equal(isGentech10WarrantyProduct("Gentech Guard PPF 10"), false);
  assert.equal(isGentech10WarrantyProduct("Gentech PPF10+"), false);
  assert.equal(isGentech10WarrantyProduct("GEN 10 Ceramic Coating"), false);
  assert.equal(isGentech10WarrantyProduct("GEN 5 PPF"), false);
  assert.equal(isGentech10WarrantyProduct("PPF"), false);
  assert.equal(isGentech10WarrantyProduct(""), false);
  assert.equal(isGentech10WarrantyProduct(null), false);
  assert.equal(isGentech10WarrantyProduct(undefined), false);
});

test("selects the gold certificate only for GenTech 10 products", () => {
  assert.equal(getWarrantyCertificateVariant("GenTech 10"), "gentech10");
  assert.equal(getWarrantyCertificateVariant("Gentech10+"), "gentech10");
  assert.equal(getWarrantyCertificateVariant("Gentech Guard PPF 10"), "default");
  assert.equal(getWarrantyCertificateVariant("Gentech PPF10+"), "default");
  assert.equal(getWarrantyCertificateVariant("GEN 10 Ceramic Coating"), "default");
  assert.equal(getWarrantyCertificateVariant("GEN 5 PPF"), "default");
});

test("renders roll serial details on the GenTech 10 certificate", () => {
  const data: WarrantyData = {
    warrantyId: "GW-000123",
    productName: "GenTech 10",
    duration: "10 Years",
    serialNumber: "G126010002",
    materialConsumed: "Standard Kit",
    customer: {
      name: "Suresh Kumar",
      vehicleModel: "Vehicle",
      registrationNumber: "TS 09 AB 0213",
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
  assert.match(html, /Official Protection Document/);
  assert.match(html, /GenTech 10 Paint Protection Film/);
  assert.doesNotMatch(html, /PPF 10/);
});

test("renders the vehicle registration number on every certificate variant", () => {
  const createData = (productName: string) => ({
    warrantyId: "GW-000002",
    productName,
    duration: productName === "GenTech 10" ? "10 Years" : "5 Years",
    serialNumber: "GT12345",
    materialConsumed: "Standard Kit",
    customer: {
      name: "Vehicle Owner",
      vehicleModel: "Vehicle",
      registrationNumber: "TS 09 AB 0213",
      vin: "MA3TESTVIN123",
      phone: "+919876543210",
    },
    installer: {
      studioName: "Gentech Authorized Studio",
      location: "Hyderabad",
      technician: "Authorized Technician",
      date: "07/10/2026",
    },
  });

  for (const productName of ["GEN 5 PPF", "GenTech 10"]) {
    const html = renderToStaticMarkup(
      React.createElement(Certificate, {
        data: createData(productName),
      })
    );

    assert.match(html, /Vehicle Registration No\./);
    assert.match(html, /TS 09 AB 0213/);
  }
});
