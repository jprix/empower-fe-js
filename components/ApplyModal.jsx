import React, { useMemo, useState } from "react";
import { Formik, Form, getIn } from "formik";
import * as Yup from "yup";
import { getStates } from "../helpers/getStates";
import TrustpilotWidget from "./TrustpilotWidget";

const debtAmountOptions = [
  "Under $10,000",
  "$10,000 - $20,000",
  "$20,000 - $35,000",
  "$35,000 - $50,000",
  "Over $50,000",
];

const debtTypeOptions = [
  { value: "credit-card", label: "Credit Card", icon: "CC" },
  { value: "collections", label: "Collections", icon: "CL" },
  { value: "medical", label: "Medical", icon: "MD" },
  { value: "other", label: "Other", icon: "OT" },
];

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const progressLabels = [
  "Debt Amount",
  "Debt Type",
  "Contact Info",
  "Your Address",
];

const stepFieldMap = {
  1: ["debtAmount"],
  2: ["debtTypes"],
  3: [
    "firstName",
    "lastName",
    "phone",
    "email",
    "birthMonth",
    "birthDay",
    "birthYear",
  ],
  4: ["address", "city", "zipCode", "state"],
};

const stepSchemas = {
  1: Yup.object({
    debtAmount: Yup.string().required("Please select your debt amount"),
  }),
  2: Yup.object({
    debtTypes: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one debt type"),
  }),
  3: Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .required("Last name is required"),
    phone: Yup.string()
      .matches(
        /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
        "Enter a valid phone number"
      )
      .required("Phone number is required"),
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    birthMonth: Yup.string().required("Month is required"),
    birthDay: Yup.string()
      .matches(/^(0?[1-9]|[12]\d|3[01])$/, "Enter a valid day")
      .required("Day is required"),
    birthYear: Yup.string()
      .matches(/^(19|20)\d{2}$/, "Enter a valid year")
      .required("Year is required"),
  }),
  4: Yup.object({
    address: Yup.string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address must be less than 100 characters")
      .required("Street address is required"),
    city: Yup.string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .required("City is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Enter a valid 5-digit ZIP code")
      .required("ZIP code is required"),
    state: Yup.string().required("State is required"),
  }),
};

const fullSchema = stepSchemas[1]
  .concat(stepSchemas[2])
  .concat(stepSchemas[3])
  .concat(stepSchemas[4]);

const initialValues = {
  debtAmount: "",
  debtTypes: [],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  birthMonth: "",
  birthDay: "",
  birthYear: "",
  address: "",
  city: "",
  zipCode: "",
  state: "",
};

const ApplyModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const states = useMemo(() => getStates(), []);

  const markStepTouched = (setTouched, touched, step) => {
    const nextTouched = { ...touched };
    stepFieldMap[step].forEach((field) => {
      nextTouched[field] = true;
    });
    setTouched(nextTouched, true);
  };

  return (
    <div className="apply-modal-shell">
      <div className="apply-modal-layout">
          <aside className="apply-modal-sidebar">
            <div className="apply-modal-sidebar-arc" />
            <div className="apply-modal-sidebar-content">
              <div className="apply-modal-badge">
                Free · No Obligations · Takes 2 Minutes
              </div>
              <h2 className="apply-modal-hero-title">
                One Low Payment.
                <br />
                <em>Total Financial Relief.</em>
              </h2>
              <p className="apply-modal-hero-copy">
                Stop juggling creditor calls and multiple high-interest bills.
                Our experts connect you with a personalized debt solution at
                zero cost to you.
              </p>

              <div className="apply-modal-benefits">
                <div className="apply-modal-benefit">
                  <span className="apply-modal-check">+</span>
                  <p>
                    <strong>No credit score impact</strong> applying will not
                    affect your score
                  </p>
                </div>
                <div className="apply-modal-benefit">
                  <span className="apply-modal-check">+</span>
                  <p>
                    <strong>Lower monthly payments</strong> often dramatically
                    reduced
                  </p>
                </div>
                <div className="apply-modal-benefit">
                  <span className="apply-modal-check">+</span>
                  <p>
                    <strong>Personalized plan</strong> tailored to your exact
                    situation
                  </p>
                </div>
                <div className="apply-modal-benefit">
                  <span className="apply-modal-check">+</span>
                  <p>
                    <strong>No upfront fees</strong> free to apply and consult
                  </p>
                </div>
              </div>

              <div className="apply-modal-proof">
                <div className="apply-modal-proof-card">
                  <TrustpilotWidget
                    templateId={process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID}
                    height="132px"
                    theme="dark"
                    score="4.8"
                    reviewCount="66 reviews"
                    fallbackClassName="apply-modal-trustpilot-fallback"
                    className="apply-modal-trustpilot-widget"
                  />
                </div>
                <div className="apply-modal-proof-card">
                  <span className="apply-modal-proof-name apply-modal-proof-bbb">
                    BBB Accredited
                  </span>
                  <div className="apply-modal-proof-stars">★★★★★</div>
                  <div className="apply-modal-proof-score apply-modal-proof-score-bbb">
                    A+
                  </div>
                  <div className="apply-modal-proof-meta">
                    Accredited business
                  </div>
                </div>
              </div>

              <div className="apply-modal-testimonials">
                <div className="apply-modal-testimonial">
                  <div className="apply-modal-testimonial-stars">★★★★★</div>
                  <p>
                    &quot;Empower made everything feel clear and manageable. My
                    monthly payments dropped in a way I could actually breathe
                    again.&quot;
                  </p>
                  <span>Verified customer review</span>
                </div>
                <div className="apply-modal-testimonial">
                  <div className="apply-modal-testimonial-stars">★★★★★</div>
                  <p>
                    &quot;The application was quick, pressure-free, and I heard
                    back fast. It felt like real help instead of another sales
                    pitch.&quot;
                  </p>
                  <span>Verified customer review</span>
                </div>
              </div>
            </div>

            <div className="apply-modal-security">
              <span>SSL Secure</span>
              <span>Info stays private</span>
              <span>No obligations</span>
            </div>
          </aside>

          <section className="apply-modal-form-panel">
            <Formik
              initialValues={initialValues}
              validationSchema={stepSchemas[currentStep]}
              validateOnMount={false}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await fullSchema.validate(values, { abortEarly: false });
                  console.log("Form Submitted Successfully:", values);
                  setIsSubmitted(true);
                } catch (error) {
                  console.error("Form validation failed:", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                validateForm,
                setTouched,
                setFieldValue,
                handleChange,
                handleBlur,
              }) => {
                const goToNextStep = async () => {
                  const stepErrors = await validateForm();
                  const hasStepErrors = stepFieldMap[currentStep].some((field) =>
                    Boolean(getIn(stepErrors, field))
                  );

                  if (hasStepErrors) {
                    markStepTouched(setTouched, touched, currentStep);
                    return;
                  }

                  setCurrentStep((step) => Math.min(step + 1, 4));
                };

                const toggleDebtType = (type) => {
                  const nextTypes = values.debtTypes.includes(type)
                    ? values.debtTypes.filter((item) => item !== type)
                    : [...values.debtTypes, type];
                  setFieldValue("debtTypes", nextTypes);
                };

                const renderError = (field) =>
                  touched[field] && errors[field] ? (
                    <span className="apply-modal-error">{errors[field]}</span>
                  ) : null;

                return (
                  <Form className="apply-modal-form" noValidate>
                    <div className={`apply-modal-progress${isSubmitted ? " apply-modal-progress-dim" : ""}`}>
                      <div className="apply-modal-progress-steps">
                        {progressLabels.map((label, index) => {
                          const step = index + 1;
                          const status =
                            step < currentStep || isSubmitted
                              ? "done"
                              : step === currentStep
                                ? "active"
                                : "idle";

                          return (
                            <React.Fragment key={label}>
                              <div
                                className={`apply-modal-progress-dot apply-modal-progress-dot-${status}`}
                              >
                                {step}
                              </div>
                              {step < progressLabels.length ? (
                                <div
                                  className={`apply-modal-progress-line${step < currentStep || isSubmitted ? " is-done" : ""}`}
                                />
                              ) : null}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className="apply-modal-progress-label">
                        <strong>
                          Step {Math.min(currentStep, 4)} of 4
                        </strong>{" "}
                        - {progressLabels[currentStep - 1]}
                      </div>
                    </div>

                    {!isSubmitted ? (
                      <>
                        {currentStep === 1 ? (
                          <div className="apply-modal-step">
                            <div className="apply-modal-step-head">
                              <div className="apply-modal-step-num">
                                Step 1 of 4
                              </div>
                              <h3>How much debt do you need help with?</h3>
                              <p>
                                Select the range that best matches your total
                                current debt.
                              </p>
                            </div>

                            <div className="apply-modal-option-list">
                              {debtAmountOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`apply-modal-option${values.debtAmount === option ? " is-selected" : ""}`}
                                  onClick={() =>
                                    setFieldValue("debtAmount", option)
                                  }
                                >
                                  <span>{option}</span>
                                  <span className="apply-modal-option-check">
                                    {values.debtAmount === option ? "✓" : ""}
                                  </span>
                                </button>
                              ))}
                            </div>
                            {renderError("debtAmount")}

                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-primary"
                              onClick={goToNextStep}
                            >
                              Continue - Select Debt Type
                            </button>
                            <div className="apply-modal-note">
                              Filling out this form will not affect your credit
                              score
                            </div>
                          </div>
                        ) : null}

                        {currentStep === 2 ? (
                          <div className="apply-modal-step">
                            <div className="apply-modal-step-head">
                              <div className="apply-modal-step-num">
                                Step 2 of 4
                              </div>
                              <h3>What kind of debt do you have?</h3>
                              <p>
                                Select all that apply and we will tailor the
                                conversation to your situation.
                              </p>
                            </div>

                            <div className="apply-modal-type-grid">
                              {debtTypeOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`apply-modal-type${values.debtTypes.includes(option.value) ? " is-selected" : ""}`}
                                  onClick={() => toggleDebtType(option.value)}
                                >
                                  <span className="apply-modal-type-icon">
                                    {option.icon}
                                  </span>
                                  <span>{option.label}</span>
                                </button>
                              ))}
                            </div>
                            {renderError("debtTypes")}

                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-primary"
                              onClick={goToNextStep}
                            >
                              Continue - Enter Your Info
                            </button>
                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-secondary"
                              onClick={() => setCurrentStep(1)}
                            >
                              Back
                            </button>
                            <div className="apply-modal-note">
                              No credit check and no obligations
                            </div>
                          </div>
                        ) : null}

                        {currentStep === 3 ? (
                          <div className="apply-modal-step">
                            <div className="apply-modal-step-head">
                              <div className="apply-modal-step-num">
                                Step 3 of 4
                              </div>
                              <h3>Your contact information</h3>
                              <p>
                                Our debt specialists will use this to discuss
                                your available options.
                              </p>
                            </div>

                            <div className="apply-modal-fields-grid">
                              <label className="apply-modal-field">
                                <span>First Name</span>
                                <input
                                  name="firstName"
                                  type="text"
                                  placeholder="Jane"
                                  value={values.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {renderError("firstName")}
                              </label>

                              <label className="apply-modal-field">
                                <span>Last Name</span>
                                <input
                                  name="lastName"
                                  type="text"
                                  placeholder="Smith"
                                  value={values.lastName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {renderError("lastName")}
                              </label>

                              <label className="apply-modal-field apply-modal-field-full">
                                <span>Phone Number</span>
                                <div className="apply-modal-phone">
                                  <div className="apply-modal-phone-prefix">
                                    +1
                                  </div>
                                  <input
                                    name="phone"
                                    type="tel"
                                    placeholder="(555) 000-0000"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                {renderError("phone")}
                              </label>

                              <label className="apply-modal-field apply-modal-field-full">
                                <span>Email Address</span>
                                <input
                                  name="email"
                                  type="email"
                                  placeholder="jane@example.com"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {renderError("email")}
                              </label>

                              <div className="apply-modal-field apply-modal-field-full">
                                <span>Date of Birth</span>
                                <div className="apply-modal-birth-row">
                                  <select
                                    name="birthMonth"
                                    value={values.birthMonth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Month</option>
                                    {monthOptions.map((month) => (
                                      <option key={month} value={month}>
                                        {month}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    name="birthDay"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="2"
                                    placeholder="Day"
                                    value={values.birthDay}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <input
                                    name="birthYear"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="4"
                                    placeholder="Year"
                                    value={values.birthYear}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                {renderError("birthMonth")}
                                {renderError("birthDay")}
                                {renderError("birthYear")}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-primary"
                              onClick={goToNextStep}
                            >
                              Continue - Almost Done
                            </button>
                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-secondary"
                              onClick={() => setCurrentStep(2)}
                            >
                              Back
                            </button>
                          </div>
                        ) : null}

                        {currentStep === 4 ? (
                          <div className="apply-modal-step">
                            <div className="apply-modal-step-head">
                              <div className="apply-modal-step-num">
                                Step 4 of 4
                              </div>
                              <h3>Confirm your address</h3>
                              <p>
                                One last step and your free consultation request
                                is ready to submit.
                              </p>
                            </div>

                            <div className="apply-modal-address-stack">
                              <label className="apply-modal-field">
                                <span>Street Address</span>
                                <input
                                  name="address"
                                  type="text"
                                  placeholder="123 Main Street"
                                  value={values.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {renderError("address")}
                              </label>

                              <div className="apply-modal-two-col">
                                <label className="apply-modal-field">
                                  <span>City</span>
                                  <input
                                    name="city"
                                    type="text"
                                    placeholder="New York"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {renderError("city")}
                                </label>

                                <label className="apply-modal-field">
                                  <span>ZIP Code</span>
                                  <input
                                    name="zipCode"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="5"
                                    placeholder="10001"
                                    value={values.zipCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {renderError("zipCode")}
                                </label>
                              </div>

                              <label className="apply-modal-field">
                                <span>State</span>
                                <select
                                  name="state"
                                  value={values.state}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">Select your state</option>
                                  {states.map((state) => (
                                    <option
                                      key={state.value}
                                      value={state.value}
                                    >
                                      {state.label}
                                    </option>
                                  ))}
                                </select>
                                {renderError("state")}
                              </label>
                            </div>

                            <div className="apply-modal-consent">
                              By clicking submit, you agree to our Terms and
                              Privacy Policy and consent to be contacted by
                              Empower Financial Network and its partners by
                              phone or text. Consent is not required as a
                              condition of service.
                            </div>

                            <button
                              type="submit"
                              className="apply-modal-btn apply-modal-btn-accent"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? "Submitting..."
                                : "Submit My Free Application"}
                            </button>
                            <button
                              type="button"
                              className="apply-modal-btn apply-modal-btn-secondary"
                              onClick={() => setCurrentStep(3)}
                            >
                              Back
                            </button>
                            <div className="apply-modal-note">
                              256-bit SSL encryption and zero credit impact
                            </div>
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <div className="apply-modal-success">
                        <div className="apply-modal-success-icon">+</div>
                        <h3>Application Submitted!</h3>
                        <p>
                          Thank you. One of our debt specialists will reach out
                          shortly to review your options with you.
                        </p>
                        <a href="tel:8664901617">Call Us: (866) 490-1617</a>
                        <span>Available Mon-Fri, 8am-8pm ET</span>
                      </div>
                    )}

                    {!isSubmitted ? (
                      <div className="apply-modal-mobile-proof">
                        <div className="apply-modal-mobile-pill">
                          <TrustpilotWidget
                            templateId={process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID}
                            height="88px"
                            theme="dark"
                            score="4.8"
                            reviewCount="66 reviews"
                            fallbackClassName="apply-modal-mobile-trustpilot"
                            className="apply-modal-mobile-trustpilot-widget"
                          />
                        </div>
                        <div className="apply-modal-mobile-pill">
                          <strong>BBB</strong>
                          <span>A+</span>
                        </div>
                        <div className="apply-modal-mobile-pill">
                          <strong>SSL</strong>
                          <span>Secure</span>
                        </div>
                      </div>
                    ) : null}

                    {!isSubmitted ? (
                      <div className="apply-modal-trust-strip">
                        <span>SSL Secure</span>
                        <span>4.8 Trustpilot</span>
                        <span>BBB A+</span>
                        <span>No Obligations</span>
                      </div>
                    ) : null}
                  </Form>
                );
              }}
            </Formik>
          </section>
        </div>
    </div>
  );
};

export default ApplyModal;
