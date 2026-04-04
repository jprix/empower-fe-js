const LMS_CUSTOMER_APPLICATION_URL =
  process.env.LMS_CUSTOMER_APPLICATION_URL ||
  "https://lms.empowerfn.com/api/customerapplication";

const LMS_API_KEY =
  process.env.EMPOWER_API_KEY || process.env.LMS_API_KEY;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseName(name = "", firstName = "", lastName = "") {
  if (firstName || lastName) {
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };
  }

  const nameParts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" "),
  };
}

function normalizeDebtAmount(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  const rangeMap = {
    "under $10,000": 10000,
    "$10,000 - $20,000": 15000,
    "$20,000 - $35,000": 27500,
    "$35,000 - $50,000": 42500,
    "over $50,000": 50000,
  };

  if (rangeMap[normalizedValue] != null) {
    return rangeMap[normalizedValue];
  }

  const digits = value.replace(/[^\d]/g, "");

  return digits ? Number(digits) : null;
}

function normalizeNullableInt(value) {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const digits = trimmed.replace(/[^\d-]/g, "");
  if (!digits || !/^-?\d+$/.test(digits)) {
    return null;
  }

  return Number(digits);
}

function formatDob({ dob, birthMonth, birthDay, birthYear }) {
  if (typeof dob === "string" && dob.trim()) {
    return dob.trim();
  }

  if (!birthMonth || !birthDay || !birthYear) {
    return "";
  }

  const monthLookup = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const normalizedMonth =
    monthLookup[String(birthMonth).trim().toLowerCase()] ||
    String(birthMonth).padStart(2, "0");
  const normalizedDay = String(birthDay).padStart(2, "0");

  return `${normalizedMonth}/${normalizedDay}/${birthYear}`;
}

function getFirstHeaderValue(headerValue) {
  if (Array.isArray(headerValue)) {
    return headerValue[0];
  }

  if (typeof headerValue === "string") {
    return headerValue.split(",")[0].trim();
  }

  return "";
}

function getSourceIp(req) {
  return (
    getFirstHeaderValue(req.headers["x-forwarded-for"]) ||
    getFirstHeaderValue(req.headers["x-real-ip"]) ||
    req.socket?.remoteAddress ||
    ""
  );
}

function getUrlFromRequest(req) {
  const bodySourceUrl =
    typeof req.body?.sourceUrl === "string" ? req.body.sourceUrl.trim() : "";
  if (bodySourceUrl) {
    return bodySourceUrl;
  }

  const referer = req.headers.referer || req.headers.referrer;
  if (typeof referer === "string" && referer.trim()) {
    return referer.trim();
  }

  const protocol =
    getFirstHeaderValue(req.headers["x-forwarded-proto"]) || "https";
  const host = req.headers.host;

  if (!host || !req.url) {
    return "";
  }

  try {
    return new URL(req.url, `${protocol}://${host}`).toString();
  } catch {
    return "";
  }
}

function getTrackingParams(req, sourceUrl) {
  const fallbackParams = req.query || {};

  try {
    if (!sourceUrl) {
      throw new Error("Missing source URL");
    }

    const parsedUrl = new URL(sourceUrl);

    return {
      sourceId: parsedUrl.searchParams.get("source_id") || fallbackParams.source_id || "",
      sub1: parsedUrl.searchParams.get("sub1") || fallbackParams.sub1 || "",
      sub2: parsedUrl.searchParams.get("sub2") || fallbackParams.sub2 || "",
      sub3: parsedUrl.searchParams.get("sub3") || fallbackParams.sub3 || "",
      sub4: parsedUrl.searchParams.get("sub4") || fallbackParams.sub4 || "",
    };
  } catch {
    return {
      sourceId: fallbackParams.source_id || "",
      sub1: fallbackParams.sub1 || "",
      sub2: fallbackParams.sub2 || "",
      sub3: fallbackParams.sub3 || "",
      sub4: fallbackParams.sub4 || "",
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!LMS_API_KEY) {
    return res.status(500).json({
      message: "LMS API key is not configured on the server.",
    });
  }

  const {
    name,
    firstName,
    lastName,
    email,
    phone,
    debtAmount,
    estimatedDebt,
    message,
    address,
    streetAddress,
    apartmentOrSuite,
    city,
    state,
    zip,
    zipCode,
    dob,
    birthMonth,
    birthDay,
    birthYear,
    trustedCertificate,
    vendorId,
    vendorSubId,
    utmSource,
    utmCampaign,
    utmTerm,
    leadSource,
  } = req.body || {};

  const normalizedName = parseName(name, firstName, lastName);

  if (!normalizedName.firstName) {
    return res.status(400).json({ message: "First name is required." });
  }
  if (!email || !String(email).trim()) {
    return res.status(400).json({ message: "Email is required." });
  }
  if (!isValidEmail(String(email).trim())) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address." });
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ message: "Message is required." });
  }

  const sourceUrl = getUrlFromRequest(req);
  const trackingParams = getTrackingParams(req, sourceUrl);
  const normalizedLeadSource = leadSource || "Test";
  const isTestLead =
    typeof normalizedLeadSource === "string" &&
    normalizedLeadSource.toLowerCase() === "test";
  const payload = {
    offerCode: null,
    brand: "Empower",
    vendorId: normalizeNullableInt(vendorId ?? trackingParams.sourceId),
    vendorSubId: normalizeNullableInt(vendorSubId ?? trackingParams.sub3),
    trustedCertificate:
      trustedCertificate || process.env.LMS_TRUSTED_CERTIFICATE_URL || "",
    firstName: normalizedName.firstName,
    lastName: normalizedName.lastName,
    streetAddress: streetAddress || address || "",
    apartmentOrSuite: apartmentOrSuite || "",
    city: city || "",
    state: state || "",
    zip: zip || zipCode || "",
    phone: phone || "",
    email: String(email).trim(),
    estimatedDebt: normalizeDebtAmount(estimatedDebt ?? debtAmount),
    dob: formatDob({ dob, birthMonth, birthDay, birthYear }),
    leadSource: normalizedLeadSource,
    utmSource: utmSource || trackingParams.sub4 || (isTestLead ? "test" : ""),
    utmCampaign:
      utmCampaign || trackingParams.sub1 || (isTestLead ? "test" : ""),
    utmTerm: utmTerm || trackingParams.sub2 || (isTestLead ? "test" : ""),
    sourceIp: getSourceIp(req),
    sourceUrl,
  };

  try {
    console.log("LMS submission payload:", {
      ...payload,
      apiKeyPresent: Boolean(LMS_API_KEY),
      email: payload.email,
    });

    const upstreamResponse = await fetch(LMS_CUSTOMER_APPLICATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": LMS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await upstreamResponse.text();
    let responseData = null;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseData = { raw: responseText };
    }

    console.log("LMS response:", JSON.stringify({
  status: upstreamResponse.status,
  ok: upstreamResponse.ok,
  body: responseData,
}, null, 2));


    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        message:
          responseData?.title ||
          responseData?.message ||
          "LMS rejected the submission.",
        details: responseData,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Your message has been received. A specialist will be in touch within one business day.",
      lms: responseData,
    });
  } catch (error) {
    console.error("LMS submission error:", error);
    return res.status(502).json({
      message: "Unable to submit the lead to LMS right now.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
