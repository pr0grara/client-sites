// California Law & Business Exam — high-yield study guide (CONTENT, brand-agnostic).
// Canonical source; vendored into client projects via `npm run sync`.
//
// The Law & Business exam is identical for EVERY CSLB classification, so this asset is
// reused across every contractor client. Structure mirrors the official exam blueprint
// (CSLB Law & Business Study Guide, rev. 03-2026): seven weighted sections.
//
// ACCURACY: every figure below is grounded in a named source (see `sources` + per-item
// `src`). Statutory facts are drawn from the free 2026 California Contractors License
// Law & Reference Book and the cited codes; tax/wage/safety figures change periodically,
// so `verifiedAsOf` is surfaced in the guide with a "confirm current figures" note.
// When in doubt, the cited primary source wins over this summary.

export const LAW_BUSINESS_GUIDE = {
  slug: 'law-business',
  title: 'California Law & Business Exam — Study Guide',
  subtitle: 'The office-side exam every CSLB contractor has to pass, in plain English.',
  verifiedAsOf: 'June 2026',
  examFacts: [
    'Closed book. ~115 multiple-choice questions, four choices each, one BEST answer.',
    'About 3 hours. A calculator is provided for the math questions.',
    'No penalty for guessing — never leave a question blank.',
    'Passing is roughly the low-70s percent. Aim to score ~75%+ on practice tests before you book.'
  ],
  sources: [
    { label: 'California Contractors License Law & Reference Book (2026 ed.)', href: 'https://www.cslb.ca.gov/Resources/GuidesAndPublications/2026/2026_CSLB_Law_Book.pdf' },
    { label: 'CSLB Law & Business Exam Study Guide (official outline)', href: 'https://www.cslb.ca.gov/Resources/StudyGuides/LawStudyGuide.pdf' },
    { label: 'California Business & Professions Code (Contractors)', href: 'https://leginfo.legislature.ca.gov/faces/codes.xhtml' },
    { label: 'California Civil Code (mechanics liens, §8000+)', href: 'https://leginfo.legislature.ca.gov/faces/codes.xhtml' },
    { label: 'EDD California Employer’s Guide (DE 44)', href: 'https://edd.ca.gov/en/payroll_taxes/forms_and_publications/' },
    { label: 'IRS Publication 15 (Circular E), Employer’s Tax Guide', href: 'https://www.irs.gov/publications/p15' },
    { label: 'DIR Public Works Manual / prevailing wage', href: 'https://www.dir.ca.gov/public-works/publicworks.html' },
    { label: 'Cal/OSHA, Title 8 California Code of Regulations', href: 'https://www.dir.ca.gov/dosh/' }
  ],

  // Ordered by exam weight (heaviest first) so study time follows the points.
  sections: [
    // ─────────────────────────────────────────────────────────────────── 21%
    {
      id: 'contracts',
      title: 'Contract Requirements & Execution',
      weight: 21,
      intro: "The single heaviest section. It's about putting a job on paper the legal way: bidding it, writing the contract, taking deposits, billing progress, and handling change orders. California is strict about home improvement contracts, and a lot of points live in the exact dollar limits and required notices.",
      key: [
        "A home improvement contract (HIC) must be in writing, signed, and given to the buyer before work starts. It must show the total contract price, a payment schedule, approximate start and completion dates, a description of the work and materials, and the buyer's right to cancel.",
        "Down payment on an HIC is capped: it cannot exceed $1,000 or 10% of the contract price, whichever is LESS. (Service-and-repair contracts are a narrow exception with their own rules.)",
        "Progress payments must stay tied to work actually performed and materials actually delivered — you can never be paid substantially ahead of the work.",
        "The buyer of an HIC gets a three-business-day right to cancel (longer for certain disaster victims and seniors). The signed Notice of Cancellation must be attached to the contract, and the three days run from signing and receiving that notice.",
        "Required notices in an HIC include the Mechanics Lien Warning and (since 2025/26 changes) the contractor's email address and a way to cancel by email; disclose subcontractors on request.",
        "A change order should be in writing and signed BEFORE the extra work is done — same logic as the original contract.",
        "Retention is money (often ~10%) the owner holds back from each progress payment until the job is finished and the lien period passes.",
        "Estimating: bid = direct costs (labor, material, equipment, subcontractors) + overhead + profit. Bid too low and you eat the loss; bid too high and you lose the job.",
        "Lump-sum (fixed price) vs. unit-price vs. cost-plus contracts: know that unit price bills by measured quantity, and an 'allowance' is a placeholder dollar amount for an item not yet selected."
      ],
      numbers: [
        { label: 'HIC down payment cap', value: '$1,000 or 10% of price, whichever is LESS', src: 'B&P §7159' },
        { label: '“Home improvement” threshold', value: 'work over $500 (labor + materials)', src: 'B&P §7151 / Law Book' },
        { label: 'Right to cancel an HIC', value: '3 business days', src: 'B&P §7159 / Civ. Code §1689' },
        { label: 'Boldface notice type size', value: 'at least 10-point boldface', src: 'B&P §7159' },
        { label: 'Typical retention withheld', value: '~10% of each progress payment', src: 'Law Book, Managing a Business' }
      ],
      math: [
        { prompt: 'A home improvement contract is $9,000. What is the largest legal down payment?', work: '10% of $9,000 = $900. The cap is $1,000 OR 10%, whichever is LESS → $900 is less than $1,000.', answer: '$900' },
        { prompt: 'A home improvement contract is $30,000. What is the largest legal down payment?', work: '10% of $30,000 = $3,000. The cap is the LESSER of $1,000 or 10% → $1,000 wins.', answer: '$1,000' },
        { prompt: 'On a $40,000 job with 10% retention, how much is held back across the job?', work: '10% of $40,000 = $4,000 withheld from progress payments until completion and the lien period.', answer: '$4,000' }
      ],
      questions: [
        { q: 'A home improvement contract totals $7,500. What is the maximum down payment a contractor may legally require?', choices: ['$1,000', '$750', '$1,500', '$2,500'], answer: 1, explain: '10% of $7,500 = $750. The cap is $1,000 or 10%, whichever is LESS, so $750.' },
        { q: 'A home improvement contract totals $50,000. The maximum legal down payment is:', choices: ['$5,000', '$2,500', '$1,000', '10% of any progress payment'], answer: 2, explain: '10% would be $5,000, but the cap is the LESSER of $1,000 or 10% — so $1,000.' },
        { q: 'A residential home improvement contract must, at minimum, be:', choices: ['Oral if under $5,000', 'In writing and signed before work begins', 'Filed with CSLB', 'Notarized'], answer: 1, explain: 'HICs must be in writing, signed, and given to the buyer before work starts.' },
        { q: 'How long does a buyer generally have to cancel a home improvement contract?', choices: ['24 hours', '3 business days', '10 business days', 'There is no right to cancel'], answer: 1, explain: 'The standard right to cancel is three business days; the Notice of Cancellation must be attached to the contract.' },
        { q: 'The three-day right to cancel generally begins when the buyer:', choices: ['Pays the deposit', 'Signs the contract and receives the cancellation notice', 'First meets the contractor', 'Sees the work start'], answer: 1, explain: 'The clock runs from signing and receiving the required Notice of Cancellation.' },
        { q: 'Retention on a construction project is best described as:', choices: ['A deposit paid to the contractor up front', 'A portion of each progress payment the owner withholds until completion', 'The contractor’s profit margin', 'A penalty for late completion'], answer: 1, explain: 'Retention (often ~10%) is held back from progress payments until the job is done and the lien period passes.' },
        { q: 'The best practice for extra work discovered mid-project is to:', choices: ['Do it and bill it on the final invoice', 'Get a signed written change order before doing the work', 'Absorb it to keep the client happy', 'Verbally agree and proceed'], answer: 1, explain: 'Change orders should be in writing and signed before the extra work is performed.' },
        { q: 'A contractor’s bid price should generally equal:', choices: ['Direct costs only', 'Direct costs + overhead + profit', 'Materials + labor', 'Whatever the competition charges'], answer: 1, explain: 'A sound bid covers direct costs (labor, material, equipment, subs) plus overhead and profit.' },
        { q: 'A payment schedule in a home improvement contract must be:', choices: ['Paid 50% up front', 'Tied to work performed and materials delivered', 'Equal monthly installments regardless of progress', 'Left blank until the job ends'], answer: 1, explain: 'Payments must track actual progress — you can’t collect substantially ahead of the work.' },
        { q: 'In a contract, an “allowance” is:', choices: ['A discount for early payment', 'A placeholder dollar amount for an item not yet selected', 'The contractor’s overhead', 'A late fee'], answer: 1, explain: 'An allowance budgets a set dollar amount for a not-yet-chosen item (e.g., tile), reconciled later.' },
        { q: 'Which is required content of a home improvement contract?', choices: ['The contractor’s tax returns', 'Approximate start and completion dates', 'The owner’s credit score', 'A notarized signature'], answer: 1, explain: 'Approximate start and completion dates are required, along with price, payment schedule, and the cancellation notice.' },
        { q: 'Unit-price contracting bills the owner based on:', choices: ['A single fixed lump sum', 'Measured quantities of work actually done', 'Cost plus a fixed fee', 'The contractor’s overhead rate'], answer: 1, explain: 'Unit-price contracts charge per measured unit installed (e.g., per cubic yard), so the total flexes with quantity.' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 20%
    {
      id: 'employment',
      title: 'Employment Requirements',
      weight: 20,
      intro: "Almost as heavy as contracts, and pure office knowledge — hiring, payroll, taxes, breaks, and the deadlines that come with having employees. This is where field experience helps you the least, so it deserves real study time.",
      key: [
        "New hires: every employee completes a federal Form I-9 (work eligibility) and a W-4 (federal withholding). California employers must report new hires to the EDD within 20 days.",
        "Payroll taxes you withhold and/or match: federal income tax, Social Security and Medicare (FICA), federal and state unemployment (FUTA/SUTA), and California state income tax and SDI.",
        "How OFTEN you deposit federal payroll taxes is set by the SIZE of your payroll tax liability (a lookback), not the number of employees.",
        "Year-end you give each employee a W-2 by January 31. You file Form 941 quarterly and Form 940 (FUTA) annually with the IRS, and DE 9 / DE 9C with the EDD.",
        "Final pay in California: an employee you FIRE must be paid immediately; an employee who QUITS without notice must be paid within 72 hours (immediately if they gave 72 hours' notice).",
        "Overtime in California is daily and weekly: 1.5× over 8 hours/day or 40 hours/week, and 2× over 12 hours/day.",
        "Meal and rest breaks: a 30-minute unpaid meal period before the end of the 5th hour of work, and a paid 10-minute rest break for roughly every 4 hours worked.",
        "Unemployment insurance is funded by the EMPLOYER (FUTA/SUTA) — it is not deducted from the worker's pay.",
        "Misclassifying an employee as an independent contractor to dodge payroll taxes and workers' comp is a serious violation; California uses the strict 'ABC' test to decide who is truly independent."
      ],
      numbers: [
        { label: 'Report new hires to EDD', value: 'within 20 days of start', src: 'CA Unemployment Ins. Code / DE 44' },
        { label: 'Final pay — employee fired', value: 'immediately (at termination)', src: 'CA Labor Code §201' },
        { label: 'Final pay — employee quits, no notice', value: 'within 72 hours', src: 'CA Labor Code §202' },
        { label: 'Daily overtime (1.5×)', value: 'over 8 hours in a workday', src: 'CA Labor Code §510' },
        { label: 'Double time (2×)', value: 'over 12 hours in a workday', src: 'CA Labor Code §510' },
        { label: 'Meal period', value: '30 min before end of 5th hour', src: 'CA Labor Code §512' },
        { label: 'Rest break', value: '10 min paid per ~4 hours worked', src: 'CA Wage Orders' },
        { label: 'W-2 to employees by', value: 'January 31', src: 'IRS' },
        { label: 'Social Security tax (employee share)', value: '6.2% to the annual wage base', src: 'IRS Pub 15 — confirm current rate/base' },
        { label: 'Medicare tax (employee share)', value: '1.45% (no wage cap)', src: 'IRS Pub 15 — confirm current rate' }
      ],
      math: [
        { prompt: 'An employee works 10 hours in one day at $30/hour (straight time). What is the day’s gross pay with California daily overtime?', work: 'First 8 hrs at $30 = $240. Hours 9–10 are overtime at 1.5× = $45 × 2 = $90. Total = $240 + $90.', answer: '$330' },
        { prompt: 'An employee earns $1,200 gross in a pay period. What is the employee’s Social Security withholding at 6.2% (below the wage base)?', work: '$1,200 × 0.062 = $74.40.', answer: '$74.40' },
        { prompt: 'An employee works 13 hours in one day at $40/hour. Day’s gross pay (CA rules)?', work: '8 hrs × $40 = $320; hrs 9–12 (4 hrs) at 1.5× = $60 × 4 = $240; hr 13 at 2× = $80. Total = $320 + $240 + $80.', answer: '$640' }
      ],
      questions: [
        { q: 'What determines how often an employer’s federal payroll tax deposits must be made?', choices: ['The number of employees', 'The amount of the payroll tax liability', 'How long the company has operated', 'The ratio of salaried to hourly staff'], answer: 1, explain: 'Deposit frequency is based on the size of the payroll tax liability (a lookback period), not headcount.' },
        { q: 'In California, an employee who is fired must receive their final wages:', choices: ['Within 72 hours', 'On the next regular payday', 'Immediately, at the time of termination', 'Within 7 days'], answer: 2, explain: 'A discharged employee must be paid all final wages immediately (Labor Code §201).' },
        { q: 'An employee quits with no advance notice. Final wages are due:', choices: ['Immediately', 'Within 72 hours', 'On the next payday', 'Within 30 days'], answer: 1, explain: 'An employee who quits without notice must be paid within 72 hours (Labor Code §202).' },
        { q: 'California daily overtime (1.5×) begins after how many hours in a workday?', choices: ['6 hours', '8 hours', '10 hours', '40 hours'], answer: 1, explain: 'CA pays 1.5× over 8 hours/day (and over 40/week); 2× kicks in over 12 hours/day.' },
        { q: 'California double-time (2×) is generally owed after how many hours in a workday?', choices: ['8 hours', '10 hours', '12 hours', '16 hours'], answer: 2, explain: 'Double time applies to hours worked beyond 12 in a single workday.' },
        { q: 'Which federal form documents an employee’s eligibility to work in the U.S.?', choices: ['Form W-4', 'Form W-2', 'Form I-9', 'Form 941'], answer: 2, explain: 'The I-9 verifies work eligibility; the W-4 sets withholding; the W-2 reports annual wages; 941 is the quarterly return.' },
        { q: 'Form W-4 is used to determine:', choices: ['Work eligibility', 'Federal income tax withholding', 'Overtime owed', 'Workers’ comp class'], answer: 1, explain: 'The W-4 tells the employer how much federal income tax to withhold.' },
        { q: 'California employers must report a new hire to the EDD within:', choices: ['20 days', '30 days', '10 days', '60 days'], answer: 0, explain: 'New-hire reporting to the EDD is due within 20 days of the start of work.' },
        { q: 'Employers must furnish each employee a Form W-2 by:', choices: ['December 31', 'January 31', 'April 15', 'The next payday'], answer: 1, explain: 'W-2s must be provided to employees by January 31.' },
        { q: 'A nonexempt employee is generally entitled to an unpaid meal period of at least 30 minutes:', choices: ['Only on shifts over 10 hours', 'Before the end of the 5th hour of work', 'At the very start of the shift', 'Only if the employee requests it'], answer: 1, explain: 'A 30-minute meal period must be provided before the end of the 5th hour worked.' },
        { q: 'Unemployment insurance (FUTA/SUTA) is paid by:', choices: ['The employee through payroll deduction', 'The employer', 'The state directly', 'A 50/50 split'], answer: 1, explain: 'Unemployment insurance is an employer-funded tax, not withheld from the worker’s wages.' },
        { q: 'Treating a worker who is really an employee as an “independent contractor” primarily lets an employer avoid:', choices: ['Issuing invoices', 'Payroll taxes and workers’ compensation', 'Signing contracts', 'Carrying a license'], answer: 1, explain: 'Misclassification dodges payroll taxes and workers’ comp coverage — a serious violation (CA uses the ABC test).' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 15%
    {
      id: 'finances',
      title: 'Business Finances',
      weight: 15,
      intro: "Basic construction accounting: reading the two core financial statements, watching cash, and knowing where a cost belongs. You don't need to be an accountant — you need the vocabulary and a few formulas the exam leans on.",
      key: [
        "The accounting equation: Assets = Liabilities + Owner's Equity. A balance sheet is a snapshot of those three at a single point in time.",
        "The income statement (profit & loss) covers a PERIOD of time: revenue − expenses = profit. Balance sheet = a moment; income statement = a stretch.",
        "Assets split into current (cash, receivables, inventory — used up within a year) and fixed (equipment, vehicles, buildings). Liabilities split into current and long-term.",
        "Working capital = current assets − current liabilities. The current ratio = current assets ÷ current liabilities — a quick read on whether you can pay near-term bills.",
        "Cash vs. accrual: cash accounting records money when it actually moves; accrual records revenue when earned and expenses when incurred, regardless of when cash changes hands.",
        "Direct (job) costs tie to a specific project — its labor, material, equipment, subs. Overhead / general & administrative (G&A) costs keep the company running (office rent, insurance, the owner's general-use truck).",
        "Depreciation spreads the cost of equipment over its useful life. A vehicle for general company use is a G&A expense, not a direct job cost.",
        "Markup is added ON cost; margin is a share OF the selling price. A 50% markup on $100 of cost = $150 price, which is a 33% margin. Confusing the two is a classic way to underbid.",
        "Cash flow can sink a profitable contractor: payroll and materials go out before the progress payment comes in. Plan for the gap, and watch retention you haven't collected yet."
      ],
      numbers: [
        { label: 'Accounting equation', value: 'Assets = Liabilities + Owner’s Equity', src: 'standard accounting' },
        { label: 'Working capital', value: 'current assets − current liabilities', src: 'standard accounting' },
        { label: 'Current ratio', value: 'current assets ÷ current liabilities', src: 'standard accounting' },
        { label: 'Quick (acid-test) ratio', value: '(current assets − inventory) ÷ current liabilities', src: 'standard accounting' },
        { label: 'Vehicle for general use', value: 'depreciated as G&A (overhead), not a job cost', src: 'standard cost accounting' }
      ],
      math: [
        { prompt: 'Current assets are $90,000 and current liabilities are $60,000. What is the current ratio, and the working capital?', work: 'Current ratio = 90,000 ÷ 60,000 = 1.5. Working capital = 90,000 − 60,000 = 30,000.', answer: 'Current ratio 1.5; working capital $30,000' },
        { prompt: 'A material costs $200. You apply a 25% markup. What is the selling price?', work: 'Markup is on cost: $200 × 0.25 = $50; price = $200 + $50.', answer: '$250' },
        { prompt: 'You sell an item for $250 that cost $200. What is the gross margin percentage?', work: 'Margin = profit ÷ price = ($250 − $200) ÷ $250 = $50 ÷ $250 = 20%.', answer: '20%' }
      ],
      questions: [
        { q: 'Which equation is the basis of a balance sheet?', choices: ['Revenue − Expenses = Profit', 'Assets = Liabilities + Owner’s Equity', 'Cash In − Cash Out = Net Worth', 'Price = Cost + Markup'], answer: 1, explain: 'Assets = Liabilities + Owner’s Equity is the accounting equation a balance sheet reflects.' },
        { q: 'A balance sheet shows a company’s financial position:', choices: ['Over a full year', 'At a single point in time', 'For one project only', 'Before taxes only'], answer: 1, explain: 'A balance sheet is a snapshot at one moment; the income statement covers a period.' },
        { q: 'Which statement reports profit over a period of time?', choices: ['Balance sheet', 'Income statement (profit & loss)', 'Bank reconciliation', 'Aging report'], answer: 1, explain: 'The income statement (P&L) reports revenue and expenses over a period, yielding profit.' },
        { q: 'A company buys a car for general use by office staff. Its depreciation is charged to:', choices: ['Direct job costs', 'General and administrative (overhead)', 'Project management for the current job', 'Company profit'], answer: 1, explain: 'A general-use vehicle is a G&A/overhead expense, not a cost of any one job.' },
        { q: 'Working capital is calculated as:', choices: ['Total assets − total liabilities', 'Current assets − current liabilities', 'Cash + accounts receivable', 'Revenue − expenses'], answer: 1, explain: 'Working capital = current assets − current liabilities.' },
        { q: 'Under accrual accounting, revenue is recorded when:', choices: ['Cash is received', 'It is earned, regardless of when cash arrives', 'The contract is signed', 'The bank statement clears'], answer: 1, explain: 'Accrual records revenue when earned and expenses when incurred; cash basis records when money actually moves.' },
        { q: 'A material costs $400. With a 50% markup, the price is:', choices: ['$600', '$800', '$450', '$200'], answer: 0, explain: 'Markup is on cost: $400 × 50% = $200; price = $600.' },
        { q: 'A current ratio well below 1.0 most likely signals:', choices: ['Strong profitability', 'Difficulty paying short-term obligations', 'Too much equipment', 'High retention'], answer: 1, explain: 'Current assets below current liabilities (ratio < 1.0) suggests trouble covering near-term bills.' },
        { q: 'Which of these is a FIXED asset rather than a current asset?', choices: ['Cash', 'Accounts receivable', 'A backhoe', 'Inventory'], answer: 2, explain: 'Equipment like a backhoe is a fixed asset; cash, receivables, and inventory are current assets.' },
        { q: 'A profitable contractor can still fail because of:', choices: ['Too much working capital', 'Poor cash flow / the gap between paying costs and getting paid', 'Paying taxes early', 'Carrying insurance'], answer: 1, explain: 'Profit on paper doesn’t pay this week’s bills — cash-flow timing sinks otherwise-profitable firms.' },
        { q: 'The quick (acid-test) ratio differs from the current ratio by excluding:', choices: ['Cash', 'Inventory', 'Accounts payable', 'Long-term debt'], answer: 1, explain: 'The quick ratio removes inventory (the least liquid current asset) to be more conservative.' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 14%
    {
      id: 'safety',
      title: 'Safety',
      weight: 14,
      intro: "Cal/OSHA basics: the written program every employer needs, the records you keep, and the incidents you must report fast. Concrete contractors live this on site, but the exam tests the paperwork and the reporting deadlines.",
      key: [
        "Every California employer must have a written Injury and Illness Prevention Program (IIPP) — Title 8 §3203. It names a responsible person and covers hazard identification, correction, training, and recordkeeping.",
        "A serious work-related injury, illness, or any death must be reported to Cal/OSHA immediately — within 8 hours of when you knew or should have known.",
        "Employers log recordable work injuries/illnesses on the Cal/OSHA Form 300 log and post the annual Form 300A summary (Feb 1–Apr 30).",
        "Hazard Communication: workers have a right to know about chemicals on site. Keep Safety Data Sheets (SDS), label containers, and train.",
        "A 'competent person' is someone trained to spot hazards and authorized to correct them — required for tasks like excavation and fall protection.",
        "Common construction triggers: fall protection at 6 feet in construction; cave-in protection for excavations/trenches 5 feet deep or more; a Heat Illness Prevention plan for outdoor work (water, shade, rest, training).",
        "The employer must provide and pay for required personal protective equipment (PPE).",
        "Cal/OSHA requires posting the official safety/'Safety and Health Protection on the Job' poster where employees can see it.",
        "Asbestos and lead work have their own registration/certification rules and are heavily regulated."
      ],
      numbers: [
        { label: 'Written safety program', value: 'IIPP required for every employer', src: 'Cal/OSHA T8 §3203' },
        { label: 'Report serious injury/death to Cal/OSHA', value: 'immediately — within 8 hours', src: 'Cal/OSHA T8 §342' },
        { label: 'Injury recordkeeping', value: 'Form 300 log; post 300A summary Feb 1–Apr 30', src: 'Cal/OSHA recordkeeping' },
        { label: 'Fall protection (construction)', value: 'generally required at 6 feet', src: 'Cal/OSHA T8 — confirm task-specific' },
        { label: 'Excavation cave-in protection', value: 'trenches 5 feet deep or more', src: 'Cal/OSHA T8 excavation' },
        { label: 'PPE cost', value: 'employer provides/pays for required PPE', src: 'Cal/OSHA T8' }
      ],
      math: [],
      questions: [
        { q: 'Every California employer is required to have a written:', choices: ['Business plan', 'Injury and Illness Prevention Program (IIPP)', 'Union agreement', 'Quality control manual'], answer: 1, explain: 'Title 8 §3203 requires a written IIPP for every employer.' },
        { q: 'A serious work-related injury or a death must be reported to Cal/OSHA:', choices: ['Within 30 days', 'On the next 300A summary', 'Immediately — within 8 hours', 'Only if OSHA asks'], answer: 2, explain: 'Serious injuries, illnesses, and deaths must be reported immediately, within 8 hours.' },
        { q: 'Safety Data Sheets (SDS) are part of which program?', choices: ['Hazard Communication (right-to-know)', 'Workers’ compensation', 'Prevailing wage', 'Fall protection'], answer: 0, explain: 'SDS, labeling, and training are part of Hazard Communication — workers’ right to know about chemicals.' },
        { q: 'A “competent person” on a jobsite is someone who:', choices: ['Holds the contractor’s license', 'Can identify hazards and is authorized to correct them', 'Is the lowest-paid worker', 'Only keeps the 300 log'], answer: 1, explain: 'A competent person is trained to recognize hazards and authorized to take prompt corrective action.' },
        { q: 'Cave-in/shoring protection is generally required for excavations and trenches that are at least:', choices: ['3 feet deep', '5 feet deep', '10 feet deep', '20 feet deep'], answer: 1, explain: 'Protective systems are generally required at 5 feet or more (and sooner in unstable soil).' },
        { q: 'Fall protection in construction is generally required at heights of:', choices: ['4 feet', '6 feet', '10 feet', '15 feet'], answer: 1, explain: 'Cal/OSHA generally requires fall protection at 6 feet in construction (task-specific rules vary).' },
        { q: 'The annual summary of recordable injuries that must be posted in the workplace is the:', choices: ['Form 941', 'Form 300A', 'Form I-9', 'DE 9'], answer: 1, explain: 'The Form 300A summary is posted Feb 1–Apr 30; the 300 is the detailed log.' },
        { q: 'Who must pay for required personal protective equipment (PPE)?', choices: ['The employee', 'The employer', 'Split 50/50', 'Cal/OSHA'], answer: 1, explain: 'Employers must provide and pay for required PPE.' },
        { q: 'A Heat Illness Prevention plan for outdoor work must provide, at minimum:', choices: ['Bonuses for hot days', 'Water, shade, rest, and training', 'Shorter contracts', 'Extra insurance'], answer: 1, explain: 'The core elements are access to water, shade, rest/recovery, and training.' },
        { q: 'Which work has special registration/certification requirements due to its hazard?', choices: ['Painting', 'Asbestos abatement', 'Drywall finishing', 'Flatwork'], answer: 1, explain: 'Asbestos (and lead) work is heavily regulated with its own registration/certification.' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 13%
    {
      id: 'licensing',
      title: 'Business Organization & Licensing',
      weight: 13,
      intro: "Who needs a license, how the business is structured, and the rules that keep the license valid. Much of this is straight from the Contractors License Law, and the numbers are very memorizable.",
      key: [
        "You need a CSLB license to contract for any job where the combined labor and materials total $500 or more. Splitting a job into sub-$500 pieces to dodge the rule is illegal.",
        "Three license groups: Class A (General Engineering), Class B (General Building), and Class C (specialty trades, like C-8 Concrete). A Class B job must involve at least two unrelated trades.",
        "The license is qualified by a person — a Responsible Managing Owner (RMO) or Responsible Managing Employee (RME) — who has the experience and passes the exams. An RMO is an owner; an RME is a permanent employee.",
        "An RME must be a bona fide, permanent employee and 'actively engaged' — working at least 32 hours a week, or 80% of the hours the business operates, whichever is less.",
        "Experience: applicants generally need at least 4 years of journey-level (or higher) experience within the last 10 years to qualify for the trade exam.",
        "The exam can be waived in limited cases — for example, if within the prior 5 years you personally passed the same classification's exam, or served as the qualifier for a license in good standing in that classification.",
        "A license is NOT transferable. Advertising must show your license number. Notify CSLB of changes (address, personnel, business name) promptly.",
        "Grounds for discipline include abandonment of a job, willful departure from plans/specs, and contracting outside your classification.",
        "A minor cannot hold a license without a court-appointed guardian. Licenses renew on a two-year cycle, and can be placed 'inactive' to keep the license without contracting."
      ],
      numbers: [
        { label: 'License required at', value: '$500+ (labor + materials combined)', src: 'B&P §7048 / §7028' },
        { label: 'RME “actively engaged”', value: '32 hrs/week or 80% of operating hours, whichever is less', src: 'B&P §7068 / Law Book' },
        { label: 'Experience to qualify', value: '4 years journey-level within the last 10', src: 'CSLB applicant requirements' },
        { label: 'Exam waiver lookback', value: '5 years (same classification)', src: 'B&P §7065.3 / Law Book' },
        { label: 'Class B definition', value: 'work in 2+ unrelated trades', src: 'B&P §7057' },
        { label: 'License renewal cycle', value: 'every 2 years', src: 'B&P §7140' },
        { label: 'Unlicensed contracting penalty', value: 'civil penalties up to $15,000', src: 'Law Book (2026 changes)' }
      ],
      math: [],
      questions: [
        { q: 'A contractor’s license is required when the combined labor and materials for a job total at least:', choices: ['$200', '$500', '$1,000', '$5,000'], answer: 1, explain: 'The license threshold is $500 or more in combined labor and materials.' },
        { q: 'Breaking a $4,000 job into nine separate $450 contracts to avoid the license law is:', choices: ['Legal, since each is under $500', 'Illegal — you cannot split a job to evade the license requirement', 'Allowed with the owner’s consent', 'Only a problem for home improvement'], answer: 1, explain: 'Splitting a project into sub-threshold pieces to dodge licensure is prohibited.' },
        { q: 'A Responsible Managing Employee (RME) must be “actively engaged,” meaning at least:', choices: ['10 hours a week', '32 hours a week or 80% of operating hours, whichever is less', '40 hours a week always', 'Whatever the contract states'], answer: 1, explain: 'An RME must work 32 hrs/week or 80% of the business’s operating hours, whichever is less.' },
        { q: 'To qualify for a trade exam, an applicant generally needs how much journey-level experience?', choices: ['1 year within 5', '4 years within the last 10', '8 years total', 'No experience is required'], answer: 1, explain: 'Generally at least four years of journey-level (or higher) experience within the last ten years.' },
        { q: 'A Class B (General Building) contract generally must involve:', choices: ['Only one trade', 'At least two unrelated trades', 'Public works only', 'Engineering structures'], answer: 1, explain: 'A General Building (B) project requires at least two unrelated building trades.' },
        { q: 'Which classification fits a contractor who forms, pours, and finishes concrete?', choices: ['Class A – General Engineering', 'Class B – General Building', 'C-8 – Concrete', 'C-12 – Earthwork & Paving'], answer: 2, explain: 'C-8 Concrete covers forming, pouring, placing, and finishing concrete work.' },
        { q: 'A contractor’s advertising must include:', choices: ['The owner’s home address', 'The CSLB license number', 'A photo of the owner', 'The bond company’s name'], answer: 1, explain: 'License numbers must appear in advertising.' },
        { q: 'Which is a ground for disciplinary action against a license?', choices: ['Finishing a job early', 'Abandoning a project without legal excuse', 'Offering a discount', 'Hiring an apprentice'], answer: 1, explain: 'Abandonment, willful departure from plans, and contracting outside your classification are disciplinary grounds.' },
        { q: 'A California contractor license is:', choices: ['Freely transferable to a buyer of the business', 'Not transferable to another person or entity', 'Valid in every state', 'Permanent once issued'], answer: 1, explain: 'Licenses are not transferable; a new owner generally needs their own license.' },
        { q: 'California contractor licenses must be renewed:', choices: ['Every year', 'Every 2 years', 'Every 4 years', 'Only when info changes'], answer: 1, explain: 'Active licenses renew on a two-year cycle.' },
        { q: 'A contractor who wants to keep a license but stop contracting for a while can:', choices: ['Let it expire', 'Place it on inactive status', 'Transfer it to a friend', 'Nothing — you must keep working'], answer: 1, explain: 'An inactive license keeps the license alive without the right to contract, with no bond/insurance needed while inactive.' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 12%
    {
      id: 'insurance-liens',
      title: 'Insurance & Liens',
      weight: 12,
      intro: "Protecting yourself and getting paid. Two big buckets: the insurance and bonds the state requires, and the mechanics-lien system — a powerful tool with unforgiving deadlines. The lien day-counts are pure points.",
      key: [
        "Every active license carries a $25,000 contractor license bond. A qualifying individual (RMO/RME) also generally needs a $25,000 bond of qualifying individual, unless the RMO owns 10%+ of the company. LLCs must additionally carry a $100,000 worker bond.",
        "A surety bond has three parties: the principal (contractor), the obligee (the public/state it protects), and the surety (the bonding company). A bond protects others — it is NOT insurance for the contractor; if the surety pays a claim, you must repay it.",
        "Workers' compensation insurance is mandatory if you have employees — and is required for some classifications even with no employees (concrete C-8 among them). CSLB will not renew a license that's out of compliance with workers' comp.",
        "Commercial General Liability (CGL) covers third-party bodily injury and property damage. It's not state-mandated for all, but most clients and GCs require it.",
        "A mechanics lien lets an unpaid contractor, sub, or supplier put a claim on the improved property. The deadlines are strict — miss one and you lose the right.",
        "Preliminary Notice: serve it within 20 days of first furnishing labor or materials to preserve lien (and stop-notice) rights. Anyone without a direct contract with the owner especially needs it.",
        "Recording the Claim of Lien: if a Notice of Completion (or Cessation) is recorded, a subcontractor/supplier has 30 days and the direct (prime) contractor has 60 days; if no such notice is recorded, you have 90 days after completion.",
        "After recording a lien you must file a lawsuit to foreclose within 90 days, or the lien expires.",
        "A stop payment notice reaches the construction FUNDS (and on private jobs can be bonded); a mechanics lien reaches the PROPERTY. On PUBLIC works you cannot lien — your remedies are the stop payment notice and the project's payment bond."
      ],
      numbers: [
        { label: 'Contractor license bond', value: '$25,000', src: 'B&P §7071.6' },
        { label: 'Bond of qualifying individual', value: '$25,000 (waived if RMO owns 10%+)', src: 'B&P §7071.9' },
        { label: 'LLC worker bond (additional)', value: '$100,000', src: 'B&P §7071.6.5 / Law Book' },
        { label: 'Preliminary Notice', value: 'within 20 days of first furnishing', src: 'Civ. Code §8200' },
        { label: 'Record lien — after Notice of Completion', value: 'sub/supplier 30 days; direct contractor 60 days', src: 'Civ. Code §8412–8414' },
        { label: 'Record lien — no Notice of Completion', value: 'within 90 days of completion', src: 'Civ. Code §8414' },
        { label: 'Foreclose on lien (file suit)', value: 'within 90 days of recording', src: 'Civ. Code §8460' },
        { label: 'Owner notify lien claimants after recording NOC', value: 'within 10 days', src: 'Civ. Code §8190' },
        { label: 'Small claims limit (individual)', value: '$12,500', src: 'CCP §116.221' }
      ],
      math: [
        { prompt: 'You start furnishing materials on March 1. What is the last day to serve a Preliminary Notice to fully protect lien rights?', work: '20 days from first furnishing → March 1 + 20 days.', answer: 'March 21' },
        { prompt: 'No Notice of Completion is recorded. The job is completed June 1. Last day to record a Claim of Lien?', work: '90 days after completion → about August 30.', answer: '~90 days after June 1 (≈ Aug 30)' }
      ],
      questions: [
        { q: 'The required California contractor license bond amount is:', choices: ['$12,500', '$15,000', '$25,000', '$100,000'], answer: 2, explain: 'The contractor license bond is $25,000.' },
        { q: 'The three parties to a surety bond are:', choices: ['Buyer, seller, broker', 'Principal, obligee, surety', 'Owner, lender, contractor', 'Plaintiff, defendant, judge'], answer: 1, explain: 'Principal (contractor), obligee (the party protected), and surety (the bonding company).' },
        { q: 'A contractor license bond primarily protects:', choices: ['The contractor', 'The public/consumers and certain claimants', 'The surety company', 'The employees only'], answer: 1, explain: 'A bond protects others, not the contractor — and if the surety pays, the contractor must repay it.' },
        { q: 'A Preliminary Notice must generally be served within how many days of first furnishing labor or materials?', choices: ['10 days', '20 days', '30 days', '90 days'], answer: 1, explain: 'Serve the Preliminary Notice within 20 days of first furnishing to preserve lien rights.' },
        { q: 'If no Notice of Completion is recorded, a contractor must record a Claim of Lien within how many days of completion?', choices: ['30 days', '60 days', '90 days', '120 days'], answer: 2, explain: 'With no Notice of Completion/Cessation, the window is 90 days after completion.' },
        { q: 'If the owner records a Notice of Completion, a SUBCONTRACTOR must record its lien within:', choices: ['10 days', '30 days', '60 days', '90 days'], answer: 1, explain: 'After a Notice of Completion, subs/suppliers have 30 days; the direct contractor has 60.' },
        { q: 'After recording a mechanics lien, you must file suit to foreclose within:', choices: ['30 days', '90 days', '6 months', '1 year'], answer: 1, explain: 'You must file the foreclosure action within 90 days of recording, or the lien expires.' },
        { q: 'A mechanics lien attaches to the property; a stop payment notice instead reaches the:', choices: ['Contractor’s license', 'Construction funds/money', 'Building permit', 'Surety bond'], answer: 1, explain: 'A stop payment notice targets the unpaid construction funds; the lien targets the property.' },
        { q: 'On a public works project, an unpaid subcontractor’s remedy is:', choices: ['A mechanics lien on the public building', 'A stop payment notice and the payment bond', 'Foreclosure on the property', 'Nothing'], answer: 1, explain: 'You can’t lien public property; remedies are the stop payment notice and the project payment bond.' },
        { q: 'Workers’ compensation insurance in California is:', choices: ['Optional for all contractors', 'Required only for corporations', 'Required if you have employees, and for some classifications even without employees', 'Replaced by the license bond'], answer: 2, explain: 'WC is mandatory with employees, and required for certain classifications (e.g., C-8) even with none.' },
        { q: 'Commercial General Liability (CGL) insurance mainly covers:', choices: ['Employee injuries', 'Third-party bodily injury and property damage', 'The contractor’s own tools', 'Unpaid invoices'], answer: 1, explain: 'CGL covers third-party bodily injury and property damage; employee injuries fall under workers’ comp.' },
        { q: 'The most a California small claims court can award an individual is generally:', choices: ['$5,000', '$10,000', '$12,500', '$25,000'], answer: 2, explain: 'The small claims limit for an individual is $12,500 (CCP §116.221).' }
      ]
    },

    // ─────────────────────────────────────────────────────────────────── 5%
    {
      id: 'public-works',
      title: 'Public Works',
      weight: 5,
      intro: "The lightest section, but easy points if you know the handful of rules that make government jobs different from private ones: prevailing wage, registration, certified payroll, and bonds.",
      key: [
        "Public works = construction paid for with public funds. Workers must be paid the DIR-set prevailing wage for their craft and area — often more than the private-market rate.",
        "Prevailing wage is the basic hourly rate PLUS fringe benefits set by the Director of Industrial Relations for that craft and locality.",
        "Contractors and subs on most public works must be registered with the California Department of Industrial Relations (DIR) to bid and work.",
        "Certified payroll records must be submitted (electronically, via the DIR's eCPR system) showing each worker, hours, classification, and the wage paid.",
        "Public works use the apprenticeship system, and prevailing-wage enforcement carries penalties for underpayment.",
        "A payment bond is required on public works contracts over $25,000 to protect subcontractors and suppliers.",
        "No mechanics liens on public projects — payment is protected by the payment bond and the stop payment notice instead.",
        "Prevailing-wage requirements generally attach to public works over $1,000."
      ],
      numbers: [
        { label: 'Prevailing wage applies', value: 'public works over $1,000', src: 'CA Labor Code §1771' },
        { label: 'Prevailing wage =', value: 'basic hourly rate + fringe benefits', src: 'DIR' },
        { label: 'DIR contractor registration', value: 'required to bid/work most public works', src: 'CA Labor Code §1725.5' },
        { label: 'Payment bond required', value: 'public works contracts over $25,000', src: 'Civ. Code §9550' },
        { label: 'Certified payroll', value: 'submitted via DIR eCPR', src: 'DIR Public Works Manual' }
      ],
      math: [],
      questions: [
        { q: 'On a public works project, workers must be paid:', choices: ['Minimum wage', 'The DIR prevailing wage for the craft and area', 'Whatever the contract sets', 'The federal poverty wage'], answer: 1, explain: 'Public works require the prevailing wage set by the DIR for that craft and locality.' },
        { q: 'Prevailing wage is best described as:', choices: ['The basic hourly rate only', 'The basic hourly rate plus fringe benefits', 'Minimum wage plus tips', 'Whatever the union charges'], answer: 1, explain: 'Prevailing wage combines a basic hourly rate and fringe benefits set by the DIR.' },
        { q: 'To bid and work most California public works, a contractor must be registered with:', choices: ['The CSLB only', 'The Department of Industrial Relations (DIR)', 'The IRS', 'The local chamber of commerce'], answer: 1, explain: 'DIR registration is required to bid and work most public works projects.' },
        { q: 'Documentation showing each worker’s hours, classification, and wage on a public job is called:', choices: ['A balance sheet', 'Certified payroll', 'A Preliminary Notice', 'A change order'], answer: 1, explain: 'Certified payroll records are submitted (via DIR eCPR) on public works.' },
        { q: 'A payment bond is generally required on public works contracts over:', choices: ['$1,000', '$5,000', '$25,000', '$100,000'], answer: 2, explain: 'Public works contracts over $25,000 require a payment bond protecting subs and suppliers.' },
        { q: 'An unpaid subcontractor on a public works project should pursue:', choices: ['A mechanics lien', 'The payment bond and a stop payment notice', 'Foreclosure', 'Small claims only'], answer: 1, explain: 'Public property can’t be liened; the payment bond and stop payment notice are the remedies.' },
        { q: 'Prevailing wage requirements generally apply to public works exceeding:', choices: ['$500', '$1,000', '$25,000', '$100,000'], answer: 1, explain: 'Prevailing wage generally attaches to public works over $1,000.' },
        { q: 'Public works projects rely on which system to train workers at lower rates:', choices: ['Internships', 'State-approved apprenticeship', 'Temp agencies', 'Independent contractors'], answer: 1, explain: 'Public works use the state apprenticeship system, with apprentices paid a set percentage of the journey rate.' }
      ]
    }
  ]
};
