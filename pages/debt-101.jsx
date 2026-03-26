import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TrustpilotWidget from "../components/TrustpilotWidget";

const faqItems = [
  {
    question: "Can I get debt consolidation with a 550 FICO score?",
    answer:
      "Most personal loan lenders require a minimum FICO of 580 to 620, and at 550, approval is difficult. If you do qualify, the rate may still be too high to help much. At that score, debt relief is usually the more practical option to explore first.",
  },
  {
    question: "How long does debt settlement stay on my credit report?",
    answer:
      "A settled account can remain on your credit report for 7 years from the original delinquency date. The score impact usually softens over time, especially as balances fall and older late-payment history ages.",
  },
  {
    question: "Is debt relief the same as bankruptcy?",
    answer:
      "No. Debt relief is a private negotiation process with creditors, while bankruptcy is a federal court process that may discharge debt. Bankruptcy is stronger legal protection, but it typically carries longer-lasting credit consequences.",
  },
  {
    question: "Will creditors sue me during debt settlement?",
    answer:
      "It can happen, especially if accounts stay delinquent for a long time. Settlement companies factor that risk into their strategy, but it is not eliminated. Bankruptcy is the path that triggers an automatic stay and can stop collection lawsuits immediately once filed.",
  },
  {
    question: "Does debt consolidation hurt your credit score?",
    answer:
      "Usually only a little at first because of the hard inquiry. Over time, many borrowers see improvement if they lower utilization and make the new payment consistently on time.",
  },
  {
    question: "Can I own a home after bankruptcy?",
    answer:
      "Yes. There are waiting periods that depend on loan type and chapter filed, but many people qualify for mortgages again after rebuilding credit and payment history for a few years.",
  },
];

const incomeBars = [
  { label: "Under $25K", value: 3100, color: "#c9a83c" },
  { label: "$25K-50K", value: 4800, color: "#d9b84a" },
  { label: "$50K-75K", value: 6200, color: "#e8c14a" },
  { label: "$75K-100K", value: 7900, color: "#f0d070" },
  { label: "$100K+", value: 12400, color: "#f5dfa0" },
];

const generationBars = [
  { label: "Gen Z", value: 34 },
  { label: "Millennials", value: 52 },
  { label: "Gen X", value: 58 },
  { label: "Boomers", value: 45 },
  { label: "Silent", value: 29 },
];

const resolutionCosts = [
  { label: "Min payments", base: 20000, extra: 38000 },
  { label: "Debt relief", base: 11000, extra: 4500 },
  { label: "Consolidation", base: 20000, extra: 6000 },
  { label: "Bankruptcy", base: 0, extra: 1800 },
];

const delinquencyTrend = [2.1, 2.4, 1.7, 1.2, 1.9, 2.8, 3.2, 3.6, 3.6];
const delinquencyLabels = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

const formatCurrency = (value) => `$${Math.round(value).toLocaleString()}`;

export default function Debt101Page() {
  const [fico, setFico] = useState(550);
  const [income, setIncome] = useState(3500);
  const [debt, setDebt] = useState(20000);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reveals = document.querySelectorAll(".debt101-page .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("visible"), index * 70);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const tool = useMemo(() => {
    const consolidationScore =
      (fico >= 620 ? 45 : fico >= 580 ? 20 : 5) +
      (income >= 3000 ? 30 : income >= 2000 ? 18 : 8) +
      (debt < 40000 ? 15 : 5);

    const reliefScore =
      (fico < 620 ? 40 : 25) +
      (debt >= 10000 ? 30 : 15) +
      (income >= 1500 ? 20 : 10) +
      (income < 5000 ? 10 : 0);

    const bankruptcyScore =
      (income < 2500 ? 40 : 10) +
      (debt > 40000 ? 35 : 5) +
      (fico < 580 ? 15 : 0);

    const options = [
      {
        id: "consolidation",
        name: "Debt Consolidation",
        subtitle: "Combine balances into one lower-rate loan",
        score: consolidationScore,
        eligibility:
          fico >= 620
            ? "Likely eligible"
            : fico >= 580
              ? "Marginal"
              : "Unlikely to qualify",
        eligibilityTone:
          fico >= 620 ? "good" : fico >= 580 ? "warn" : "bad",
        estimate:
          fico >= 720
            ? "9-14% APR"
            : fico >= 680
              ? "14-20% APR"
              : fico >= 620
                ? "20-28% APR"
                : "High denial risk",
        timeframe: "2-5 years",
        impact: "Low short-term credit dip",
        badge:
          fico >= 680 ? "Strong fit" : fico >= 620 ? "Possible" : "Unlikely",
        badgeClass:
          fico >= 680 ? "badgeBest" : fico >= 620 ? "badgeAlt" : "badgeLast",
        barColor: "#e8c14a",
      },
      {
        id: "relief",
        name: "Debt Relief Program",
        subtitle: "Negotiate to settle for less than owed",
        score: reliefScore,
        eligibility: debt >= 7500 ? "Qualifies" : "Usually needs more debt",
        eligibilityTone: debt >= 7500 ? "good" : "warn",
        estimate:
          debt >= 10000
            ? `${formatCurrency(debt * 0.5)}-${formatCurrency(debt * 0.6)} settled`
            : "Often best above $10K",
        timeframe: "2-4 years",
        impact: "Moderate to significant credit hit",
        badge:
          debt >= 10000 && fico < 650 ? "Best fit" : "Strong option",
        badgeClass: debt >= 10000 && fico < 650 ? "badgeBest" : "badgeAlt",
        barColor: "#c9a83c",
      },
      {
        id: "bankruptcy",
        name: "Bankruptcy",
        subtitle: "Chapter 7 or 13 court-based relief",
        score: bankruptcyScore,
        eligibility: "Attorney review required",
        eligibilityTone: "neutral",
        estimate: income < 2500 ? "Ch. 7 may fit" : "Ch. 13 more likely",
        timeframe: "3-6 months or 3-5 years",
        impact: "Severe, long-lasting credit impact",
        badge: bankruptcyScore > 55 ? "Worth reviewing" : "Last resort",
        badgeClass: bankruptcyScore > 55 ? "badgeAlt" : "badgeNeutral",
        barColor: "#8a9bb5",
      },
    ];

    const bestScore = Math.max(...options.map((option) => option.score));

    let verdict =
      "Adjust the sliders to match your situation. The comparison updates instantly to show which path appears strongest based on your credit, income, and total debt.";

    if (income < 2000 && debt > 30000) {
      verdict = `With ${formatCurrency(income)}/month income and ${formatCurrency(debt)} in debt, bankruptcy may be worth discussing early, especially if minimum payments are no longer realistic.`;
    } else if (fico >= 680 && income >= 3000) {
      verdict = `With a ${fico} FICO and ${formatCurrency(income)}/month income, consolidation looks like the cleanest option because you may qualify for a meaningfully lower rate.`;
    } else if (fico >= 620) {
      verdict = `You are in the gray area for consolidation. It may be available, but the rate might not be good enough to create real savings, so relief is worth comparing side by side.`;
    } else if (debt >= 10000) {
      verdict = `With a ${fico} FICO and ${formatCurrency(debt)} in debt, debt relief looks more realistic than consolidation. A settlement program could be the most accessible path if you still have income to fund it.`;
    }

    return {
      bestScore,
      options,
      verdict,
    };
  }, [debt, fico, income]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Debt 101: America's Debt Crisis and Your Real Options",
    description:
      "A guide to debt consolidation, debt relief, and bankruptcy with an interactive debt comparison tool.",
    publisher: { "@type": "Organization", name: "Empower Financial Network" },
  };

  return (
    <>
      <Head>
        <title>Debt 101 | Empower Financial Network</title>
        <meta
          name="description"
          content="Learn how debt consolidation, debt relief, and bankruptcy compare with an interactive Debt 101 page built around FICO score, income, and debt load."
        />
        <meta
          property="og:title"
          content="Debt 101: America's Debt Crisis and Your Real Options"
        />
        <meta
          property="og:description"
          content="Interactive debt comparison and a plain-English breakdown of debt consolidation, debt relief, and bankruptcy."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="debt101-page">
        <section className="hero">
          <div className="heroInner reveal">
            <span className="heroTag">Updated March 2026</span>
            <h1>
              America is drowning
              <br />
              in <em>$1.14 trillion</em>
              <br />
              of credit card debt.
            </h1>
            <p className="heroSub">
              Here&apos;s what that means for you, plus an honest breakdown of the
              three real paths people usually consider when they are carrying
              high-interest debt.
            </p>
            <a href="#compare" className="primaryButton">
              See which option fits my situation
            </a>
          </div>

          <div className="heroStats reveal">
            <div className="heroStat">
              <span className="heroStatNum danger">$1.14T</span>
              <span className="heroStatLabel">Total U.S. credit card debt</span>
            </div>
            <div className="heroStat">
              <span className="heroStatNum danger">21.5%</span>
              <span className="heroStatLabel">Average card APR</span>
            </div>
            <div className="heroStat">
              <span className="heroStatNum danger">$6,329</span>
              <span className="heroStatLabel">Average balance per cardholder</span>
            </div>
            <div className="heroStat">
              <span className="heroStatNum danger">3.6%</span>
              <span className="heroStatLabel">90+ day delinquency rate</span>
            </div>
          </div>
        </section>

        <section id="crisis">
          <div className="container">
            <span className="sectionEyebrow">The Data</span>
            <h2 className="sectionTitle">How did we get here?</h2>
            <p className="sectionBody">
              Credit card debt has climbed as inflation, higher borrowing costs,
              and flat take-home budgets have pushed households to lean harder on
              revolving balances for everyday expenses.
            </p>

            <div className="statRow reveal">
              <div className="statBox alert">
                <span className="statNum">$38,000</span>
                <div className="statLabel">
                  What $20K at 21.5% can cost if you make minimum payments for
                  decades
                </div>
                <div className="statChange up">Up to $18K+ in interest alone</div>
              </div>
              <div className="statBox warn">
                <span className="statNum">52%</span>
                <div className="statLabel">
                  Of Millennials carry a month-to-month credit card balance
                </div>
                <div className="statChange up">Highest among major generations</div>
              </div>
              <div className="statBox alert">
                <span className="statNum">58%</span>
                <div className="statLabel">
                  Of Gen X households carry revolving card debt
                </div>
                <div className="statChange up">A heavy midlife debt burden</div>
              </div>
              <div className="statBox ok">
                <span className="statNum">3</span>
                <div className="statLabel">
                  Real paths exist: consolidation, settlement, or bankruptcy
                </div>
                <div className="statChange down">Compare them below</div>
              </div>
            </div>

            <div className="crisisGrid reveal">
              <div className="chartCard">
                <p className="chartTitle">Average card balance by income bracket</p>
                <div className="barChart">
                  {incomeBars.map((bar) => (
                    <div className="barChartRow" key={bar.label}>
                      <span>{bar.label}</span>
                      <div className="barTrack">
                        <div
                          className="barFill"
                          style={{
                            width: `${(bar.value / 12400) * 100}%`,
                            background: bar.color,
                          }}
                        />
                      </div>
                      <strong>{formatCurrency(bar.value)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chartCard">
                <p className="chartTitle">% of households carrying card debt</p>
                <div className="barChart">
                  {generationBars.map((bar) => (
                    <div className="barChartRow" key={bar.label}>
                      <span>{bar.label}</span>
                      <div className="barTrack">
                        <div
                          className="barFill dark"
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                      <strong>{bar.value}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chartCard">
                <p className="chartTitle">Approximate cost by resolution path</p>
                <div className="stackList">
                  {resolutionCosts.map((item) => {
                    const total = item.base + item.extra;
                    return (
                      <div className="stackItem" key={item.label}>
                        <div className="stackMeta">
                          <span>{item.label}</span>
                          <strong>{formatCurrency(total)}</strong>
                        </div>
                        <div className="stackBar">
                          <div
                            className="stackBase"
                            style={{ width: `${(item.base / total) * 100}%` }}
                          />
                          <div
                            className="stackExtra"
                            style={{ width: `${(item.extra / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="chartCard">
                <p className="chartTitle">Credit card delinquency rate, 2018-2026</p>
                <div className="trendList">
                  {delinquencyTrend.map((value, index) => (
                    <div className="trendPoint" key={delinquencyLabels[index]}>
                      <span>{delinquencyLabels[index]}</span>
                      <div className="trendTrack">
                        <div
                          className="trendDot"
                          style={{ left: `${(value / 4) * 100}%` }}
                        />
                      </div>
                      <strong>{value}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="factStrip">
          <div className="container factGrid reveal">
            <div className="factItem">
              <div className="factNum">1 in 5</div>
              <div className="factText">
                Americans spend more than 30% of monthly income on debt
                payments, a level many experts consider debt distress.
              </div>
            </div>
            <div className="factItem">
              <div className="factNum">43%</div>
              <div className="factText">
                Of cardholders do not know their current APR, even while rates
                remain near historic highs.
              </div>
            </div>
            <div className="factItem">
              <div className="factNum">$58K</div>
              <div className="factText">
                Potential lifetime interest on $25K of high-rate credit card
                debt when only minimums are made.
              </div>
            </div>
          </div>
        </div>

        <section className="trustSection">
          <div className="container">
            <div className="trustPanel reveal">
              <div className="trustPanelCopy">
                <span className="sectionEyebrow">Customer Reviews</span>
                <h2 className="sectionTitle">See what people are saying on Trustpilot</h2>
                <p className="sectionBody">
                  Independent reviews help people sanity-check the experience
                  before they talk with a debt specialist. You can read the full
                  set directly on Trustpilot.
                </p>
              </div>

              <div className="trustPanelWidget">
                <TrustpilotWidget
                  templateId={process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID}
                  height="220px"
                  theme="light"
                  score="4.8"
                  reviewCount="66 reviews"
                  fallbackClassName="trustpilotCardFallback"
                  className="trustpilotCardWidget"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="toolSection">
          <div className="container">
            <span className="sectionEyebrow">Interactive Tool</span>
            <h2 className="sectionTitle">Which option fits your situation?</h2>
            <p className="sectionBody">
              Adjust the sliders to match your real numbers. The comparison
              updates immediately to show which path appears strongest based on
              score, income, and total debt.
            </p>

            <div className="toolWrap reveal">
              <div className="toolHeader">
                <h3>Your debt situation</h3>
                <p>All estimates update live based on your inputs below.</p>
              </div>

              <div className="toolInputs">
                <div className="inputGroup">
                  <label htmlFor="fico-range">FICO credit score</label>
                  <input
                    id="fico-range"
                    type="range"
                    min="300"
                    max="850"
                    step="10"
                    value={fico}
                    onChange={(event) => setFico(Number(event.target.value))}
                  />
                  <div className="sliderVal">
                    <span>300</span>
                    <span className="current">{fico}</span>
                    <span>850</span>
                  </div>
                </div>

                <div className="inputGroup">
                  <label htmlFor="income-range">Monthly income (gross)</label>
                  <input
                    id="income-range"
                    type="range"
                    min="0"
                    max="12000"
                    step="250"
                    value={income}
                    onChange={(event) => setIncome(Number(event.target.value))}
                  />
                  <div className="sliderVal">
                    <span>$0</span>
                    <span className="current">{formatCurrency(income)}</span>
                    <span>$12K</span>
                  </div>
                </div>

                <div className="inputGroup">
                  <label htmlFor="debt-range">Total credit card debt</label>
                  <input
                    id="debt-range"
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={debt}
                    onChange={(event) => setDebt(Number(event.target.value))}
                  />
                  <div className="sliderVal">
                    <span>$1K</span>
                    <span className="current">{formatCurrency(debt)}</span>
                    <span>$100K</span>
                  </div>
                </div>
              </div>

              <div className="optionCards">
                {tool.options.map((option) => (
                  <article
                    className={`optionCard ${
                      option.score === tool.bestScore ? "best" : ""
                    }`}
                    key={option.id}
                  >
                    <span className={`optionBadge ${option.badgeClass}`}>
                      {option.badge}
                    </span>
                    <div className="optionName">{option.name}</div>
                    <div className="optionSub">{option.subtitle}</div>

                    <div className="fitBarWrap">
                      <div className="fitBarLabel">Fit for your situation</div>
                      <div className="fitBar">
                        <div
                          className="fitBarFill"
                          style={{
                            width: `${Math.min(option.score, 100)}%`,
                            background: option.barColor,
                          }}
                        />
                      </div>
                    </div>

                    <div className="optionRows">
                      <div className="optionRow">
                        <span className="optionRowLabel">Eligibility</span>
                        <span
                          className={`optionRowValue tone-${option.eligibilityTone}`}
                        >
                          {option.eligibility}
                        </span>
                      </div>
                      <div className="optionRow">
                        <span className="optionRowLabel">Est. rate / savings</span>
                        <span className="optionRowValue">{option.estimate}</span>
                      </div>
                      <div className="optionRow">
                        <span className="optionRowLabel">Timeframe</span>
                        <span className="optionRowValue">{option.timeframe}</span>
                      </div>
                      <div className="optionRow">
                        <span className="optionRowLabel">Credit impact</span>
                        <span className="optionRowValue">{option.impact}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="verdictBar">
                <strong>Your situation:</strong> {tool.verdict}
              </div>
            </div>
          </div>
        </section>

        <section id="consolidation" className="optionSection">
          <div className="container">
            <span className="sectionEyebrow">Option 1</span>
            <div className="optionHeader reveal">
              <div className="optionInfo">
                <h3 className="sectionTitle">Debt Consolidation</h3>
                <p>
                  Consolidation rolls multiple balances into one payment,
                  ideally at a lower interest rate. It is usually the cleanest
                  path when you still have decent credit and stable income.
                </p>
              </div>
              <div className="prosCons">
                <div className="pros">
                  <h4>Works in your favor</h4>
                  <ul>
                    <li>One payment and one payoff schedule</li>
                    <li>Potentially lower APR</li>
                    <li>Usually the lightest credit impact</li>
                    <li>Fixed timeline can improve discipline</li>
                    <li>No settlement process required</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>Watch out for</h4>
                  <ul>
                    <li>Often needs a 620+ score</li>
                    <li>Income verification is common</li>
                    <li>Rates can still be expensive</li>
                    <li>Fees may apply on transfers or origination</li>
                    <li>New card use can recreate the problem</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="whoQualifies reveal">
              <h4>Who typically qualifies for consolidation?</h4>
              <div className="criteriaGrid">
                <div className="criteriaItem">
                  <div className="criteriaLabel">FICO score</div>
                  <div className="criteriaVal">620 minimum, 680+ preferred</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Monthly income</div>
                  <div className="criteriaVal">$2,500+ and stable</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Debt-to-income</div>
                  <div className="criteriaVal">Usually under 43%</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Typical rate</div>
                  <div className="criteriaVal">About 9% to 28% APR</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Timeframe</div>
                  <div className="criteriaVal">2 to 5 years</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Credit impact</div>
                  <div className="criteriaVal">Low, often improves later</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="relief" className="optionSection optionSectionAlt">
          <div className="container">
            <span className="sectionEyebrow">Option 2</span>
            <div className="optionHeader reveal">
              <div className="optionInfo">
                <h3 className="sectionTitle">Debt Relief Programs</h3>
                <p>
                  Debt relief or settlement programs negotiate with creditors to
                  accept less than the full balance. This route is often more
                  accessible when credit is already damaged and the debt load is
                  large enough to justify negotiation.
                </p>
              </div>
              <div className="prosCons">
                <div className="pros">
                  <h4>Works in your favor</h4>
                  <ul>
                    <li>No high credit score requirement</li>
                    <li>Can reduce total amount repaid</li>
                    <li>Stops the full-interest spiral</li>
                    <li>May lower required monthly cash flow</li>
                    <li>Can avoid bankruptcy in some cases</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>Watch out for</h4>
                  <ul>
                    <li>Credit score usually drops first</li>
                    <li>Fees can be meaningful</li>
                    <li>Collection pressure may continue</li>
                    <li>Forgiven debt can have tax implications</li>
                    <li>Negative reporting may remain for years</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="whoQualifies reveal">
              <h4>Who typically benefits most from debt relief?</h4>
              <div className="criteriaGrid">
                <div className="criteriaItem">
                  <div className="criteriaLabel">FICO score</div>
                  <div className="criteriaVal">Any score</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Minimum debt</div>
                  <div className="criteriaVal">$7,500 to $10,000+</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Income</div>
                  <div className="criteriaVal">Enough to fund settlements</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Typical savings</div>
                  <div className="criteriaVal">Often 40% to 60% before fees</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Timeframe</div>
                  <div className="criteriaVal">2 to 4 years</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Credit impact</div>
                  <div className="criteriaVal">Moderate to significant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bankruptcy" className="optionSection">
          <div className="container">
            <span className="sectionEyebrow">Option 3</span>
            <div className="optionHeader reveal">
              <div className="optionInfo">
                <h3 className="sectionTitle">Bankruptcy</h3>
                <p>
                  Bankruptcy is a legal reset, not just a financial product.
                  Chapter 7 can eliminate many unsecured debts quickly, while
                  Chapter 13 reorganizes them into a court-approved repayment
                  plan. It is the strongest relief tool, but also the most
                  serious.
                </p>
              </div>
              <div className="prosCons">
                <div className="pros">
                  <h4>Works in your favor</h4>
                  <ul>
                    <li>Can stop collections and lawsuits quickly</li>
                    <li>Chapter 7 can resolve in months</li>
                    <li>May erase unsecured debt entirely</li>
                    <li>No good credit score required</li>
                    <li>Creates a true restart point</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>Watch out for</h4>
                  <ul>
                    <li>Major credit consequences</li>
                    <li>Attorney costs can apply</li>
                    <li>Not every debt is dischargeable</li>
                    <li>Assets may be at risk in some cases</li>
                    <li>Future borrowing may be harder for a while</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="whoQualifies reveal">
              <h4>Chapter 7 vs. Chapter 13</h4>
              <div className="criteriaGrid">
                <div className="criteriaItem">
                  <div className="criteriaLabel">Ch. 7 income test</div>
                  <div className="criteriaVal">Below median or means test pass</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Ch. 13 income</div>
                  <div className="criteriaVal">Regular income required</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Ch. 7 timeframe</div>
                  <div className="criteriaVal">3 to 6 months</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Ch. 13 timeframe</div>
                  <div className="criteriaVal">3 to 5 years</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Credit impact</div>
                  <div className="criteriaVal">Severe, 7 to 10 years</div>
                </div>
                <div className="criteriaItem">
                  <div className="criteriaLabel">Best for</div>
                  <div className="criteriaVal">High debt and limited options</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faqSection">
          <div className="container">
            <span className="sectionEyebrow">Common Questions</span>
            <h2 className="sectionTitle">What people ask most</h2>
            <div className="faqList reveal">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div className="faqItem" key={item.question}>
                    <button
                      className={`faqQuestion ${isOpen ? "open" : ""}`}
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? -1 : index)
                      }
                      type="button"
                    >
                      {item.question}
                    </button>
                    <div className={`faqAnswer ${isOpen ? "open" : ""}`}>
                      {item.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="get-help" className="ctaSection">
          <h2>Ready to see your real numbers?</h2>
          <p>
            A free consultation can help you compare real next steps based on
            your debt, credit profile, and income.
          </p>
          <Link href="/contact" className="primaryButton">
            Get My Free Debt Analysis
          </Link>
          <div className="trustRow">
            <span className="trustItem">No obligation, no pressure</span>
            <span className="trustItem">Real options, not a sales pitch</span>
            <span className="trustItem">Response within 24 hours</span>
          </div>
        </section>

        <footer className="pageFooter">
          <div className="footerInner">
            <div className="disclaimer">
              <strong>Disclaimer:</strong> This page is for educational purposes
              only and is not legal, tax, or financial advice. Outcomes vary by
              debt type, state law, creditor behavior, and your personal
              financial profile. Speak with a licensed professional before making
              a final decision.
            </div>
            <div className="footerCopy">
              © 2026 Empower Financial Network. Educational resource only.
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .debt101-page {
          --ink: #0d1f3c;
          --paper: #0d1f3c;
          --cream: #f9f4e8;
          --accent: var(--gold);
          --accent-light: var(--gold-light);
          --accent-dark: var(--gold-dim);
          --muted: #8a9bb5;
          --border: rgba(232, 193, 74, 0.14);
          --card: rgba(20, 40, 80, 0.82);
          --card-strong: #142850;
          --light-border: rgba(13, 31, 60, 0.1);
          --light-muted: #5d6f8d;
          --light-card: #ffffff;
          background: var(--cream);
          color: var(--ink);
          font-family: "DM Sans", sans-serif;
        }

        .debt101-page :global(*) {
          box-sizing: border-box;
        }

        .debt101-page :global(.reveal) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .debt101-page :global(.reveal.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        .container,
        .footerInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero {
          background:
            radial-gradient(circle at top right, rgba(232, 193, 74, 0.08), transparent 28%),
            linear-gradient(160deg, #081424 0%, #0d1f3c 58%, #142850 100%);
          color: var(--cream);
          padding: 120px 24px 0;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 53px,
            rgba(232, 193, 74, 0.05) 53px,
            rgba(232, 193, 74, 0.05) 54px
          );
          pointer-events: none;
        }

        .heroInner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .heroTag,
        .sectionEyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .heroTag {
          background: rgba(232, 193, 74, 0.14);
          color: var(--accent);
          border: 1px solid rgba(232, 193, 74, 0.28);
          padding: 5px 12px;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        h1,
        .sectionTitle,
        .optionInfo h3,
        .ctaSection h2 {
          font-family: "Playfair Display", serif;
          letter-spacing: -0.03em;
        }

        .hero h1 {
          margin: 0 0 24px;
          max-width: 800px;
          font-size: clamp(2.7rem, 6vw, 5rem);
          line-height: 0.98;
          font-weight: 900;
        }

        .hero h1 em {
          color: var(--accent);
          font-style: normal;
        }

        .heroSub,
        .ctaSection p {
          max-width: 580px;
          color: rgba(249, 244, 232, 0.76);
          font-size: 1.08rem;
          line-height: 1.7;
          margin: 0 0 40px;
        }

        .primaryButton {
          display: inline-block;
          background: var(--accent);
          color: #0d1f3c;
          text-decoration: none;
          padding: 16px 40px;
          border-radius: 4px;
          font-weight: 700;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .primaryButton:hover {
          background: var(--accent-light);
          transform: translateY(-1px);
        }

        .heroStats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          margin-top: 60px;
          background: rgba(232, 193, 74, 0.08);
        }

        .heroStat {
          background: rgba(8, 20, 36, 0.72);
          text-align: center;
          padding: 28px 20px;
        }

        .heroStatNum,
        .statNum,
        .factNum {
          display: block;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          line-height: 1;
        }

        .heroStatNum {
          font-size: 2.2rem;
          color: var(--cream);
          margin-bottom: 8px;
        }

        .danger {
          color: var(--accent);
        }

        .heroStatLabel {
          color: rgba(138, 155, 181, 0.88);
          font-size: 0.76rem;
        }

        section {
          padding: 72px 0;
          border-top: 1px solid var(--light-border);
        }

        .sectionEyebrow {
          color: var(--accent);
          margin-bottom: 12px;
        }

        .sectionTitle {
          margin: 0 0 16px;
          font-size: clamp(2rem, 4vw, 2.75rem);
          line-height: 1.14;
          font-weight: 700;
        }

        .sectionBody {
          max-width: 680px;
          color: var(--light-muted);
          font-size: 1.02rem;
          line-height: 1.8;
          margin: 0 0 40px;
        }

        .statRow,
        .crisisGrid,
        .factGrid,
        .toolInputs,
        .optionCards,
        .optionHeader,
        .prosCons,
        .criteriaGrid {
          display: grid;
          gap: 16px;
        }

        .statRow {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-bottom: 32px;
        }

        .statBox,
        .chartCard,
        .whoQualifies,
        .pros,
        .cons {
          background: var(--light-card);
          border: 1px solid var(--light-border);
          border-radius: 8px;
        }

        .statBox {
          padding: 20px;
        }

        .statBox.alert {
          border-left: 4px solid var(--accent);
        }

        .statBox.warn {
          border-left: 4px solid var(--accent-dark);
        }

        .statBox.ok {
          border-left: 4px solid var(--accent-light);
        }

        .statNum {
          font-size: 1.75rem;
          margin-bottom: 8px;
        }

        .statLabel,
        .chartTitle,
        .factText,
        .optionInfo p,
        .faqAnswer,
        .disclaimer {
          color: var(--light-muted);
          line-height: 1.75;
        }

        .statLabel,
        .chartTitle {
          font-size: 0.9rem;
        }

        .statChange {
          margin-top: 8px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .statChange.up {
          color: var(--accent);
        }

        .statChange.down {
          color: var(--accent-light);
        }

        .crisisGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .chartCard {
          padding: 24px;
        }

        .barChart,
        .stackList,
        .trendList {
          display: grid;
          gap: 14px;
          margin-top: 18px;
        }

        .barChartRow,
        .stackMeta,
        .trendPoint {
          display: grid;
          align-items: center;
          gap: 12px;
        }

        .barChartRow,
        .trendPoint {
          grid-template-columns: 92px 1fr auto;
        }

        .barChartRow span,
        .stackMeta span,
        .trendPoint span {
          font-size: 0.8rem;
          color: var(--light-muted);
        }

        .barTrack,
        .trendTrack {
          position: relative;
          height: 10px;
          background: rgba(13, 31, 60, 0.12);
          border-radius: 999px;
          overflow: hidden;
        }

        .barFill {
          height: 100%;
          border-radius: 999px;
        }

        .barFill.dark {
          background: var(--accent);
        }

        .stackBar {
          height: 14px;
          display: flex;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(13, 31, 60, 0.12);
          margin-top: 8px;
        }

        .stackBase {
          background: var(--accent-light);
        }

        .stackExtra {
          background: var(--accent-dark);
        }

        .trendTrack {
          overflow: visible;
        }

        .trendDot {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px rgba(232, 193, 74, 0.12);
        }

        .factStrip,
        .pageFooter {
          background:
            radial-gradient(circle at top, rgba(232, 193, 74, 0.08), transparent 34%),
            linear-gradient(160deg, #081424 0%, #0b1f3f 55%, #102a52 100%);
          color: var(--cream);
        }

        .factStrip {
          padding: 48px 0;
        }

        .factGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 40px;
        }

        .factItem {
          border-left: 3px solid var(--accent);
          padding-left: 20px;
        }

        .factNum {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .factText {
          color: rgba(249, 244, 232, 0.7);
          font-size: 0.9rem;
        }

        .trustSection {
          background: var(--cream);
        }

        .trustPanel {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 28px;
          align-items: center;
          padding: 28px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid var(--light-border);
          border-radius: 18px;
          box-shadow: 0 18px 50px rgba(6, 14, 28, 0.08);
        }

        .trustPanelCopy .sectionBody {
          margin-bottom: 0;
        }

        .trustPanelWidget {
          min-width: 0;
        }

        .trustpilotCardWidget {
          width: 100%;
        }

        .trustpilotCardFallback {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(232, 193, 74, 0.18);
          background:
            radial-gradient(circle at top right, rgba(232, 193, 74, 0.12), transparent 34%),
            linear-gradient(160deg, rgba(10, 24, 40, 0.96) 0%, rgba(20, 40, 80, 0.94) 100%);
          color: var(--cream);
          text-decoration: none;
          box-shadow: 0 18px 40px rgba(6, 14, 28, 0.22);
        }

        .trustpilotCardFallback :global(.trustpilot-fallback-brand) {
          margin-bottom: 10px;
        }

        .trustpilotCardFallback :global(.trustpilot-fallback-score) {
          color: var(--cream);
          font-size: 2.3rem;
        }

        .trustpilotCardFallback :global(.trustpilot-fallback-meta) {
          color: rgba(249, 244, 232, 0.72);
        }

        .toolSection,
        .faqSection {
          background: var(--cream);
        }

        .toolWrap {
          background: var(--light-card);
          border: 1px solid var(--light-border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(6, 14, 28, 0.28);
        }

        .toolHeader {
          background: linear-gradient(160deg, rgba(10, 24, 40, 0.94) 0%, rgba(20, 40, 80, 0.92) 100%);
          color: var(--cream);
          padding: 28px 32px;
        }

        .toolHeader h3 {
          margin: 0 0 6px;
          font-family: "Playfair Display", serif;
          font-size: 1.6rem;
        }

        .toolHeader p {
          margin: 0;
          color: rgba(138, 155, 181, 0.88);
        }

        .toolInputs {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          padding: 28px 32px;
          border-bottom: 1px solid var(--light-border);
        }

        .inputGroup label,
        .pros h4,
        .cons h4,
        .criteriaLabel {
          display: block;
          margin-bottom: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--light-muted);
        }

        .inputGroup input[type="range"] {
          width: 100%;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          background: rgba(138, 155, 181, 0.28);
          outline: none;
        }

        .inputGroup input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid #0d1f3c;
          box-shadow: 0 0 0 1px var(--accent);
        }

        .sliderVal {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 0.8rem;
          color: var(--light-muted);
        }

        .sliderVal .current {
          font-size: 0.96rem;
          font-weight: 700;
          color: var(--ink);
        }

        .optionCards {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .optionCard {
          padding: 28px 24px;
          border-right: 1px solid var(--light-border);
        }

        .optionCard:last-child {
          border-right: 0;
        }

        .optionCard.best {
          background: rgba(232, 193, 74, 0.08);
          border-top: 3px solid var(--accent);
        }

        .optionBadge {
          display: inline-block;
          margin-bottom: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .badgeBest {
          color: var(--accent);
          border: 1px solid rgba(232, 193, 74, 0.4);
          background: rgba(232, 193, 74, 0.08);
        }

        .badgeAlt {
          color: var(--ink);
          border: 1px solid rgba(138, 155, 181, 0.28);
          background: rgba(138, 155, 181, 0.12);
        }

        .badgeLast {
          color: var(--accent-dark);
          border: 1px solid rgba(201, 168, 60, 0.28);
          background: rgba(201, 168, 60, 0.12);
        }

        .badgeNeutral {
          color: var(--light-muted);
          border: 1px solid var(--light-border);
          background: rgba(138, 155, 181, 0.08);
        }

        .optionName {
          font-family: "Playfair Display", serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .optionSub {
          color: var(--light-muted);
          font-size: 0.86rem;
          margin-bottom: 16px;
        }

        .fitBarWrap {
          margin-bottom: 16px;
        }

        .fitBarLabel {
          font-size: 0.72rem;
          color: var(--light-muted);
          margin-bottom: 6px;
        }

        .fitBar {
          height: 6px;
          border-radius: 999px;
          background: rgba(13, 31, 60, 0.12);
          overflow: hidden;
        }

        .fitBarFill {
          height: 100%;
          border-radius: 999px;
        }

        .optionRows {
          font-size: 0.84rem;
        }

        .optionRow {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 0;
          border-top: 1px solid var(--light-border);
        }

        .optionRowLabel {
          color: var(--light-muted);
        }

        .optionRowValue {
          text-align: right;
          font-weight: 700;
        }

        .tone-good {
          color: var(--accent-light);
        }

        .tone-warn {
          color: var(--accent-dark);
        }

        .tone-bad {
          color: var(--accent);
        }

        .tone-neutral {
          color: var(--light-muted);
        }

        .verdictBar {
          background: rgba(232, 193, 74, 0.08);
          padding: 20px 32px;
          border-top: 1px solid var(--light-border);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .optionSection {
          scroll-margin-top: 84px;
        }

        .optionHeader {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 48px;
          align-items: start;
          margin-bottom: 40px;
        }

        .optionInfo p {
          margin: 0;
          font-size: 1rem;
        }

        .prosCons {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .pros,
        .cons,
        .whoQualifies {
          padding: 20px;
        }

        .pros {
          border-top: 3px solid var(--accent-light);
        }

        .cons {
          border-top: 3px solid var(--accent-dark);
        }

        .pros h4 {
          color: var(--accent-light);
        }

        .cons h4 {
          color: var(--accent-dark);
        }

        .pros ul,
        .cons ul {
          list-style: none;
          margin: 0;
          padding: 0;
          color: var(--light-muted);
          font-size: 0.92rem;
        }

        .pros li,
        .cons li {
          position: relative;
          padding: 5px 0 5px 18px;
        }

        .pros li::before,
        .cons li::before {
          position: absolute;
          left: 0;
          top: 5px;
          font-weight: 700;
        }

        .pros li::before {
          content: "✓";
          color: var(--accent-light);
        }

        .cons li::before {
          content: "×";
          color: var(--accent-dark);
        }

        .whoQualifies h4 {
          margin: 0 0 16px;
          font-size: 0.95rem;
        }

        .criteriaGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .criteriaItem {
          background: var(--light-card);
          border: 1px solid var(--light-border);
          border-radius: 6px;
          padding: 14px;
        }

        .criteriaVal {
          font-weight: 700;
          color: var(--ink);
          line-height: 1.5;
        }

        .faqList {
          max-width: 760px;
        }

        .faqItem {
          border-bottom: 1px solid var(--light-border);
        }

        .faqQuestion {
          width: 100%;
          text-align: left;
          background: none;
          border: 0;
          padding: 20px 0;
          cursor: pointer;
          font: inherit;
          color: var(--ink);
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }

        .faqQuestion::after {
          content: "+";
          color: var(--light-muted);
          font-size: 1.3rem;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .faqQuestion.open::after {
          transform: rotate(45deg);
        }

        .faqAnswer {
          display: none;
          padding: 0 0 20px;
        }

        .faqAnswer.open {
          display: block;
        }

        .ctaSection {
          background:
            radial-gradient(circle at top, rgba(232, 193, 74, 0.08), transparent 34%),
            linear-gradient(160deg, #081424 0%, #0b1f3f 55%, #102a52 100%);
          color: var(--cream);
        }

        .ctaSection {
          text-align: center;
          padding: 80px 24px;
        }

        .ctaSection h2 {
          margin: 0 0 16px;
          font-size: clamp(2rem, 4vw, 3rem);
        }

        .ctaSection p {
          margin-left: auto;
          margin-right: auto;
        }

        .trustRow {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 32px;
          margin-top: 28px;
        }

        .trustItem {
          color: rgba(249, 244, 232, 0.48);
          font-size: 0.82rem;
        }

        .trustItem::before {
          content: "✓ ";
          color: var(--accent);
        }

        .pageFooter {
          padding: 40px 0;
        }

        .disclaimer {
          max-width: 820px;
          color: rgba(249, 244, 232, 0.55);
          font-size: 0.8rem;
          margin-bottom: 20px;
        }

        .footerCopy {
          color: rgba(249, 244, 232, 0.34);
          font-size: 0.78rem;
        }

        @media (max-width: 900px) {
          .debt101-page :global(.reveal) {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .heroStats,
          .statRow,
          .crisisGrid,
          .toolInputs,
          .optionCards,
          .optionHeader,
          .prosCons,
          .criteriaGrid,
          .factGrid,
          .trustPanel {
            grid-template-columns: 1fr;
          }

          .optionCard {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .optionCard:last-child {
            border-bottom: 0;
          }

          .barChartRow,
          .trendPoint {
            grid-template-columns: 72px 1fr auto;
          }
        }
      `}</style>
    </>
  );
}

Debt101Page.disableSiteFooter = true;
