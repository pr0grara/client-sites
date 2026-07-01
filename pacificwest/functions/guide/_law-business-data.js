// California Law & Business Exam — high-yield study guide (CONTENT, brand-agnostic).
// Canonical source; vendored into client projects via `npm run sync`.
//
// The Law & Business exam is identical for EVERY CSLB classification, so this asset is
// reused across every contractor client. Structure mirrors the official exam blueprint
// (CSLB Law & Business Study Guide, doc 13E-LAW rev. 03-2026): seven weighted sections.
//
// QUESTION BANK: ~220 questions, allocated across sections by the official exam weights
// and, within each section, across sub-topics by estimated frequency (see each section's
// `topics` map: freq = high|med|low). Every question is tagged {topic, freq} so the app can
// sample an exam-realistic practice test (different questions each attempt) or drill one topic.
//
// ACCURACY: every figure is grounded in a named source. Primary sources, per-fact citations,
// and the full bibliography live in `law-business.sources.md` (same folder). Questions test
// only facts already verified in the key/numbers below — no new statutory claims.
// Fact-checked against live primary sources July 2026. When in doubt, the cited primary
// source wins over this summary.

export const LAW_BUSINESS_GUIDE = {
  slug: 'law-business',
  title: 'California Law & Business Exam — Study Guide',
  subtitle: 'The office-side exam every CSLB contractor has to pass, in plain English.',
  verifiedAsOf: 'July 2026',
  examFacts: [
    'Closed book. Four choices per question, one BEST answer. (CSLB doesn’t publish the exact question count — prep sites estimate ~115.)',
    'About 3.5 hours. A calculator is provided for the math questions.',
    'No penalty for guessing — never leave a question blank.',
    'CSLB doesn’t publish the passing percentage (you’re told it at the test site); aim to score ~75%+ on practice tests before you book.'
  ],
  sources: [
    {
      label: 'California Contractors License Law & Reference Book (2026 ed.)',
      href: 'https://www.cslb.ca.gov/Resources/GuidesAndPublications/2026/2026_CSLB_Law_Book.pdf'
    },
    {
      label: 'CSLB Law & Business Exam Study Guide (official outline)',
      href: 'https://www.cslb.ca.gov/Resources/StudyGuides/LawStudyGuide.pdf'
    },
    {
      label: 'California Business & Professions Code (Contractors)',
      href: 'https://leginfo.legislature.ca.gov/faces/codes.xhtml'
    },
    {
      label: 'California Civil Code (mechanics liens, §8000+)',
      href: 'https://leginfo.legislature.ca.gov/faces/codes.xhtml'
    },
    {
      label: 'EDD California Employer’s Guide (DE 44)',
      href: 'https://edd.ca.gov/en/payroll_taxes/forms_and_publications/'
    },
    {
      label: 'IRS Publication 15 (Circular E), Employer’s Tax Guide',
      href: 'https://www.irs.gov/publications/p15'
    },
    {
      label: 'DIR Public Works Manual / prevailing wage',
      href: 'https://www.dir.ca.gov/public-works/publicworks.html'
    },
    { label: 'Cal/OSHA, Title 8 California Code of Regulations', href: 'https://www.dir.ca.gov/dosh/' }
  ],
  sections: [
    {
      id: 'contracts',
      title: 'Contract Requirements & Execution',
      weight: 21,
      intro: "The single heaviest section. It's about putting a job on paper the legal way: bidding it, writing the contract, taking deposits, billing progress, and handling change orders. California is strict about home improvement contracts, and a lot of points live in the exact dollar limits and required notices.",
      key: [
        "A home improvement contract (HIC) must be in writing, signed, and given to the buyer before work starts. It must show the total contract price, a payment schedule, approximate start and completion dates, a description of the work and materials, and the buyer's right to cancel.",
        {
          t: 'Down payment on an HIC is capped: it cannot exceed $1,000 or 10% of the contract price, whichever is LESS. (Service-and-repair contracts are a narrow exception with their own rules.)',
          why: "Looks like a typo, but nope: on a $40k job you can still only take $1,000 up front. It's a consumer-protection cap, not a cash-flow rule. California doesn't want a homeowner handing over a fat deposit and then getting ghosted, so you earn the rest through progress payments as the work happens. One escape hatch: a contractor who furnishes a registrar-approved performance and payment bond isn't bound by the cap."
        },
        'Progress payments must stay tied to work actually performed and materials actually delivered — you can never be paid substantially ahead of the work.',
        'The buyer of an HIC gets a three-business-day right to cancel (5 business days for seniors; 7 for disaster-recovery contracts). The signed Notice of Cancellation must be attached to the contract, and the three days run from signing and receiving that notice.',
        "Required notices in an HIC include the Mechanics Lien Warning and (since SB 517, effective 2026) the contractor's email address and a way to cancel by email; disclose subcontractors on request.",
        'A change order should be in writing and signed BEFORE the extra work is done — same logic as the original contract.',
        'Retention is money (often ~10%) the owner holds back from each progress payment until the job is finished and the lien period passes.',
        'Estimating: bid = direct costs (labor, material, equipment, subcontractors) + overhead + profit. Bid too low and you eat the loss; bid too high and you lose the job.',
        "Lump-sum (fixed price) vs. unit-price vs. cost-plus contracts: know that unit price bills by measured quantity, and an 'allowance' is a placeholder dollar amount for an item not yet selected."
      ],
      numbers: [
        {
          label: 'HIC down payment cap',
          value: '$1,000 or 10% of price, whichever is LESS',
          src: 'B&P §7159.5'
        },
        {
          label: 'Written HIC contract required',
          value: 'when the contract price exceeds $500',
          src: 'B&P §7159'
        },
        {
          label: 'Right to cancel an HIC',
          value: '3 business days (5 seniors / 7 disaster)',
          src: 'B&P §7159 / Civ. Code §1689.7'
        },
        {
          label: 'Key consumer-notice type size',
          value: '12-point boldface (10-pt general minimum)',
          src: 'B&P §7159'
        },
        {
          label: 'Typical retention withheld',
          value: '~10% of each progress payment',
          src: 'Law Book, Managing a Business'
        }
      ],
      math: [
        {
          prompt: 'A home improvement contract is $9,000. What is the largest legal down payment?',
          work: '10% of $9,000 = $900. The cap is $1,000 OR 10%, whichever is LESS → $900 is less than $1,000.',
          answer: '$900'
        },
        {
          prompt: 'A home improvement contract is $30,000. What is the largest legal down payment?',
          work: '10% of $30,000 = $3,000. The cap is the LESSER of $1,000 or 10% → $1,000 wins.',
          answer: '$1,000',
          why: "This is where it starts to feel silly. The bigger the job, the more that flat $1,000 ceiling stings, and the more the state likes it. 'Whichever is LESS' is quietly doing all the work in that sentence."
        },
        {
          prompt: 'On a $40,000 job with 10% retention, how much is held back across the job?',
          work: '10% of $40,000 = $4,000 withheld from progress payments until completion and the lien period.',
          answer: '$4,000'
        }
      ],
      questions: [
        {
          q: 'A home improvement contract totals $7,500. What is the maximum down payment a contractor may legally require?',
          choices: ['$1,000', '$750', '$1,500', '$2,500'],
          answer: 1,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% of $7,500 = $750. The cap is $1,000 or 10%, whichever is LESS, so $750.'
        },
        {
          q: 'A home improvement contract totals $50,000. The maximum legal down payment is:',
          choices: ['$5,000', '$2,500', '$1,000', '10% of any progress payment'],
          answer: 2,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% would be $5,000, but the cap is the LESSER of $1,000 or 10% — so $1,000.',
          why: '$5,000 is the trap and it feels so right. But once 10% clears $1,000, the flat grand always wins. Big job, tiny deposit, by design.'
        },
        {
          q: 'On a $6,000 home improvement contract, the largest deposit you may collect up front is:',
          choices: ['$600', '$1,000', '$1,200', '$300'],
          answer: 0,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% of $6,000 = $600, which is less than $1,000, so $600 is the cap.'
        },
        {
          q: 'A homeowner offers to prepay $3,000 on a $12,000 kitchen remodel so you can "get started." The most you may legally accept as a down payment is:',
          choices: ['$3,000', '$1,200', '$1,000', '$600'],
          answer: 2,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% of $12,000 = $1,200, but the cap is the LESSER of $1,000 or 10% → $1,000. A willing customer can’t waive the cap.',
          why: 'The customer volunteering more money feels like consent, so $3,000 or even $1,200 seems fine. But the cap is a hard consumer-protection ceiling — their offer doesn’t raise it.'
        },
        {
          q: 'The home improvement down payment cap is:',
          choices: [
            '$1,000 or 10% of the price, whichever is GREATER',
            '$1,000 or 10% of the price, whichever is LESS',
            'Always 10% of the price',
            'Always a flat $1,000'
          ],
          answer: 1,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: 'The cap is $1,000 or 10% of the contract price, whichever is LESS.'
        },
        {
          q: 'On an $8,500 job, the maximum down payment is $850. That figure comes from:',
          choices: [
            'A flat statutory $850 minimum',
            '10% of the price, because it is less than $1,000',
            'The $1,000 flat cap',
            'Half of the first progress payment'
          ],
          answer: 1,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% of $8,500 = $850, which is less than $1,000, so the 10% figure controls.'
        },
        {
          q: 'A contractor is NOT bound by the standard home improvement down payment cap when:',
          choices: [
            'The job is over $40,000',
            'The customer signs a waiver',
            'The contractor furnishes a registrar-approved performance and payment bond',
            'The work is emergency repair'
          ],
          answer: 2,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: 'A contractor who furnishes a registrar-approved performance and payment bond is not bound by the down payment cap.',
          why: 'Size of job and customer waivers are the tempting outs, but neither lifts the cap. The bond is the one real escape hatch the law actually provides.'
        },
        {
          q: 'On a $100,000 home improvement contract, the largest legal down payment (no bond exception) is:',
          choices: ['$10,000', '$5,000', '$1,000', '$2,500'],
          answer: 2,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: 'The cap is the LESSER of $1,000 or 10% ($10,000). $1,000 is less, so $1,000.',
          why: "The bigger the job, the more $10,000 looks reasonable — and the more the flat $1,000 ceiling is meant to sting. 'Whichever is LESS' quietly caps every large job at a grand."
        },
        {
          q: 'For a $9,900 home improvement contract, the maximum down payment is:',
          choices: ['$990', '$1,000', '$99', '$1,090'],
          answer: 0,
          topic: 'down-payment-cap',
          freq: 'high',
          explain: '10% of $9,900 = $990, which is just under the $1,000 flat cap, so $990 is the max.',
          why: 'It’s so close to $1,000 that rounding up feels harmless. But 10% is still the smaller number here, so $990 is the hard ceiling.'
        },
        {
          q: 'A residential home improvement contract must, at minimum, be:',
          choices: ['Oral if under $5,000', 'In writing and signed before work begins', 'Filed with CSLB', 'Notarized'],
          answer: 1,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'HICs must be in writing, signed, and given to the buyer before work starts.'
        },
        {
          q: 'Which is required content of a home improvement contract?',
          choices: [
            'The contractor’s tax returns',
            'Approximate start and completion dates',
            'The owner’s credit score',
            'A notarized signature'
          ],
          answer: 1,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'Approximate start and completion dates are required, along with price, payment schedule, and the cancellation notice.'
        },
        {
          q: 'A written home improvement contract is required once the contract price exceeds:',
          choices: ['$500', '$1,000', '$100', '$2,500'],
          answer: 0,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'A written HIC is required when the contract price exceeds $500.',
          why: '$1,000 is baited here because it’s the down-payment cap and the license threshold — but the written-contract trigger is a separate, lower number: over $500.'
        },
        {
          q: 'Which of the following is NOT required content of a home improvement contract?',
          choices: [
            'The total contract price',
            'A payment schedule',
            'The buyer’s right to cancel',
            'The buyer’s employer name'
          ],
          answer: 3,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'Required contents include total price, payment schedule, approximate start/completion dates, a description of the work and materials, and the right to cancel — not the buyer’s employer.'
        },
        {
          q: 'A home improvement contract must describe:',
          choices: [
            'Only the total price',
            'The work to be done and the materials to be used',
            'The contractor’s profit margin',
            'The subcontractors’ home addresses'
          ],
          answer: 1,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'A description of the work and materials is required content of an HIC.'
        },
        {
          q: 'When must the signed home improvement contract be given to the buyer?',
          choices: [
            'Within 10 days after the job ends',
            'Before work starts',
            'On the final invoice',
            'Only if the buyer asks'
          ],
          answer: 1,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'The written, signed contract must be given to the buyer before work begins.'
        },
        {
          q: 'A contractor writes an HIC that lists a total price, work description, and start/finish dates but leaves the payment schedule blank. The contract is:',
          choices: [
            'Complete and valid',
            'Missing a required element (the payment schedule)',
            'Valid because dates were included',
            'Only invalid if over $50,000'
          ],
          answer: 1,
          topic: 'required-contract-contents',
          freq: 'high',
          explain: 'A payment schedule is a required element of an HIC; leaving it out makes the contract incomplete.'
        },
        {
          q: 'How long does a buyer generally have to cancel a home improvement contract?',
          choices: ['24 hours', '3 business days', '10 business days', 'There is no right to cancel'],
          answer: 1,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'The standard right to cancel is three business days (5 for seniors, 7 for disaster contracts); the Notice of Cancellation must be attached to the contract.'
        },
        {
          q: 'The three-day right to cancel generally begins when the buyer:',
          choices: [
            'Pays the deposit',
            'Signs the contract and receives the cancellation notice',
            'First meets the contractor',
            'Sees the work start'
          ],
          answer: 1,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'The clock runs from signing and receiving the required Notice of Cancellation.'
        },
        {
          q: 'A 74-year-old homeowner signs a home improvement contract. Her right-to-cancel period is:',
          choices: ['3 business days', '5 business days', '7 business days', 'No cancellation right'],
          answer: 1,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'Seniors get an extended 5-business-day right to cancel (vs. the standard 3).',
          why: '3 days is the default everyone memorizes, so it’s the reflex answer. But seniors get the longer 5-day window — the exam loves testing that extension.'
        },
        {
          q: 'A contract to repair a home damaged in a wildfire (a disaster-recovery contract) carries a right to cancel of:',
          choices: ['3 business days', '5 business days', '7 business days', '30 days'],
          answer: 2,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'Disaster-recovery home improvement contracts carry a 7-business-day right to cancel.',
          why: 'The general 3-day rule is the anchor, but disaster contracts get the longest window — 7 days — precisely because the homeowner is under duress.'
        },
        {
          q: 'The signed Notice of Cancellation for a home improvement contract must be:',
          choices: ['Mailed to CSLB', 'Attached to the contract', 'Notarized', 'Filed with the county'],
          answer: 1,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'The Notice of Cancellation must be attached to the contract, and the cancellation days run from signing and receiving it.'
        },
        {
          q: 'A standard (non-senior, non-disaster) buyer signs an HIC on Monday and receives the required cancellation notice the same day. The right to cancel runs for:',
          choices: ['3 business days', '5 business days', '7 business days', '24 hours'],
          answer: 0,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'The standard right to cancel is 3 business days from signing and receiving the notice.'
        },
        {
          q: 'If a contractor never attaches the required Notice of Cancellation to the HIC, the practical effect is:',
          choices: [
            'The buyer loses all cancellation rights',
            'The 3-day clock hasn’t properly started, since the days run from receiving that notice',
            'The contract is automatically void from day one',
            'Nothing — the notice is optional'
          ],
          answer: 1,
          topic: 'right-to-cancel',
          freq: 'high',
          explain: 'The cancellation days run from signing AND receiving the notice, so failing to attach it means the clock hasn’t properly started.'
        },
        {
          q: 'A payment schedule in a home improvement contract must be:',
          choices: [
            'Paid 50% up front',
            'Tied to work performed and materials delivered',
            'Equal monthly installments regardless of progress',
            'Left blank until the job ends'
          ],
          answer: 1,
          topic: 'progress-payments',
          freq: 'med',
          explain: 'Payments must track actual progress — you can’t collect substantially ahead of the work.'
        },
        {
          q: 'Progress payments on a job are limited by the rule that a contractor:',
          choices: [
            'May bill in equal weekly amounts',
            'Can never be paid substantially ahead of the work performed and materials delivered',
            'Must wait until the very end to bill',
            'May front-load the first payment'
          ],
          answer: 1,
          topic: 'progress-payments',
          freq: 'med',
          explain: 'Progress payments must stay tied to work actually performed and materials actually delivered.'
        },
        {
          q: 'Halfway through a remodel, only about 20% of the work is done, but the schedule would let you collect a 60% payment. The correct approach is:',
          choices: [
            'Collect the 60%, since it’s in the contract',
            'Only bill for work actually performed and materials delivered',
            'Collect 50% as a compromise',
            'Bill nothing until completion'
          ],
          answer: 1,
          topic: 'progress-payments',
          freq: 'med',
          explain: 'You can never be paid substantially ahead of the work; billing must reflect work performed and materials delivered.',
          why: "A signed schedule feels like permission, so 'it’s in the contract' is tempting. But the law overrides any schedule that pays you far ahead of the actual work."
        },
        {
          q: 'The core rule governing when a contractor can collect on a home improvement job is that payments stay tied to:',
          choices: [
            'The calendar',
            'Work actually performed and materials actually delivered',
            'The contractor’s cash-flow needs',
            'The lender’s draw schedule'
          ],
          answer: 1,
          topic: 'progress-payments',
          freq: 'med',
          explain: 'Progress payments must be tied to work actually performed and materials actually delivered.'
        },
        {
          q: 'The best practice for extra work discovered mid-project is to:',
          choices: [
            'Do it and bill it on the final invoice',
            'Get a signed written change order before doing the work',
            'Absorb it to keep the client happy',
            'Verbally agree and proceed'
          ],
          answer: 1,
          topic: 'change-orders',
          freq: 'med',
          explain: 'Change orders should be in writing and signed before the extra work is performed.'
        },
        {
          q: 'A change order should be signed:',
          choices: [
            'After the extra work is finished',
            'Before the extra work is done',
            'Only if the change exceeds $1,000',
            'At the same time as the final payment'
          ],
          answer: 1,
          topic: 'change-orders',
          freq: 'med',
          explain: 'A change order should be in writing and signed BEFORE the extra work is done — same logic as the original contract.'
        },
        {
          q: 'During a bathroom remodel the owner asks you to also re-tile the adjacent hallway. Before doing that added work you should:',
          choices: [
            'Proceed and settle up verbally later',
            'Have a written change order signed first',
            'Add it silently to the final bill',
            'Refuse — extra work isn’t allowed'
          ],
          answer: 1,
          topic: 'change-orders',
          freq: 'med',
          explain: 'Extra work should be documented with a written, signed change order before it’s performed.',
          why: "A happy, chatty customer makes a handshake feel safe. But 'we agreed verbally' is exactly how change-order disputes and non-payment start — get it signed first."
        },
        {
          q: 'The logic behind requiring a written, signed change order is the same as the logic behind:',
          choices: [
            'The mechanics lien deadline',
            'Requiring the original contract in writing and signed',
            'The retention percentage',
            'The down payment cap'
          ],
          answer: 1,
          topic: 'change-orders',
          freq: 'med',
          explain: 'A change order follows the same logic as the original contract: put the agreement in writing and get it signed before work proceeds.'
        },
        {
          q: 'Retention on a construction project is best described as:',
          choices: [
            'A deposit paid to the contractor up front',
            'A portion of each progress payment the owner withholds until completion',
            'The contractor’s profit margin',
            'A penalty for late completion'
          ],
          answer: 1,
          topic: 'retention',
          freq: 'med',
          explain: 'Retention (often ~10%) is held back from progress payments until the job is done and the lien period passes.'
        },
        {
          q: 'On a $40,000 job with 10% retention, the total amount held back across the job is:',
          choices: ['$400', '$4,000', '$1,000', '$8,000'],
          answer: 1,
          topic: 'retention',
          freq: 'med',
          explain: '10% of $40,000 = $4,000 withheld from progress payments until completion and the lien period.'
        },
        {
          q: 'An owner holds retention until:',
          choices: [
            'The first progress payment',
            'The job is finished and the lien period passes',
            'The contract is signed',
            'The down payment clears'
          ],
          answer: 1,
          topic: 'retention',
          freq: 'med',
          explain: 'Retention is held back until the job is completed and the lien period has passed.'
        },
        {
          q: 'On a $70,000 project with typical 10% retention, how much does the owner withhold in total?',
          choices: ['$700', '$7,000', '$10,000', '$3,500'],
          answer: 1,
          topic: 'retention',
          freq: 'med',
          explain: '10% of $70,000 = $7,000 held back across the progress payments until completion.'
        },
        {
          q: 'A contractor’s bid price should generally equal:',
          choices: [
            'Direct costs only',
            'Direct costs + overhead + profit',
            'Materials + labor',
            'Whatever the competition charges'
          ],
          answer: 1,
          topic: 'estimating-bid',
          freq: 'med',
          explain: 'A sound bid covers direct costs (labor, material, equipment, subs) plus overhead and profit.'
        },
        {
          q: 'Which of these is a DIRECT cost in a bid?',
          choices: ['Company profit', 'Overhead', 'Labor, material, equipment, and subcontractors on the job', 'The markup'],
          answer: 2,
          topic: 'estimating-bid',
          freq: 'med',
          explain: 'Direct costs are the job’s labor, material, equipment, and subcontractors; overhead and profit are added on top.'
        },
        {
          q: 'If a contractor bids a job too low, the most likely result is that the contractor:',
          choices: [
            'Wins the job but eats the loss',
            'Loses the job to competitors',
            'Collects extra retention',
            'Owes a penalty to CSLB'
          ],
          answer: 0,
          topic: 'estimating-bid',
          freq: 'med',
          explain: 'Bid too low and you eat the loss; bid too high and you lose the job.'
        },
        {
          q: 'A bid built from direct costs plus overhead but with NO profit added will most likely:',
          choices: [
            'Maximize the contractor’s margin',
            'Leave the contractor with nothing to grow on even if everything goes right',
            'Violate the license law',
            'Trigger the down payment cap'
          ],
          answer: 1,
          topic: 'estimating-bid',
          freq: 'med',
          explain: 'A complete bid = direct costs + overhead + profit; dropping profit means the job earns nothing beyond covering costs.',
          why: "Covering all your costs feels safe, so a zero-profit bid seems 'break-even.' But without a profit line the business has no room to survive a single overrun."
        },
        {
          q: 'Which notice is required content of a home improvement contract?',
          choices: ['A Mechanics Lien Warning', 'The owner’s FICO disclosure', 'A federal tax notice', 'A zoning waiver'],
          answer: 0,
          topic: 'required-notices',
          freq: 'med',
          explain: 'Required notices in an HIC include the Mechanics Lien Warning (and the right-to-cancel notice).'
        },
        {
          q: 'Since SB 517 (effective 2026), a home improvement contract must also include:',
          choices: [
            'The contractor’s email address and a way to cancel by email',
            'The owner’s Social Security number',
            'A notarized signature block',
            'A photo of the jobsite'
          ],
          answer: 0,
          topic: 'required-notices',
          freq: 'med',
          explain: 'SB 517 (effective 2026) requires the contractor’s email address and a way to cancel by email in the HIC.'
        },
        {
          q: 'A homeowner asks who the subcontractors on the job will be. Under HIC rules, the contractor must:',
          choices: [
            'Refuse — that’s confidential',
            'Disclose the subcontractors on request',
            'Only disclose them after completion',
            'Charge a fee for the list'
          ],
          answer: 1,
          topic: 'required-notices',
          freq: 'med',
          explain: 'HIC rules require the contractor to disclose subcontractors on request.'
        },
        {
          q: 'In a contract, an “allowance” is:',
          choices: [
            'A discount for early payment',
            'A placeholder dollar amount for an item not yet selected',
            'The contractor’s overhead',
            'A late fee'
          ],
          answer: 1,
          topic: 'contract-types',
          freq: 'low',
          explain: 'An allowance budgets a set dollar amount for a not-yet-chosen item (e.g., tile), reconciled later.'
        },
        {
          q: 'Unit-price contracting bills the owner based on:',
          choices: [
            'A single fixed lump sum',
            'Measured quantities of work actually done',
            'Cost plus a fixed fee',
            'The contractor’s overhead rate'
          ],
          answer: 1,
          topic: 'contract-types',
          freq: 'low',
          explain: 'Unit-price contracts charge per measured unit installed (e.g., per cubic yard), so the total flexes with quantity.'
        },
        {
          q: 'Key consumer notices in a home improvement contract must generally appear in:',
          choices: ['8-point italic', '12-point boldface', 'All capital letters only', 'Handwriting'],
          answer: 1,
          topic: 'boldface-notice',
          freq: 'low',
          explain: 'Key consumer notices must be in 12-point boldface (with a 10-point general minimum for the contract text).'
        },
        {
          q: 'The general minimum type size for the text of a home improvement contract is:',
          choices: ['6-point', '8-point', '10-point', '14-point'],
          answer: 2,
          topic: 'boldface-notice',
          freq: 'low',
          explain: 'The general minimum is 10-point type, while key consumer notices must be 12-point boldface.',
          why: '12-point sticks in memory because it’s the boldface-notice number, so it’s the tempting pick. But the general text minimum is the smaller 10-point figure.'
        }
      ],
      topics: {
        'down-payment-cap': { freq: 'high', label: 'HIC down payment cap' },
        'required-contract-contents': { freq: 'high', label: 'Required HIC contents' },
        'right-to-cancel': { freq: 'high', label: 'Right to cancel (3/5/7-day)' },
        'progress-payments': { freq: 'med', label: 'Progress payments' },
        'change-orders': { freq: 'med', label: 'Change orders' },
        retention: { freq: 'med', label: 'Retention' },
        'estimating-bid': { freq: 'med', label: 'Estimating / bid components' },
        'required-notices': { freq: 'med', label: 'Required notices (lien warning, SB517 email)' },
        'contract-types': { freq: 'low', label: 'Contract types (lump/unit/cost-plus/allowance)' },
        'boldface-notice': { freq: 'low', label: 'Boldface notice type size' }
      }
    },
    {
      id: 'employment',
      title: 'Employment Requirements',
      weight: 20,
      intro: 'Almost as heavy as contracts, and pure office knowledge — hiring, payroll, taxes, breaks, and the deadlines that come with having employees. This is where field experience helps you the least, so it deserves real study time.',
      key: [
        'New hires: every employee completes a federal Form I-9 (work eligibility) and a W-4 (federal withholding). California employers must report new hires to the EDD within 20 days.',
        'Payroll taxes you withhold and/or match: federal income tax, Social Security and Medicare (FICA), federal and state unemployment (FUTA/SUTA), and California state income tax and SDI.',
        'How OFTEN you deposit federal payroll taxes is set by the SIZE of your payroll tax liability (a lookback), not the number of employees.',
        'Year-end you give each employee a W-2 by January 31. You file Form 941 quarterly and Form 940 (FUTA) annually with the IRS, and DE 9 / DE 9C with the EDD.',
        "Final pay in California: an employee you FIRE must be paid immediately; an employee who QUITS without notice must be paid within 72 hours (immediately if they gave 72 hours' notice).",
        'Overtime in California is daily and weekly: 1.5× over 8 hours/day or 40 hours/week, and 2× over 12 hours/day.',
        'Meal and rest breaks: a 30-minute unpaid meal period before the end of the 5th hour of work, and a paid 10-minute rest break for roughly every 4 hours worked.',
        "Unemployment insurance is funded by the EMPLOYER (FUTA/SUTA) — it is not deducted from the worker's pay.",
        "Misclassifying an employee as an independent contractor to dodge payroll taxes and workers' comp is a serious violation; California uses the strict 'ABC' test (Labor Code §2775) to decide who is truly independent."
      ],
      numbers: [
        {
          label: 'Report new hires to EDD',
          value: 'within 20 days of start (DE 34)',
          src: 'CA Unemployment Ins. Code §1088.5 / DE 44'
        },
        {
          label: 'Final pay — employee fired',
          value: 'immediately (at termination)',
          src: 'CA Labor Code §201'
        },
        {
          label: 'Final pay — employee quits, no notice',
          value: 'within 72 hours',
          src: 'CA Labor Code §202'
        },
        { label: 'Daily overtime (1.5×)', value: 'over 8 hours in a workday', src: 'CA Labor Code §510' },
        { label: 'Double time (2×)', value: 'over 12 hours in a workday', src: 'CA Labor Code §510' },
        { label: 'Meal period', value: '30 min before end of 5th hour', src: 'CA Labor Code §512' },
        { label: 'Rest break', value: '10 min paid per ~4 hours worked', src: 'CA Wage Orders' },
        { label: 'W-2 to employees by', value: 'January 31', src: 'IRS' },
        {
          label: 'Social Security tax (employee share)',
          value: '6.2% up to the annual wage base ($184,500 in 2026)',
          src: 'IRS Pub 15 / SSA — confirm current base'
        },
        {
          label: 'Medicare tax (employee share)',
          value: '1.45% (no wage cap)',
          src: 'IRS Pub 15 — confirm current rate'
        }
      ],
      math: [
        {
          prompt: 'An employee works 10 hours in one day at $30/hour (straight time). What is the day’s gross pay with California daily overtime?',
          work: 'First 8 hrs at $30 = $240. Hours 9–10 are overtime at 1.5× = $45 × 2 = $90. Total = $240 + $90.',
          answer: '$330'
        },
        {
          prompt: 'An employee earns $1,200 gross in a pay period. What is the employee’s Social Security withholding at 6.2% (below the wage base)?',
          work: '$1,200 × 0.062 = $74.40.',
          answer: '$74.40'
        },
        {
          prompt: 'An employee works 13 hours in one day at $40/hour. Day’s gross pay (CA rules)?',
          work: '8 hrs × $40 = $320; hrs 9–12 (4 hrs) at 1.5× = $60 × 4 = $240; hr 13 at 2× = $80. Total = $320 + $240 + $80.',
          answer: '$640'
        }
      ],
      questions: [
        {
          q: 'In California, an employee who is fired must receive their final wages:',
          choices: [
            'Within 72 hours',
            'On the next regular payday',
            'Immediately, at the time of termination',
            'Within 7 days'
          ],
          answer: 2,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'A discharged employee must be paid all final wages immediately (Labor Code §201).',
          why: '"Next regular payday" is the trap answer — that is the rule in some other states, but California requires immediate payment when you fire someone.'
        },
        {
          q: 'An employee quits with no advance notice. Their final wages are due:',
          choices: ['Immediately', 'Within 72 hours', 'On the next payday', 'Within 30 days'],
          answer: 1,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'An employee who quits without notice must be paid within 72 hours (Labor Code §202).'
        },
        {
          q: 'A laborer gives you three days’ (72 hours’) advance notice that his last day is Friday. When must his final check be ready?',
          choices: [
            'Within 72 hours after Friday',
            'On his last day, Friday',
            'On the next regular payday',
            'Within 7 days'
          ],
          answer: 1,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'An employee who gives at least 72 hours’ notice must be paid immediately on their final day of work.',
          why: 'The 72-hour window only applies when someone quits WITHOUT notice. Give proper notice and payment is due on the last day.'
        },
        {
          q: 'You lay off a framer at the end of a job on the spot. When is his final pay due?',
          choices: ['Immediately, at the layoff', 'Within 72 hours', 'On the next scheduled payday', 'Within 15 days'],
          answer: 0,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'A layoff is an employer-initiated discharge, so final wages are due immediately, just like a firing (Labor Code §201).'
        },
        {
          q: 'An employee walks off the job midday with no notice at all. The absolute deadline to pay their final wages is:',
          choices: ['24 hours', '72 hours', 'The next payday', 'Immediately'],
          answer: 1,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'Quitting without notice triggers the 72-hour deadline (Labor Code §202).'
        },
        {
          q: 'Which situation requires the employer to have final wages ready IMMEDIATELY (not within 72 hours)?',
          choices: [
            'An employee quits with no notice',
            'An employee is fired',
            'An employee stops showing up',
            'An employee gives two weeks’ notice but leaves early'
          ],
          answer: 1,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'Firing (discharge) requires immediate payment; a no-notice quit gets 72 hours.'
        },
        {
          q: 'True or false, from the exam’s view: whether an employee is fired or quits makes no difference to when final pay is due.',
          choices: [
            'True — it’s always the next payday',
            'True — it’s always 72 hours',
            'False — fired is immediate, no-notice quit is within 72 hours',
            'False — fired is 72 hours, quit is immediate'
          ],
          answer: 2,
          topic: 'final-pay-fired-vs-quit',
          freq: 'high',
          explain: 'Fired = immediate (§201); quit without notice = within 72 hours (§202). The distinction is exactly what the exam tests.'
        },
        {
          q: 'California daily overtime (1.5×) begins after how many hours in a workday?',
          choices: ['6 hours', '8 hours', '10 hours', '40 hours'],
          answer: 1,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: 'CA pays 1.5× over 8 hours/day (and over 40/week); 2× kicks in over 12 hours/day.'
        },
        {
          q: 'California double-time (2×) is generally owed after how many hours in a single workday?',
          choices: ['8 hours', '10 hours', '12 hours', '16 hours'],
          answer: 2,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: 'Double time applies to hours worked beyond 12 in a single workday.'
        },
        {
          q: 'An employee works 10 hours in one day at $30/hour. What is the day’s gross pay under California daily overtime rules?',
          choices: ['$300', '$330', '$345', '$360'],
          answer: 1,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: 'First 8 hrs × $30 = $240. Hours 9–10 are overtime at 1.5× ($45) × 2 = $90. Total $330.'
        },
        {
          q: 'An employee works 13 hours in one day at $40/hour. What is the day’s gross pay (CA rules)?',
          choices: ['$520', '$600', '$640', '$680'],
          answer: 2,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: '8 hrs × $40 = $320; hrs 9–12 (4 hrs) at 1.5× ($60) = $240; hr 13 at 2× ($80) = $80. Total $640.',
          why: '$680 assumes all 5 extra hours are double time; only hours over 12 get 2× — hours 9 through 12 are still 1.5×.'
        },
        {
          q: 'An employee works 12 hours in one day at $20/hour. Day’s gross pay under CA rules?',
          choices: ['$240', '$280', '$300', '$320'],
          answer: 1,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: '8 hrs × $20 = $160; hrs 9–12 (4 hrs) at 1.5× ($30) = $120. No double time yet (nothing over 12). Total $280.',
          why: '$300 is the trap if you slip an hour into double time — but 2× only starts AFTER the 12th hour.'
        },
        {
          q: 'An employee works 9 hours in one day at $50/hour. Day’s gross pay (CA rules)?',
          choices: ['$450', '$475', '$500', '$525'],
          answer: 1,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: '8 hrs × $50 = $400; 1 OT hour at 1.5× = $75. Total $475.'
        },
        {
          q: 'An employee works 14 hours in one day at $30/hour. Day’s gross pay under California rules?',
          choices: ['$420', '$540', '$600', '$620'],
          answer: 1,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: '8 hrs × $30 = $240; hrs 9–12 (4 hrs) at 1.5× ($45) = $180; hrs 13–14 (2 hrs) at 2× ($60) = $120. Total $540.',
          why: '$420 is straight time only; the correct total layers 1.5× on hours 9–12 and 2× on hours 13–14 for $540.'
        },
        {
          q: 'Which of these hours in a 13-hour California workday are paid at DOUBLE time?',
          choices: [
            'All hours over 8',
            'Hours 9 through 12',
            'Only the 13th hour',
            'None — double time only applies on the 7th consecutive day'
          ],
          answer: 2,
          topic: 'daily-overtime-double-time',
          freq: 'high',
          explain: 'Over 12 hours in a day is 2×, so only hour 13 is double time; hours 9–12 are 1.5×.'
        },
        {
          q: 'Which federal form documents an employee’s eligibility to work in the U.S.?',
          choices: ['Form W-4', 'Form W-2', 'Form I-9', 'Form 941'],
          answer: 2,
          topic: 'i9-vs-w4-forms',
          freq: 'high',
          explain: 'The I-9 verifies work eligibility; the W-4 sets withholding; the W-2 reports annual wages; 941 is the quarterly return.'
        },
        {
          q: 'Form W-4 is used to determine:',
          choices: ['Work eligibility', 'Federal income tax withholding', 'Overtime owed', 'Workers’ comp class'],
          answer: 1,
          topic: 'i9-vs-w4-forms',
          freq: 'high',
          explain: 'The W-4 tells the employer how much federal income tax to withhold.'
        },
        {
          q: 'A new hire’s first day on your crew. Which TWO federal forms must they complete?',
          choices: ['I-9 and W-4', 'W-2 and 941', 'I-9 and W-2', 'W-4 and DE 9'],
          answer: 0,
          topic: 'i9-vs-w4-forms',
          freq: 'high',
          explain: 'Every new employee completes the I-9 (work eligibility) and W-4 (federal withholding).'
        },
        {
          q: 'An employer confuses the I-9 with the W-4. The I-9’s actual purpose is to:',
          choices: [
            'Set how much tax to withhold',
            'Verify the worker is legally eligible to work',
            'Report annual wages to the IRS',
            'Report the new hire to the EDD'
          ],
          answer: 1,
          topic: 'i9-vs-w4-forms',
          freq: 'high',
          explain: 'The I-9 is the employment eligibility verification form; withholding is the W-4’s job.',
          why: 'It’s easy to swap them — remember: I-9 = "I can work here," W-4 = "withhold this much."'
        },
        {
          q: 'A worker wants to change how much federal income tax comes out of each check. Which form do they update?',
          choices: ['Form I-9', 'Form W-4', 'Form W-2', 'Form 940'],
          answer: 1,
          topic: 'i9-vs-w4-forms',
          freq: 'high',
          explain: 'Withholding is controlled by the W-4.'
        },
        {
          q: 'A nonexempt employee is generally entitled to an unpaid meal period of at least 30 minutes:',
          choices: [
            'Only on shifts over 10 hours',
            'Before the end of the 5th hour of work',
            'At the very start of the shift',
            'Only if the employee requests it'
          ],
          answer: 1,
          topic: 'meal-and-rest-breaks',
          freq: 'high',
          explain: 'A 30-minute meal period must be provided before the end of the 5th hour worked.'
        },
        {
          q: 'California’s required meal period is:',
          choices: ['15 minutes, paid', '30 minutes, unpaid', '60 minutes, paid', '10 minutes, unpaid'],
          answer: 1,
          topic: 'meal-and-rest-breaks',
          freq: 'high',
          explain: 'The meal period is 30 minutes and unpaid; the 10-minute REST break is the paid one.',
          why: 'Don’t mix them up: meal = 30 min unpaid, rest = 10 min paid.'
        },
        {
          q: 'The 10-minute rest break in California is:',
          choices: [
            'Unpaid, once per shift',
            'Paid, roughly every 4 hours worked',
            'Unpaid, every 8 hours',
            'Paid, only after 12 hours'
          ],
          answer: 1,
          topic: 'meal-and-rest-breaks',
          freq: 'high',
          explain: 'A paid 10-minute rest break is owed for roughly every 4 hours worked.'
        },
        {
          q: 'Which break is PAID under California rules?',
          choices: ['The 30-minute meal period', 'The 10-minute rest break', 'Both are unpaid', 'Both are paid'],
          answer: 1,
          topic: 'meal-and-rest-breaks',
          freq: 'high',
          explain: 'The rest break is paid; the meal period is unpaid.'
        },
        {
          q: 'An employee is scheduled for a shift and hasn’t taken a meal break by the end of the 5th hour. Under CA rules, the employer has:',
          choices: [
            'Met the requirement — meal breaks are optional',
            'Missed the deadline for providing the 30-minute meal period',
            'Until the 8th hour to provide it',
            'No obligation unless the shift exceeds 10 hours'
          ],
          answer: 1,
          topic: 'meal-and-rest-breaks',
          freq: 'high',
          explain: 'The 30-minute meal period must be provided before the end of the 5th hour worked.'
        },
        {
          q: 'FICA covers which two taxes?',
          choices: [
            'Federal and state income tax',
            'Social Security and Medicare',
            'Unemployment (FUTA) and SDI',
            'Medicare and workers’ comp'
          ],
          answer: 1,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: 'FICA = Social Security + Medicare, withheld and matched by the employer.'
        },
        {
          q: 'The employee’s Social Security tax rate is:',
          choices: ['1.45%', '6.2%', '7.65%', '12.4%'],
          answer: 1,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: 'The employee share of Social Security is 6.2% up to the annual wage base.',
          why: '7.65% is the trap — that’s the combined FICA rate (6.2% + 1.45%), not Social Security alone.'
        },
        {
          q: 'The employee’s Medicare tax rate is:',
          choices: ['1.45%', '2.9%', '6.2%', '7.65%'],
          answer: 0,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: 'The employee share of Medicare is 1.45%, with no wage cap.'
        },
        {
          q: 'An employee earns $1,200 gross in a pay period (below the wage base). Social Security withholding at 6.2% is:',
          choices: ['$17.40', '$74.40', '$91.80', '$148.80'],
          answer: 1,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: '$1,200 × 0.062 = $74.40.'
        },
        {
          q: 'An employee earns $2,000 gross in a pay period. What is the Medicare withholding at 1.45%?',
          choices: ['$14.50', '$29.00', '$124.00', '$153.00'],
          answer: 1,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: '$2,000 × 0.0145 = $29.00.'
        },
        {
          q: 'An employee earns $3,000 gross (below the Social Security wage base). What is the combined FICA withholding (Social Security 6.2% + Medicare 1.45%)?',
          choices: ['$186.00', '$43.50', '$229.50', '$372.00'],
          answer: 2,
          topic: 'fica-ss-medicare',
          freq: 'med',
          explain: 'SS: $3,000 × 0.062 = $186.00; Medicare: $3,000 × 0.0145 = $43.50; total $229.50 (which is $3,000 × 7.65%).',
          why: '$186 (SS only) and $43.50 (Medicare only) are the partial-answer traps; FICA is both combined.'
        },
        {
          q: 'Employers must furnish each employee a Form W-2 by:',
          choices: ['December 31', 'January 31', 'April 15', 'The next payday'],
          answer: 1,
          topic: 'w2-941-940-de9-filings',
          freq: 'med',
          explain: 'W-2s must be provided to employees by January 31.'
        },
        {
          q: 'Which federal payroll return is filed QUARTERLY with the IRS?',
          choices: ['Form 940', 'Form 941', 'Form W-2', 'Form I-9'],
          answer: 1,
          topic: 'w2-941-940-de9-filings',
          freq: 'med',
          explain: 'Form 941 is the quarterly federal return; Form 940 (FUTA) is filed annually.',
          why: 'Swap trap: 940 is the ANNUAL FUTA return; 941 is the QUARTERLY one.'
        },
        {
          q: 'Forms DE 9 and DE 9C are filed with which agency?',
          choices: ['The IRS', 'The California EDD', 'The CSLB', 'The Department of Labor'],
          answer: 1,
          topic: 'w2-941-940-de9-filings',
          freq: 'med',
          explain: 'DE 9 / DE 9C are filed with the California EDD; 941/940 go to the IRS.'
        },
        {
          q: 'What determines how often an employer’s federal payroll tax deposits must be made?',
          choices: [
            'The number of employees',
            'The amount of the payroll tax liability',
            'How long the company has operated',
            'The ratio of salaried to hourly staff'
          ],
          answer: 1,
          topic: 'payroll-tax-deposit-frequency',
          freq: 'med',
          explain: 'Deposit frequency is set by the size of the payroll tax liability (a lookback), not headcount.',
          why: 'Number of employees is the intuitive trap, but the schedule follows the dollar liability, not the number of people.'
        },
        {
          q: 'A contractor assumes that because they only have three employees, they get the least frequent deposit schedule. This reasoning is:',
          choices: [
            'Correct — fewer employees means less frequent deposits',
            'Wrong — frequency is based on the size of the tax liability, not employee count',
            'Correct — under 5 employees are exempt from deposits',
            'Wrong — all employers deposit daily'
          ],
          answer: 1,
          topic: 'payroll-tax-deposit-frequency',
          freq: 'med',
          explain: 'Deposit frequency depends on the payroll tax liability from the lookback period, not the number of employees.'
        },
        {
          q: 'California employers must report a new hire to the EDD within:',
          choices: ['20 days', '30 days', '10 days', '60 days'],
          answer: 0,
          topic: 'edd-new-hire-20-day',
          freq: 'med',
          explain: 'New-hire reporting to the EDD is due within 20 days of the start of work (DE 34).'
        },
        {
          q: 'You hire a new laborer who starts Monday. New-hire reporting to the EDD must be completed:',
          choices: [
            'Within 20 days of the start',
            'Within 72 hours',
            'By the end of the quarter',
            'Only if they work over 90 days'
          ],
          answer: 0,
          topic: 'edd-new-hire-20-day',
          freq: 'med',
          explain: 'The EDD new-hire report is due within 20 days of the employee’s start date.'
        },
        {
          q: 'Unemployment insurance (FUTA/SUTA) is paid by:',
          choices: ['The employee through payroll deduction', 'The employer', 'The state directly', 'A 50/50 split'],
          answer: 1,
          topic: 'unemployment-employer-funded',
          freq: 'med',
          explain: 'Unemployment insurance is an employer-funded tax, not withheld from the worker’s wages.'
        },
        {
          q: 'An employee notices no unemployment-insurance line on their pay stub deductions. That is:',
          choices: [
            'An error — it should be withheld',
            'Correct — unemployment insurance is funded by the employer, not withheld',
            'Correct only for salaried workers',
            'An error — it should be split 50/50'
          ],
          answer: 1,
          topic: 'unemployment-employer-funded',
          freq: 'med',
          explain: 'FUTA/SUTA is an employer tax, so nothing is deducted from the worker’s pay for it.',
          why: 'FICA IS split with the employee, so people assume unemployment is too — it isn’t; that one is all on the employer.'
        },
        {
          q: 'Treating a worker who is really an employee as an “independent contractor” primarily lets an employer avoid:',
          choices: [
            'Issuing invoices',
            'Payroll taxes and workers’ compensation',
            'Signing contracts',
            'Carrying a license'
          ],
          answer: 1,
          topic: 'misclassification-abc-test',
          freq: 'med',
          explain: 'Misclassification dodges payroll taxes and workers’ comp — a serious violation. CA uses the ABC test (Labor Code §2775).'
        },
        {
          q: 'Which test does California use to decide whether a worker is truly an independent contractor?',
          choices: [
            'The 20-factor IRS test',
            'The ABC test',
            'The economic-reality test',
            'The right-to-control test alone'
          ],
          answer: 1,
          topic: 'misclassification-abc-test',
          freq: 'med',
          explain: 'California applies the strict ABC test under Labor Code §2775 to determine independent-contractor status.'
        },
        {
          q: 'In California, SDI refers to:',
          choices: [
            'State disability insurance, a state payroll tax',
            'A federal Medicare surcharge',
            'The self-directed IRA program',
            'A CSLB licensing deposit'
          ],
          answer: 0,
          topic: 'state-payroll-taxes-sdi',
          freq: 'low',
          explain: 'SDI is California’s State Disability Insurance, one of the state payroll taxes alongside state income tax.'
        },
        {
          q: 'Which of these is a CALIFORNIA state payroll item (not a federal one)?',
          choices: ['FICA', 'FUTA', 'SDI', 'Federal income tax withholding'],
          answer: 2,
          topic: 'state-payroll-taxes-sdi',
          freq: 'low',
          explain: 'SDI (and state income tax and SUTA) are California items; FICA, FUTA, and federal income tax are federal.',
          why: 'FUTA is the federal unemployment tax — the state counterpart is SUTA/SDI, so FUTA is the trap here.'
        }
      ],
      topics: {
        'final-pay-fired-vs-quit': { freq: 'high', label: 'Final pay: fired vs. quit' },
        'daily-overtime-double-time': { freq: 'high', label: 'CA daily overtime & double time' },
        'i9-vs-w4-forms': { freq: 'high', label: 'New-hire forms: I-9 vs. W-4' },
        'meal-and-rest-breaks': { freq: 'high', label: 'Meal & rest breaks' },
        'fica-ss-medicare': { freq: 'med', label: 'FICA: Social Security & Medicare' },
        'w2-941-940-de9-filings': { freq: 'med', label: 'W-2 / 941 / 940 / DE 9 filings' },
        'payroll-tax-deposit-frequency': { freq: 'med', label: 'Payroll tax deposit frequency' },
        'edd-new-hire-20-day': { freq: 'med', label: 'EDD new-hire reporting (20 days)' },
        'unemployment-employer-funded': { freq: 'med', label: 'Unemployment insurance (employer-funded)' },
        'misclassification-abc-test': { freq: 'med', label: 'Misclassification & ABC test' },
        'state-payroll-taxes-sdi': { freq: 'low', label: 'CA state payroll taxes & SDI' }
      }
    },
    {
      id: 'finances',
      title: 'Business Finances',
      weight: 15,
      intro: "Basic construction accounting: reading the two core financial statements, watching cash, and knowing where a cost belongs. You don't need to be an accountant — you need the vocabulary and a few formulas the exam leans on.",
      key: [
        "The accounting equation: Assets = Liabilities + Owner's Equity. A balance sheet is a snapshot of those three at a single point in time.",
        'The income statement (profit & loss) covers a PERIOD of time: revenue − expenses = profit. Balance sheet = a moment; income statement = a stretch.',
        'Assets split into current (cash, receivables, inventory — used up within a year) and fixed (equipment, vehicles, buildings). Liabilities split into current and long-term.',
        'Working capital = current assets − current liabilities. The current ratio = current assets ÷ current liabilities — a quick read on whether you can pay near-term bills.',
        'Cash vs. accrual: cash accounting records money when it actually moves; accrual records revenue when earned and expenses when incurred, regardless of when cash changes hands.',
        "Direct (job) costs tie to a specific project — its labor, material, equipment, subs. Overhead / general & administrative (G&A) costs keep the company running (office rent, insurance, the owner's general-use truck).",
        'Depreciation spreads the cost of equipment over its useful life. A vehicle for general company use is a G&A expense, not a direct job cost.',
        'Markup is added ON cost; margin is a share OF the selling price. A 50% markup on $100 of cost = $150 price, which is a 33% margin. Confusing the two is a classic way to underbid.',
        "Cash flow can sink a profitable contractor: payroll and materials go out before the progress payment comes in. Plan for the gap, and watch retention you haven't collected yet."
      ],
      numbers: [
        {
          label: 'Accounting equation',
          value: 'Assets = Liabilities + Owner’s Equity',
          src: 'standard accounting'
        },
        {
          label: 'Working capital',
          value: 'current assets − current liabilities',
          src: 'standard accounting'
        },
        {
          label: 'Current ratio',
          value: 'current assets ÷ current liabilities',
          src: 'standard accounting'
        },
        {
          label: 'Quick (acid-test) ratio',
          value: '(current assets − inventory) ÷ current liabilities',
          src: 'standard accounting'
        },
        {
          label: 'Vehicle for general use',
          value: 'depreciated as G&A (overhead), not a job cost',
          src: 'standard cost accounting'
        }
      ],
      math: [
        {
          prompt: 'Current assets are $90,000 and current liabilities are $60,000. What is the current ratio, and the working capital?',
          work: 'Current ratio = 90,000 ÷ 60,000 = 1.5. Working capital = 90,000 − 60,000 = 30,000.',
          answer: 'Current ratio 1.5; working capital $30,000'
        },
        {
          prompt: 'A material costs $200. You apply a 25% markup. What is the selling price?',
          work: 'Markup is on cost: $200 × 0.25 = $50; price = $200 + $50.',
          answer: '$250'
        },
        {
          prompt: 'You sell an item for $250 that cost $200. What is the gross margin percentage?',
          work: 'Margin = profit ÷ price = ($250 − $200) ÷ $250 = $50 ÷ $250 = 20%.',
          answer: '20%'
        }
      ],
      questions: [
        {
          q: 'Which equation is the basis of a balance sheet?',
          choices: [
            'Revenue − Expenses = Profit',
            'Assets = Liabilities + Owner’s Equity',
            'Cash In − Cash Out = Net Worth',
            'Price = Cost + Markup'
          ],
          answer: 1,
          topic: 'balance-sheet-vs-income-statement',
          freq: 'high',
          explain: 'Assets = Liabilities + Owner’s Equity is the accounting equation a balance sheet reflects.'
        },
        {
          q: 'A balance sheet shows a company’s financial position:',
          choices: ['Over a full year', 'At a single point in time', 'For one project only', 'Before taxes only'],
          answer: 1,
          topic: 'balance-sheet-vs-income-statement',
          freq: 'high',
          explain: 'A balance sheet is a snapshot at one moment; the income statement covers a period.'
        },
        {
          q: 'Which statement reports profit over a period of time?',
          choices: ['Balance sheet', 'Income statement (profit & loss)', 'Bank reconciliation', 'Aging report'],
          answer: 1,
          topic: 'balance-sheet-vs-income-statement',
          freq: 'high',
          explain: 'The income statement (P&L) reports revenue and expenses over a period, yielding profit.'
        },
        {
          q: 'The income statement computes profit as:',
          choices: [
            'Assets − liabilities',
            'Revenue − expenses',
            'Current assets − current liabilities',
            'Cash in − cash out'
          ],
          answer: 1,
          topic: 'balance-sheet-vs-income-statement',
          freq: 'high',
          explain: 'On the income statement, revenue minus expenses equals profit over the period covered.',
          why: 'Assets − liabilities is owner’s equity (a balance-sheet idea), not the P&L’s profit line — don’t swap the two statements.'
        },
        {
          q: 'A company has $500,000 in assets and $300,000 in liabilities. What is owner’s equity?',
          choices: ['$800,000', '$200,000', '$300,000', '$500,000'],
          answer: 1,
          topic: 'accounting-equation',
          freq: 'high',
          explain: 'Owner’s equity = assets − liabilities = 500,000 − 300,000 = 200,000.'
        },
        {
          q: 'Owner’s equity is $150,000 and liabilities are $250,000. What are total assets?',
          choices: ['$100,000', '$400,000', '$250,000', '$150,000'],
          answer: 1,
          topic: 'accounting-equation',
          freq: 'high',
          explain: 'Assets = liabilities + owner’s equity = 250,000 + 150,000 = 400,000.'
        },
        {
          q: 'If assets are $720,000 and owner’s equity is $420,000, total liabilities are:',
          choices: ['$1,140,000', '$300,000', '$420,000', '$720,000'],
          answer: 1,
          topic: 'accounting-equation',
          freq: 'high',
          explain: 'Liabilities = assets − owner’s equity = 720,000 − 420,000 = 300,000.'
        },
        {
          q: 'In the accounting equation, owner’s equity represents:',
          choices: [
            'The company’s cash on hand',
            'What the owner would have left after all liabilities are paid',
            'Total revenue for the year',
            'Money owed to suppliers'
          ],
          answer: 1,
          topic: 'accounting-equation',
          freq: 'high',
          explain: 'Owner’s equity is assets minus liabilities — the owner’s residual stake once debts are covered.',
          why: 'Cash and revenue are not the same as equity; equity is what’s left over, not a single account balance.'
        },
        {
          q: 'Working capital is calculated as:',
          choices: [
            'Total assets − total liabilities',
            'Current assets − current liabilities',
            'Cash + accounts receivable',
            'Revenue − expenses'
          ],
          answer: 1,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Working capital = current assets − current liabilities.'
        },
        {
          q: 'Current assets are $120,000 and current liabilities are $80,000. What is the current ratio?',
          choices: ['1.5', '0.67', '2.0', '40,000'],
          answer: 0,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Current ratio = current assets ÷ current liabilities = 120,000 ÷ 80,000 = 1.5.'
        },
        {
          q: 'Current assets are $200,000 and current liabilities are $125,000. What is the working capital?',
          choices: ['$325,000', '$75,000', '$1.6', '$125,000'],
          answer: 1,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Working capital = 200,000 − 125,000 = 75,000.'
        },
        {
          q: 'A firm has $150,000 current assets and $50,000 current liabilities. Its current ratio is:',
          choices: ['3.0', '0.33', '100,000', '2.0'],
          answer: 0,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Current ratio = 150,000 ÷ 50,000 = 3.0.'
        },
        {
          q: 'A current ratio well below 1.0 most likely signals:',
          choices: [
            'Strong profitability',
            'Difficulty paying short-term obligations',
            'Too much equipment',
            'High retention'
          ],
          answer: 1,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Current assets below current liabilities (ratio < 1.0) suggests trouble covering near-term bills.'
        },
        {
          q: 'Current assets are $90,000 and current liabilities are $135,000. The working capital is:',
          choices: ['$225,000', '−$45,000 (negative)', '$45,000', '0.67'],
          answer: 1,
          topic: 'working-capital-and-current-ratio',
          freq: 'high',
          explain: 'Working capital = 90,000 − 135,000 = −45,000, i.e. negative working capital.',
          why: 'Negative working capital (current liabilities exceed current assets) is a red flag — don’t assume the result is always positive.'
        },
        {
          q: 'A material costs $400. With a 50% markup, the price is:',
          choices: ['$600', '$800', '$450', '$200'],
          answer: 0,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Markup is on cost: $400 × 50% = $200; price = $400 + $200 = $600.'
        },
        {
          q: 'A material costs $300. You apply a 20% markup. The selling price is:',
          choices: ['$320', '$360', '$375', '$240'],
          answer: 1,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Markup on cost: $300 × 20% = $60; price = $300 + $60 = $360.'
        },
        {
          q: 'You sell an item for $500 that cost $400. What is the gross margin percentage?',
          choices: ['25%', '20%', '80%', '100%'],
          answer: 1,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Margin = profit ÷ price = (500 − 400) ÷ 500 = 100 ÷ 500 = 20%.',
          why: '25% is the markup on cost (100 ÷ 400). The question asks for margin, which divides by the selling price, not cost.'
        },
        {
          q: 'An item costs $600 and sells for $750. Its gross margin percentage is:',
          choices: ['25%', '20%', '15%', '150%'],
          answer: 1,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Margin = (750 − 600) ÷ 750 = 150 ÷ 750 = 20%.',
          why: '25% is the markup on cost (150 ÷ 600). Margin always divides the profit by the selling price.'
        },
        {
          q: 'A cost of $100 is marked up 50%, giving a $150 price. What is the margin on that price?',
          choices: ['50%', '33%', '15%', '66%'],
          answer: 1,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Margin = (150 − 100) ÷ 150 = 50 ÷ 150 ≈ 33%. A 50% markup is only a 33% margin.',
          why: 'This is the classic trap: markup and margin are different. Marking up 50% does NOT mean a 50% margin — dividing by price (not cost) gives 33%.'
        },
        {
          q: 'Compared with markup on cost, the margin percentage on the same sale is always:',
          choices: ['Larger', 'Smaller (because it divides by the bigger price)', 'Identical', 'Impossible to tell'],
          answer: 1,
          topic: 'markup-vs-margin',
          freq: 'high',
          explain: 'Markup divides profit by cost; margin divides the same profit by the (larger) selling price, so margin % is smaller. Confusing the two is a classic way to underbid.'
        },
        {
          q: 'The wages of laborers pouring concrete on a specific job are best classified as:',
          choices: ['Overhead / G&A', 'Direct (job) costs', 'Owner’s equity', 'A fixed asset'],
          answer: 1,
          topic: 'direct-vs-overhead-costs',
          freq: 'med',
          explain: 'Labor, material, equipment, and subs tied to a specific project are direct (job) costs.'
        },
        {
          q: 'Which of the following is an overhead / G&A cost rather than a direct job cost?',
          choices: [
            'Rebar delivered to the jobsite',
            'The office rent and business insurance',
            'A subcontractor on that project',
            'Ready-mix for the slab'
          ],
          answer: 1,
          topic: 'direct-vs-overhead-costs',
          freq: 'med',
          explain: 'Office rent and insurance keep the company running generally, so they are overhead/G&A, not costs of one job.'
        },
        {
          q: 'Direct (job) costs are defined as costs that:',
          choices: [
            'Keep the company running regardless of any job',
            'Tie to a specific project — its labor, material, equipment, and subs',
            'Are always fixed assets',
            'Appear only on the balance sheet'
          ],
          answer: 1,
          topic: 'direct-vs-overhead-costs',
          freq: 'med',
          explain: 'Direct costs attach to a particular project; general company costs are overhead / G&A.'
        },
        {
          q: 'Under accrual accounting, revenue is recorded when:',
          choices: [
            'Cash is received',
            'It is earned, regardless of when cash arrives',
            'The contract is signed',
            'The bank statement clears'
          ],
          answer: 1,
          topic: 'cash-vs-accrual',
          freq: 'med',
          explain: 'Accrual records revenue when earned and expenses when incurred; cash basis records when money actually moves.'
        },
        {
          q: 'Which method records income and expenses only when cash actually moves in or out?',
          choices: ['Accrual accounting', 'Cash accounting', 'Depreciation', 'The current ratio'],
          answer: 1,
          topic: 'cash-vs-accrual',
          freq: 'med',
          explain: 'Cash accounting records money when it actually moves; accrual records revenue when earned and expenses when incurred.'
        },
        {
          q: 'Which of these is a FIXED asset rather than a current asset?',
          choices: ['Cash', 'Accounts receivable', 'A backhoe', 'Inventory'],
          answer: 2,
          topic: 'asset-classification-current-vs-fixed',
          freq: 'med',
          explain: 'Equipment like a backhoe is a fixed asset; cash, receivables, and inventory are current assets.'
        },
        {
          q: 'Current assets are ones expected to be used up or converted to cash within:',
          choices: ['One month', 'One year', 'Five years', 'The equipment’s useful life'],
          answer: 1,
          topic: 'asset-classification-current-vs-fixed',
          freq: 'med',
          explain: 'Current assets (cash, receivables, inventory) are used up within a year; fixed assets (equipment, vehicles, buildings) last longer.'
        },
        {
          q: 'A profitable contractor can still fail because of:',
          choices: [
            'Too much working capital',
            'Poor cash flow / the gap between paying costs and getting paid',
            'Paying taxes early',
            'Carrying insurance'
          ],
          answer: 1,
          topic: 'cash-flow-failure',
          freq: 'med',
          explain: 'Profit on paper doesn’t pay this week’s bills — cash-flow timing sinks otherwise-profitable firms.'
        },
        {
          q: 'The main cash-flow squeeze on a construction job is that:',
          choices: [
            'Progress payments arrive before any costs',
            'Payroll and materials go out before the progress payment comes in',
            'Retention is paid up front',
            'Overhead is always zero'
          ],
          answer: 1,
          topic: 'cash-flow-failure',
          freq: 'med',
          explain: 'You pay for labor and materials first, then wait on the progress payment — and on retention you haven’t collected yet. Plan for that gap.'
        },
        {
          q: 'The quick (acid-test) ratio differs from the current ratio by excluding:',
          choices: ['Cash', 'Inventory', 'Accounts payable', 'Long-term debt'],
          answer: 1,
          topic: 'quick-acid-test-ratio',
          freq: 'low',
          explain: 'The quick ratio removes inventory (the least liquid current asset) to be more conservative.'
        },
        {
          q: 'Current assets are $200,000 including $50,000 of inventory; current liabilities are $100,000. The quick (acid-test) ratio is:',
          choices: ['2.0', '1.5', '0.5', '2.5'],
          answer: 1,
          topic: 'quick-acid-test-ratio',
          freq: 'low',
          explain: 'Quick ratio = (current assets − inventory) ÷ current liabilities = (200,000 − 50,000) ÷ 100,000 = 150,000 ÷ 100,000 = 1.5.',
          why: '2.0 is the plain current ratio (200,000 ÷ 100,000). The quick ratio strips out inventory first, giving 1.5.'
        },
        {
          q: 'Depreciation is best described as:',
          choices: [
            'A cash payment made each month',
            'Spreading the cost of equipment over its useful life',
            'A markup added to a bid',
            'A current asset'
          ],
          answer: 1,
          topic: 'depreciation',
          freq: 'low',
          explain: 'Depreciation spreads the cost of equipment over the years of its useful life.'
        },
        {
          q: 'A company buys a car for general use by office staff. Its depreciation is charged to:',
          choices: [
            'Direct job costs',
            'General and administrative (overhead)',
            'Project management for the current job',
            'Company profit'
          ],
          answer: 1,
          topic: 'depreciation',
          freq: 'low',
          explain: 'A general-use vehicle is a G&A/overhead expense, not a cost of any one job.',
          why: 'It’s tempting to bury a truck in job costs, but a vehicle for general company use is depreciated as G&A overhead, not charged to a specific project.'
        }
      ],
      topics: {
        'balance-sheet-vs-income-statement': { freq: 'high', label: 'Balance sheet vs. income statement' },
        'accounting-equation': { freq: 'high', label: 'The accounting equation' },
        'working-capital-and-current-ratio': { freq: 'high', label: 'Working capital & current ratio' },
        'markup-vs-margin': { freq: 'high', label: 'Markup vs. margin' },
        'direct-vs-overhead-costs': { freq: 'med', label: 'Direct (job) vs. overhead (G&A) costs' },
        'cash-vs-accrual': { freq: 'med', label: 'Cash vs. accrual accounting' },
        'asset-classification-current-vs-fixed': { freq: 'med', label: 'Current vs. fixed assets' },
        'cash-flow-failure': { freq: 'med', label: 'Cash-flow failure' },
        'quick-acid-test-ratio': { freq: 'low', label: 'Quick (acid-test) ratio' },
        depreciation: { freq: 'low', label: 'Depreciation' }
      }
    },
    {
      id: 'safety',
      title: 'Safety',
      weight: 14,
      intro: 'Cal/OSHA basics: the written program every employer needs, the records you keep, and the incidents you must report fast. Concrete contractors live this on site, but the exam tests the paperwork and the reporting deadlines.',
      key: [
        'Every California employer must have a written Injury and Illness Prevention Program (IIPP) — Title 8 §3203. It names a responsible person and covers hazard identification, correction, training, and recordkeeping.',
        "A serious work-related injury, illness, or any death must be reported to Cal/OSHA immediately — within 8 hours of when you knew or should have known. ('Serious' means inpatient hospitalization, amputation, loss of an eye, or serious permanent disfigurement.)",
        'Employers log recordable work injuries/illnesses on the Cal/OSHA Form 300 log and post the annual Form 300A summary (Feb 1–Apr 30).',
        'Hazard Communication: workers have a right to know about chemicals on site. Keep Safety Data Sheets (SDS), label containers, and train.',
        "A 'competent person' is someone trained to spot hazards and authorized to correct them — required for tasks like excavation and fall protection.",
        "Common construction triggers: fall protection generally at 7½ feet in California construction (Cal/OSHA §1670 — note that's higher than the federal 6-foot rule); cave-in protection for excavations/trenches 5 feet deep or more; a Heat Illness Prevention plan for outdoor work (water, shade, rest, training), plus a separate indoor heat standard (§3396) for most indoor workplaces reaching 82°F.",
        'The employer must provide and pay for required personal protective equipment (PPE).',
        "Cal/OSHA requires posting the official safety/'Safety and Health Protection on the Job' poster where employees can see it.",
        'Asbestos and lead work have their own registration/certification rules and are heavily regulated.'
      ],
      numbers: [
        {
          label: 'Written safety program',
          value: 'IIPP required for every employer',
          src: 'Cal/OSHA T8 §3203'
        },
        {
          label: 'Report serious injury/death to Cal/OSHA',
          value: 'immediately — within 8 hours',
          src: 'Cal/OSHA T8 §342'
        },
        {
          label: 'Injury recordkeeping',
          value: 'Form 300 log; post 300A summary Feb 1–Apr 30',
          src: 'Cal/OSHA recordkeeping'
        },
        {
          label: 'Fall protection (CA construction)',
          value: 'generally required over 7½ feet (federal is 6)',
          src: 'Cal/OSHA T8 §1670'
        },
        {
          label: 'Excavation cave-in protection',
          value: 'trenches 5 feet deep or more',
          src: 'Cal/OSHA T8 §1541.1'
        },
        {
          label: 'Indoor heat illness rule',
          value: 'most indoor workplaces reaching 82°F',
          src: 'Cal/OSHA T8 §3396 (eff. 2024)'
        },
        { label: 'PPE cost', value: 'employer provides/pays for required PPE', src: 'Cal/OSHA T8 §3380' }
      ],
      math: [],
      questions: [
        {
          q: 'Every California employer is required to have a written:',
          choices: [
            'Business plan',
            'Injury and Illness Prevention Program (IIPP)',
            'Union agreement',
            'Quality control manual'
          ],
          answer: 1,
          topic: 'written-iipp-3203',
          freq: 'high',
          explain: 'Title 8 §3203 requires a written IIPP for every employer.'
        },
        {
          q: 'The written safety program that every California employer must maintain is required by which Cal/OSHA standard?',
          choices: ['Title 8 §3203', 'Title 8 §1670', 'Title 8 §342', 'Title 8 §3396'],
          answer: 0,
          topic: 'written-iipp-3203',
          freq: 'high',
          explain: 'The Injury and Illness Prevention Program (IIPP) requirement comes from Title 8 §3203.'
        },
        {
          q: 'Which of these is NOT one of the elements an IIPP must cover?',
          choices: [
            'Hazard identification',
            'Correcting hazards',
            'Setting employee wage rates',
            'Training and recordkeeping'
          ],
          answer: 2,
          topic: 'written-iipp-3203',
          freq: 'high',
          explain: 'The IIPP covers hazard identification, correction, training, and recordkeeping, and names a responsible person. Wages are not part of it.'
        },
        {
          q: 'A one-person concrete crew adds its first employee. Regarding the IIPP, the owner must:',
          choices: [
            'Do nothing — IIPPs are only for large firms',
            'Have a written IIPP that names a responsible person',
            'Wait until 10 employees are hired',
            'File the IIPP with the CSLB'
          ],
          answer: 1,
          topic: 'written-iipp-3203',
          freq: 'high',
          explain: 'A written IIPP is required of every employer under §3203; it must name a person responsible for the program.'
        },
        {
          q: 'A serious work-related injury or a death must be reported to Cal/OSHA:',
          choices: ['Within 30 days', 'On the next 300A summary', 'Immediately — within 8 hours', 'Only if OSHA asks'],
          answer: 2,
          topic: 'serious-injury-8hr-reporting',
          freq: 'high',
          explain: 'Serious injuries, illnesses, and deaths must be reported immediately, within 8 hours (Title 8 §342).'
        },
        {
          q: 'Under Cal/OSHA, which counts as a "serious" injury that triggers the immediate reporting rule?',
          choices: [
            'A minor cut needing a bandage',
            'An inpatient hospitalization or an amputation',
            'A worker sent home early',
            'A near-miss with no injury'
          ],
          answer: 1,
          topic: 'serious-injury-8hr-reporting',
          freq: 'high',
          explain: '"Serious" means inpatient hospitalization, amputation, loss of an eye, or serious permanent disfigurement.'
        },
        {
          q: 'A worker is hospitalized after a fall at 10 a.m. Monday. The employer learns of it immediately. Cal/OSHA must be notified by:',
          choices: ['6 p.m. Monday (within 8 hours)', 'The end of the week', 'The next 300A posting', 'Within 24 hours'],
          answer: 0,
          topic: 'serious-injury-8hr-reporting',
          freq: 'high',
          explain: 'The serious-injury report is due within 8 hours of when you knew or should have known — not 24 hours.',
          why: 'The old rule said 24 hours; California now requires reporting within 8 hours, so "within 24 hours" is a stale-fact trap.'
        },
        {
          q: 'The 8-hour clock for reporting a serious injury starts when the employer:',
          choices: [
            'Files the 300 log',
            'Knew or should have known of the injury',
            'Receives a Cal/OSHA citation',
            'Renews the license'
          ],
          answer: 1,
          topic: 'serious-injury-8hr-reporting',
          freq: 'high',
          explain: 'The 8-hour reporting window runs from when the employer knew or reasonably should have known of the serious injury or death.'
        },
        {
          q: 'In California construction, Cal/OSHA generally requires fall protection at heights over:',
          choices: ['4 feet', '6 feet', '7½ feet', '15 feet'],
          answer: 2,
          topic: 'fall-protection-7-5ft',
          freq: 'high',
          explain: 'Cal/OSHA (Title 8 §1670) triggers fall protection at 7½ feet in construction — higher than the federal 6-foot rule.',
          why: 'Federal OSHA uses 6 feet, but California construction uses 7½ feet. On a California exam the answer is 7½ ft; "6 feet" is the federal-vs-CA trap.'
        },
        {
          q: 'Which Cal/OSHA standard sets the general fall-protection trigger height for California construction?',
          choices: ['Title 8 §1670', 'Title 8 §3203', 'Title 8 §342', 'Title 8 §1541.1'],
          answer: 0,
          topic: 'fall-protection-7-5ft',
          freq: 'high',
          explain: 'Title 8 §1670 is the California construction fall-protection standard, generally triggering at 7½ feet.'
        },
        {
          q: 'A federal OSHA jobsite uses a 6-foot fall-protection trigger. On a California construction site, the general trigger is instead:',
          choices: ['4 feet', '6 feet', '7½ feet', '10 feet'],
          answer: 2,
          topic: 'fall-protection-7-5ft',
          freq: 'high',
          explain: 'California construction generally requires fall protection over 7½ feet, not the federal 6 feet.',
          why: 'This is the classic CA-vs-federal trap: 6 ft is the federal number, but California’s §1670 threshold is 7½ ft.'
        },
        {
          q: 'A worker on a concrete form is 8 feet above the ground with no rails or personal fall arrest. Under Cal/OSHA this is:',
          choices: [
            'Fine — below the trigger height',
            'A violation — fall protection is required over 7½ feet',
            'Fine — the federal 10-foot rule applies',
            'Only a problem above 15 feet'
          ],
          answer: 1,
          topic: 'fall-protection-7-5ft',
          freq: 'high',
          explain: '8 feet is above the 7½-foot California construction trigger, so fall protection is required.',
          why: 'Don’t reach for the federal 6-foot rule or a 10/15-foot figure — the general CA construction trigger is 7½ ft.'
        },
        {
          q: 'Fall protection in California construction generally becomes required once a worker is exposed to a fall of more than:',
          choices: ['7½ feet (seven and a half)', 'Six feet', 'Four feet', 'Twelve feet'],
          answer: 0,
          topic: 'fall-protection-7-5ft',
          freq: 'high',
          explain: 'The general California construction trigger is more than 7½ feet (Title 8 §1670).',
          why: 'Six feet is federal; the California construction answer is seven and a half feet.'
        },
        {
          q: 'Cave-in/shoring protection is generally required for excavations and trenches that are at least:',
          choices: ['3 feet deep', '5 feet deep', '10 feet deep', '20 feet deep'],
          answer: 1,
          topic: 'trench-cave-in-5ft',
          freq: 'med',
          explain: 'Protective systems are generally required at 5 feet or more (and sooner in unstable soil) — Title 8 §1541.1.'
        },
        {
          q: 'A crew is digging a 6-foot-deep trench to set a footing. Regarding cave-in protection, they must:',
          choices: [
            'Do nothing — protection starts at 10 feet',
            'Use a protective system such as shoring, sloping, or a shield',
            'Wait for a Cal/OSHA inspector',
            'Only worry if the soil is sandy'
          ],
          answer: 1,
          topic: 'trench-cave-in-5ft',
          freq: 'med',
          explain: 'At 5 feet or deeper a protective system (shoring, sloping/benching, or a trench shield) is generally required.'
        },
        {
          q: 'Which Cal/OSHA standard governs cave-in protection for trenches and excavations?',
          choices: ['Title 8 §1541.1', 'Title 8 §1670', 'Title 8 §3380', 'Title 8 §3396'],
          answer: 0,
          topic: 'trench-cave-in-5ft',
          freq: 'med',
          explain: 'Excavation cave-in protection at 5 feet or more comes from Title 8 §1541.1.'
        },
        {
          q: 'Safety Data Sheets (SDS) are part of which program?',
          choices: ['Hazard Communication (right-to-know)', "Workers' compensation", 'Prevailing wage', 'Fall protection'],
          answer: 0,
          topic: 'hazcom-sds',
          freq: 'med',
          explain: 'SDS, container labeling, and training are part of Hazard Communication — workers’ right to know about chemicals.'
        },
        {
          q: 'Under the Hazard Communication standard, an employer must do all of the following EXCEPT:',
          choices: [
            'Keep Safety Data Sheets available',
            'Label chemical containers',
            'Train workers about on-site chemicals',
            'Report every chemical to Cal/OSHA within 8 hours'
          ],
          answer: 3,
          topic: 'hazcom-sds',
          freq: 'med',
          explain: 'HazCom means keeping SDS, labeling containers, and training. The 8-hour rule is for serious injuries, not chemicals.'
        },
        {
          q: 'A concrete crew uses a chemical form-release agent on site. Under HazCom, workers have the right to:',
          choices: [
            'A pay raise for chemical exposure',
            'Access the SDS and be trained on the chemical',
            'Refuse to work near any chemical',
            'A new IIPP for each product'
          ],
          answer: 1,
          topic: 'hazcom-sds',
          freq: 'med',
          explain: 'Hazard Communication gives workers the right to know: SDS access, labeled containers, and training on the chemicals present.'
        },
        {
          q: 'The annual summary of recordable injuries that must be posted in the workplace is the:',
          choices: ['Form 941', 'Form 300A', 'Form I-9', 'DE 9'],
          answer: 1,
          topic: 'form-300-and-300a',
          freq: 'med',
          explain: 'The Form 300A summary is posted Feb 1–Apr 30; the 300 is the detailed log.'
        },
        {
          q: 'The Cal/OSHA Form 300A summary must be posted in the workplace during which period each year?',
          choices: ['Jan 1–Dec 31', 'Feb 1–Apr 30', 'Only in December', 'Apr 15–Jun 15'],
          answer: 1,
          topic: 'form-300-and-300a',
          freq: 'med',
          explain: 'The 300A annual summary is posted from February 1 through April 30. The 300 is the ongoing log of recordable injuries.'
        },
        {
          q: 'A "competent person" on a jobsite is someone who:',
          choices: [
            "Holds the contractor's license",
            'Can identify hazards and is authorized to correct them',
            'Is the lowest-paid worker',
            'Only keeps the 300 log'
          ],
          answer: 1,
          topic: 'competent-person',
          freq: 'med',
          explain: 'A competent person is trained to recognize hazards and authorized to take prompt corrective action.'
        },
        {
          q: 'For which tasks does Cal/OSHA specifically require a "competent person"?',
          choices: ['Payroll and billing', 'Excavation and fall protection', 'Advertising and marketing', 'License renewal'],
          answer: 1,
          topic: 'competent-person',
          freq: 'med',
          explain: 'A competent person is required for hazardous tasks such as excavation and fall protection.'
        },
        {
          q: 'Who must pay for required personal protective equipment (PPE)?',
          choices: ['The employee', 'The employer', 'Split 50/50', 'Cal/OSHA'],
          answer: 1,
          topic: 'ppe-employer-pays',
          freq: 'med',
          explain: 'Employers must provide and pay for required PPE (Title 8 §3380).'
        },
        {
          q: 'A worker needs a hard hat and safety glasses required for the job. Under Cal/OSHA, the cost is borne by:',
          choices: [
            'The employee out of pocket',
            'The employer',
            'The general contractor only',
            'The workers’ comp carrier'
          ],
          answer: 1,
          topic: 'ppe-employer-pays',
          freq: 'med',
          explain: 'The employer must provide and pay for required PPE; it cannot be pushed onto the employee.'
        },
        {
          q: 'A Heat Illness Prevention plan for outdoor work must provide, at minimum:',
          choices: ['Bonuses for hot days', 'Water, shade, rest, and training', 'Shorter contracts', 'Extra insurance'],
          answer: 1,
          topic: 'heat-illness',
          freq: 'med',
          explain: 'The core elements are access to water, shade, rest/recovery, and training.'
        },
        {
          q: 'California’s separate indoor heat illness standard (§3396) generally applies to most indoor workplaces once they reach:',
          choices: ['70°F', '82°F', '95°F', '100°F'],
          answer: 1,
          topic: 'heat-illness',
          freq: 'med',
          explain: 'The indoor heat rule (Title 8 §3396, effective 2024) applies to most indoor workplaces reaching 82°F, in addition to the outdoor heat rule.'
        },
        {
          q: 'Which work has special registration/certification requirements due to its hazard?',
          choices: ['Painting', 'Asbestos abatement', 'Drywall finishing', 'Flatwork'],
          answer: 1,
          topic: 'asbestos-lead-regulation',
          freq: 'low',
          explain: 'Asbestos (and lead) work is heavily regulated with its own registration/certification.'
        },
        {
          q: 'Besides asbestos, which other material has its own heavily regulated registration/certification rules?',
          choices: ['Lead', 'Sand', 'Gravel', 'Rebar'],
          answer: 0,
          topic: 'asbestos-lead-regulation',
          freq: 'low',
          explain: 'Both asbestos and lead work carry their own registration/certification requirements and are heavily regulated.'
        },
        {
          q: 'Cal/OSHA requires employers to post the official "Safety and Health Protection on the Job" poster:',
          choices: [
            'Only at the main office',
            'Where employees can see it',
            'On the company website only',
            'Only during inspections'
          ],
          answer: 1,
          topic: 'safety-poster',
          freq: 'low',
          explain: 'The official safety poster must be posted where employees can see it.'
        },
        {
          q: 'Which item is Cal/OSHA required to be displayed in the workplace for employees?',
          choices: [
            'A copy of every contract',
            'The official Cal/OSHA safety/health protection poster',
            'The owner’s license certificate framed',
            'The company profit-and-loss statement'
          ],
          answer: 1,
          topic: 'safety-poster',
          freq: 'low',
          explain: 'Cal/OSHA requires posting the official "Safety and Health Protection on the Job" poster where employees can see it.'
        }
      ],
      topics: {
        'written-iipp-3203': { freq: 'high', label: 'Written IIPP (§3203)' },
        'serious-injury-8hr-reporting': { freq: 'high', label: 'Serious-injury 8-hour reporting' },
        'fall-protection-7-5ft': { freq: 'high', label: 'Fall protection at 7½ ft' },
        'trench-cave-in-5ft': { freq: 'med', label: 'Trench cave-in protection (5 ft)' },
        'hazcom-sds': { freq: 'med', label: 'Hazard Communication / SDS' },
        'form-300-and-300a': { freq: 'med', label: 'Form 300 log & 300A summary' },
        'competent-person': { freq: 'med', label: 'Competent person' },
        'ppe-employer-pays': { freq: 'med', label: 'PPE — employer pays' },
        'heat-illness': { freq: 'med', label: 'Heat illness (outdoor & indoor)' },
        'asbestos-lead-regulation': { freq: 'low', label: 'Asbestos & lead regulation' },
        'safety-poster': { freq: 'low', label: 'Safety poster posting' }
      }
    },
    {
      id: 'licensing',
      title: 'Business Organization & Licensing',
      weight: 13,
      intro: 'Who needs a license, how the business is structured, and the rules that keep the license valid. Much of this is straight from the Contractors License Law, and the numbers are very memorizable.',
      key: [
        'You need a CSLB license to contract for any job where the combined labor and materials total $1,000 or more (raised from $500 as of 2025). Splitting a job into sub-$1,000 pieces to dodge the rule is illegal.',
        'Three license groups: Class A (General Engineering), Class B (General Building), and Class C (specialty trades, like C-8 Concrete). A Class B job must involve at least two unrelated trades.',
        'The license is qualified by a person — a Responsible Managing Owner (RMO) or Responsible Managing Employee (RME) — who has the experience and passes the exams. An RMO is an owner; an RME is a permanent employee.',
        "An RME must be a bona fide, permanent employee and 'actively engaged' — working at least 32 hours a week, or 80% of the hours the business operates, whichever is less.",
        'Experience: applicants generally need at least 4 years of journey-level (or higher) experience within the last 10 years to qualify for the trade exam.',
        'The exam can be waived in limited cases — for example, a qualifier who has been listed on an active license in good standing in a closely related classification for at least 5 of the last 7 years (with the required experience) may add a class without re-testing.',
        'A license is NOT transferable. Advertising must show your license number. Notify CSLB of changes (address, personnel, business name) promptly.',
        'Grounds for discipline include abandonment of a job, willful departure from plans/specs, and contracting outside your classification.',
        "A minor cannot hold a license without a court-appointed guardian. Licenses renew on a two-year cycle, and can be placed 'inactive' to keep the license without contracting."
      ],
      numbers: [
        {
          label: 'License required at',
          value: '$1,000+ (labor + materials; raised from $500 in 2025)',
          src: 'B&P §7048 (AB 2622)'
        },
        {
          label: 'RME “actively engaged”',
          value: '32 hrs/week or 80% of operating hours, whichever is less',
          src: 'B&P §7068'
        },
        {
          label: 'Experience to qualify',
          value: '4 years journey-level within the last 10',
          src: 'B&P §7065.3'
        },
        {
          label: 'Exam waiver',
          value: 'qualifier listed 5 of last 7 yrs; closely related class',
          src: 'B&P §7065.3'
        },
        { label: 'Class B definition', value: 'work in 2+ unrelated trades', src: 'B&P §7057' },
        { label: 'License renewal cycle', value: 'every 2 years', src: 'B&P §7140' },
        {
          label: 'Unlicensed contracting penalty',
          value: 'civil penalty $1,500–$15,000',
          src: 'B&P §7028.7 (SB 779, 7/1/2026)'
        }
      ],
      math: [],
      questions: [
        {
          q: 'A contractor’s license is required when the combined labor and materials for a job total at least:',
          choices: ['$200', '$500', '$1,000', '$5,000'],
          answer: 2,
          topic: 'license-threshold-1000',
          freq: 'high',
          explain: 'The license threshold is $1,000 or more in combined labor and materials.',
          why: '$500 was the old threshold — it was raised to $1,000 in 2025 (B&P §7048). It’s the classic trap answer, but it’s no longer correct.'
        },
        {
          q: 'As of 2026, the dollar figure at or above which a CSLB license is required is:',
          choices: ['$500 (the pre-2025 figure)', '$750', '$1,000', '$2,500'],
          answer: 2,
          topic: 'license-threshold-1000',
          freq: 'high',
          explain: 'The threshold is $1,000 in combined labor and materials, raised from the old $500 figure in 2025.',
          why: 'Know both numbers: $500 is history, $1,000 is the live rule. The exam may test whether you kept up with the 2025 change.'
        },
        {
          q: 'Breaking a $4,000 job into five separate $800 contracts to avoid the license law is:',
          choices: [
            'Legal, since each is under $1,000',
            'Illegal — splitting a job below the $1,000 threshold to evade licensure is prohibited',
            'Allowed with the owner’s consent',
            'Only a problem for home improvement'
          ],
          answer: 1,
          topic: 'license-threshold-1000',
          freq: 'high',
          explain: 'Splitting a project into sub-$1,000 pieces to dodge licensure is prohibited.'
        },
        {
          q: 'A handyman quotes a homeowner $900 for labor and materials on a small repair and has no CSLB license. This is:',
          choices: [
            'Illegal — any paid work needs a license',
            'Generally allowed, because the total is under the $1,000 threshold',
            'Allowed only if the homeowner signs a waiver',
            'Illegal unless the job is under $500'
          ],
          answer: 1,
          topic: 'license-threshold-1000',
          freq: 'high',
          explain: 'A license is required at $1,000 or more, so a genuine $900 job falls below the threshold.',
          why: 'The trap is “$500.” Under today’s $1,000 rule a real $900 job is fine — it would only be a violation if the true value hit $1,000, or if the job was split to stay under.'
        },
        {
          q: 'The three CSLB license groups are:',
          choices: [
            'Residential, Commercial, Industrial',
            'Class A (General Engineering), Class B (General Building), Class C (Specialty)',
            'Federal, State, Local',
            'Union, Non-union, Public'
          ],
          answer: 1,
          topic: 'classifications-a-b-c-c8',
          freq: 'high',
          explain: 'The groups are Class A (General Engineering), Class B (General Building), and Class C (specialty trades).'
        },
        {
          q: 'A Class B (General Building) contract generally must involve:',
          choices: ['Only one trade', 'At least two unrelated trades', 'Public works only', 'Engineering structures'],
          answer: 1,
          topic: 'classifications-a-b-c-c8',
          freq: 'high',
          explain: 'A General Building (B) project requires work in at least two unrelated building trades.'
        },
        {
          q: 'Which classification fits a contractor who forms, pours, and finishes concrete?',
          choices: [
            'Class A – General Engineering',
            'Class B – General Building',
            'C-8 – Concrete',
            'C-12 – Earthwork & Paving'
          ],
          answer: 2,
          topic: 'classifications-a-b-c-c8',
          freq: 'high',
          explain: 'C-8 Concrete covers forming, pouring, placing, and finishing concrete work.'
        },
        {
          q: 'A contractor’s entire job is installing a single specialty system — one trade, nothing else. This work belongs under:',
          choices: [
            'Class A – General Engineering',
            'Class B – General Building',
            'A Class C specialty classification',
            'No license is needed for single-trade work'
          ],
          answer: 2,
          topic: 'classifications-a-b-c-c8',
          freq: 'high',
          explain: 'Single-trade specialty work falls under a Class C specialty license.',
          why: 'Class B is the trap here — but B requires two or more unrelated trades. One trade points to a Class C specialty, not General Building.'
        },
        {
          q: 'A California contractor license is “qualified” by:',
          choices: [
            'The bonding company',
            'A person (an RMO or RME) with the experience who passes the exams',
            'The CSLB board',
            'The project owner'
          ],
          answer: 1,
          topic: 'rmo-rme-qualifier',
          freq: 'high',
          explain: 'A license is qualified by a person — a Responsible Managing Owner or Responsible Managing Employee — who has the experience and passes the exams.'
        },
        {
          q: 'The difference between an RMO and an RME is that:',
          choices: [
            'An RMO is an owner; an RME is a permanent employee',
            'An RMO is an employee; an RME is an owner',
            'An RMO handles taxes; an RME handles safety',
            'There is no difference'
          ],
          answer: 0,
          topic: 'rmo-rme-qualifier',
          freq: 'high',
          explain: 'An RMO (Responsible Managing Owner) is an owner; an RME (Responsible Managing Employee) is a permanent employee.'
        },
        {
          q: 'A company hires an outside qualifier to serve as its RME. To be valid, that person must be:',
          choices: [
            'An independent contractor paid per project',
            'A bona fide, permanent employee of the company',
            'A part-owner of the company',
            'A licensed attorney'
          ],
          answer: 1,
          topic: 'rmo-rme-qualifier',
          freq: 'high',
          explain: 'An RME must be a bona fide, permanent employee of the licensed business.',
          why: 'A per-project independent contractor doesn’t qualify — the RME has to be a real, permanent employee (and actively engaged).'
        },
        {
          q: 'To qualify for a trade exam, an applicant generally needs how much journey-level experience?',
          choices: ['1 year within 5', '4 years within the last 10', '8 years total', 'No experience is required'],
          answer: 1,
          topic: 'experience-4-in-10',
          freq: 'med',
          explain: 'Generally at least four years of journey-level (or higher) experience within the last ten years.'
        },
        {
          q: 'An applicant has 4 years of solid journey-level experience, but all of it was 12 to 16 years ago. Under the general rule, this experience:',
          choices: [
            'Fully qualifies — total years are all that matter',
            'Does not qualify, because it must fall within the last 10 years',
            'Qualifies only for a Class A license',
            'Qualifies only with a waiver fee'
          ],
          answer: 1,
          topic: 'experience-4-in-10',
          freq: 'med',
          explain: 'The four years of experience must fall within the last ten years, so experience older than that generally does not count.',
          why: 'It’s not just “4 years” — it’s 4 years within the last 10. Stale experience outside that window doesn’t satisfy the rule.'
        },
        {
          q: 'A Responsible Managing Employee (RME) must be “actively engaged,” meaning at least:',
          choices: [
            '10 hours a week',
            '32 hours a week or 80% of operating hours, whichever is less',
            '40 hours a week always',
            'Whatever the contract states'
          ],
          answer: 1,
          topic: 'rme-actively-engaged-32hrs',
          freq: 'med',
          explain: 'An RME must work 32 hrs/week or 80% of the business’s operating hours, whichever is less.'
        },
        {
          q: 'A business operates only 30 hours a week. For its RME, “actively engaged” means working at least:',
          choices: [
            '32 hours (the fixed minimum)',
            '80% of 30 hours — about 24 hours',
            'The full 30 hours',
            '40 hours a week'
          ],
          answer: 1,
          topic: 'rme-actively-engaged-32hrs',
          freq: 'med',
          explain: 'The standard is 32 hours OR 80% of operating hours, whichever is less. For a 30-hour operation, 80% (24 hours) is less than 32, so 24 hours applies.',
          why: 'Pick the smaller of the two. 32 is a ceiling, not a floor — when the shop runs fewer hours, 80% of its actual hours governs.'
        },
        {
          q: 'California contractor licenses must be renewed:',
          choices: ['Every year', 'Every 2 years', 'Every 4 years', 'Only when info changes'],
          answer: 1,
          topic: 'renewal-2-year',
          freq: 'med',
          explain: 'Active licenses renew on a two-year cycle.'
        },
        {
          q: 'A contractor renewed the license and plans not to renew again for the maximum allowed interval. That interval is:',
          choices: ['1 year', '2 years', '3 years', '5 years'],
          answer: 1,
          topic: 'renewal-2-year',
          freq: 'med',
          explain: 'Licenses renew on a two-year cycle, so the standard interval is 2 years.'
        },
        {
          q: 'A contractor’s advertising must include:',
          choices: [
            'The owner’s home address',
            'The CSLB license number',
            'A photo of the owner',
            'The bond company’s name'
          ],
          answer: 1,
          topic: 'advertising-license-number',
          freq: 'med',
          explain: 'License numbers must appear in advertising.'
        },
        {
          q: 'A contractor prints business cards, a truck wrap, and a newspaper ad. Which must display the CSLB license number?',
          choices: [
            'Only the newspaper ad',
            'Only printed items mailed to customers',
            'All advertising the contractor uses',
            'None — it’s optional'
          ],
          answer: 2,
          topic: 'advertising-license-number',
          freq: 'med',
          explain: 'The license number must appear in advertising generally, not just in one format.',
          why: 'The rule isn’t limited to newspaper ads or mailers — advertising across the board is expected to show the license number.'
        },
        {
          q: 'Which is a ground for disciplinary action against a license?',
          choices: [
            'Finishing a job early',
            'Abandoning a project without legal excuse',
            'Offering a discount',
            'Hiring an apprentice'
          ],
          answer: 1,
          topic: 'grounds-for-discipline',
          freq: 'med',
          explain: 'Abandonment, willful departure from plans, and contracting outside your classification are disciplinary grounds.'
        },
        {
          q: 'A Class C-8 (Concrete) contractor takes on and self-performs unrelated electrical work outside that classification. This is:',
          choices: [
            'Fine, since they already hold a license',
            'A ground for discipline — contracting outside your classification',
            'Only a tax issue',
            'Allowed if the customer agrees'
          ],
          answer: 1,
          topic: 'grounds-for-discipline',
          freq: 'med',
          explain: 'Contracting outside your classification is a listed ground for discipline, alongside abandonment and willful departure from plans/specs.',
          why: 'Holding a valid license doesn’t let you work outside its scope — going beyond your classification is itself a disciplinary ground.'
        },
        {
          q: 'A California contractor license is:',
          choices: [
            'Freely transferable to a buyer of the business',
            'Not transferable to another person or entity',
            'Valid in every state',
            'Permanent once issued'
          ],
          answer: 1,
          topic: 'license-not-transferable',
          freq: 'med',
          explain: 'Licenses are not transferable; a new owner generally needs their own license.'
        },
        {
          q: 'Someone buys a licensed contracting business and wants to keep operating. Regarding the seller’s license, the buyer:',
          choices: [
            'Automatically inherits the seller’s license',
            'Cannot simply take over the license — it is not transferable, so they generally need their own',
            'May use it for up to two years',
            'Can transfer it by paying a fee'
          ],
          answer: 1,
          topic: 'license-not-transferable',
          freq: 'med',
          explain: 'A license is not transferable, so the buyer generally must obtain their own license rather than inherit the seller’s.',
          why: 'Buying the business doesn’t buy the license. The license attaches to the qualified person/entity and doesn’t travel with a sale.'
        },
        {
          q: 'The civil penalty range for unlicensed contracting is:',
          choices: ['$100–$1,000', '$500–$5,000', '$1,500–$15,000', '$25,000 flat'],
          answer: 2,
          topic: 'unlicensed-penalty',
          freq: 'med',
          explain: 'The unlicensed-contracting civil penalty runs from $1,500 to $15,000 (B&P §7028.7).'
        },
        {
          q: 'For unlicensed contracting, the maximum civil penalty is:',
          choices: ['$1,500', '$5,000', '$15,000', '$100,000'],
          answer: 2,
          topic: 'unlicensed-penalty',
          freq: 'med',
          explain: 'The penalty range tops out at $15,000 (the range is $1,500–$15,000).',
          why: '$1,500 is the floor of the range, not the ceiling. The maximum is $15,000.'
        },
        {
          q: 'A contractor who wants to keep a license but stop contracting for a while can:',
          choices: [
            'Let it expire',
            'Place it on inactive status',
            'Transfer it to a friend',
            'Nothing — you must keep working'
          ],
          answer: 1,
          topic: 'inactive-status',
          freq: 'low',
          explain: 'An inactive license keeps the license alive without the right to contract.'
        },
        {
          q: 'While a license is on inactive status, the holder:',
          choices: [
            'May still bid and contract for jobs',
            'Keeps the license but may not contract',
            'Loses the license permanently',
            'Must renew it every month'
          ],
          answer: 1,
          topic: 'inactive-status',
          freq: 'low',
          explain: 'Inactive status preserves the license but suspends the right to contract for work.',
          why: 'Inactive isn’t “expired.” The license stays alive — you just can’t contract until you reactivate it.'
        },
        {
          q: 'The trade exam may be waived when a qualifier has been listed on an active license in good standing in a closely related classification for at least:',
          choices: ['1 of the last 3 years', '5 of the last 7 years', '5 years total, any class', '10 of the last 15 years'],
          answer: 1,
          topic: 'exam-waiver',
          freq: 'low',
          explain: 'A qualifier listed on an active, good-standing license in a closely related class for at least 5 of the last 7 years (with required experience) may add a class without re-testing.',
          why: 'It’s specifically 5 of the last 7 years and a closely related classification — not simply “5 years” in the same class.'
        },
        {
          q: 'A qualifier held a license in the SAME classification for 5 years straight, then let it lapse 8 years ago. For the exam waiver, this:',
          choices: [
            'Qualifies — 5 years is all that matters',
            'Does not clearly qualify, because the 5 years must fall within the last 7',
            'Qualifies only for Class A',
            'Waives the experience requirement too'
          ],
          answer: 1,
          topic: 'exam-waiver',
          freq: 'low',
          explain: 'The waiver requires being listed on a good-standing license in a closely related class for 5 of the last 7 years, so a license that lapsed 8 years ago falls outside the window.',
          why: 'The trap is thinking any “5 years, same class” works. The 5 years must sit within the last 7 and be on a good-standing license.'
        }
      ],
      topics: {
        'license-threshold-1000': { freq: 'high', label: 'License threshold ($1,000)' },
        'classifications-a-b-c-c8': { freq: 'high', label: 'Classifications A / B / C (incl. C-8)' },
        'rmo-rme-qualifier': { freq: 'high', label: 'RMO / RME qualifier' },
        'experience-4-in-10': { freq: 'med', label: 'Experience (4 of last 10 years)' },
        'rme-actively-engaged-32hrs': { freq: 'med', label: 'RME actively engaged (32 hrs/wk)' },
        'renewal-2-year': { freq: 'med', label: 'Renewal (2-year cycle)' },
        'advertising-license-number': { freq: 'med', label: 'Advertising the license number' },
        'grounds-for-discipline': { freq: 'med', label: 'Grounds for discipline' },
        'license-not-transferable': { freq: 'med', label: 'License not transferable' },
        'unlicensed-penalty': { freq: 'med', label: 'Unlicensed contracting penalty' },
        'inactive-status': { freq: 'low', label: 'Inactive status' },
        'exam-waiver': { freq: 'low', label: 'Exam waiver' }
      }
    },
    {
      id: 'insurance-liens',
      title: 'Insurance & Liens',
      weight: 12,
      intro: 'Protecting yourself and getting paid. Two big buckets: the insurance and bonds the state requires, and the mechanics-lien system — a powerful tool with unforgiving deadlines. The lien day-counts are pure points.',
      key: [
        'Every active license carries a $25,000 contractor license bond. A qualifying individual (RMO/RME) also generally needs a $25,000 bond of qualifying individual, unless the qualifier owns 10%+ of the company. LLCs must additionally carry a $100,000 worker bond and $1M commercial general liability (B&P §7071.19).',
        'A surety bond has three parties: the principal (contractor), the obligee (the public/state it protects), and the surety (the bonding company). A bond protects others — it is NOT insurance for the contractor; if the surety pays a claim, you must repay it.',
        "Workers' compensation insurance is mandatory if you have employees — and is required even with NO employees for five classifications: C-8 (concrete), C-20, C-22, C-39, and C-61/D-49. (SB 216 will extend this to ALL licensees, now phased to 2028.) CSLB will not renew a license that's out of compliance with workers' comp.",
        "Commercial General Liability (CGL) covers third-party bodily injury and property damage. It's state-mandated for LLC licensees ($1M/occurrence); most clients and GCs require it of everyone else.",
        'A mechanics lien lets an unpaid contractor, sub, or supplier put a claim on the improved property. The deadlines are strict — miss one and you lose the right.',
        'Preliminary Notice: serve it within 20 days of first furnishing labor or materials to preserve lien (and stop-notice) rights. Anyone without a direct contract with the owner especially needs it.',
        'Recording the Claim of Lien: if a Notice of Completion (or Cessation) is recorded, a subcontractor/supplier has 30 days and the direct (prime) contractor has 60 days; if no such notice is recorded, you have 90 days after completion.',
        'After recording a lien you must file a lawsuit to foreclose within 90 days, or the lien expires.',
        "A stop payment notice reaches the construction FUNDS (and on private jobs can be bonded); a mechanics lien reaches the PROPERTY. On PUBLIC works you cannot lien — your remedies are the stop payment notice and the project's payment bond."
      ],
      numbers: [
        { label: 'Contractor license bond', value: '$25,000', src: 'B&P §7071.6' },
        {
          label: 'Bond of qualifying individual',
          value: '$25,000 (waived if qualifier owns 10%+)',
          src: 'B&P §7071.9'
        },
        { label: 'LLC worker bond (additional)', value: '$100,000', src: 'B&P §7071.6.5' },
        {
          label: 'LLC commercial general liability',
          value: '$1,000,000 per occurrence',
          src: 'B&P §7071.19'
        },
        {
          label: 'Preliminary Notice',
          value: 'within 20 days of first furnishing',
          src: 'Civ. Code §8204'
        },
        {
          label: 'Record lien — after Notice of Completion',
          value: 'sub/supplier 30 days; direct contractor 60 days',
          src: 'Civ. Code §8412 (prime), §8414 (sub)'
        },
        {
          label: 'Record lien — no Notice of Completion',
          value: 'within 90 days of completion',
          src: 'Civ. Code §8412 / §8414'
        },
        {
          label: 'Foreclose on lien (file suit)',
          value: 'within 90 days of recording',
          src: 'Civ. Code §8460'
        },
        {
          label: 'Owner notify lien claimants after recording NOC',
          value: 'within 10 days',
          src: 'Civ. Code §8190'
        },
        { label: 'Small claims limit', value: '$12,500 individual / $6,250 entity', src: 'CCP §116.221' }
      ],
      math: [
        {
          prompt: 'You start furnishing materials on March 1. What is the last day to serve a Preliminary Notice to fully protect lien rights?',
          work: '20 days from first furnishing → March 1 + 20 days.',
          answer: 'March 21'
        },
        {
          prompt: 'No Notice of Completion is recorded. The job is completed June 1. Last day to record a Claim of Lien?',
          work: '90 days after completion → about August 30.',
          answer: '~90 days after June 1 (≈ Aug 30)'
        }
      ],
      questions: [
        {
          q: 'Every active California contractor license must carry a contractor license bond of:',
          choices: ['$12,500', '$15,000', '$25,000', '$100,000'],
          answer: 2,
          topic: 'contractor-license-bond-25k',
          freq: 'high',
          explain: 'Every active license carries a $25,000 contractor license bond (B&P §7071.6).'
        },
        {
          q: 'A contractor license bond primarily protects:',
          choices: [
            'The contractor who buys it',
            'The public/consumers and certain claimants',
            'The surety company',
            'The contractor’s employees only'
          ],
          answer: 1,
          topic: 'contractor-license-bond-25k',
          freq: 'high',
          explain: 'A bond protects others, not the contractor. It is not insurance for you.',
          why: '“The contractor” is the trap — the bond is not coverage for you. If the surety pays a claim, you have to repay it.'
        },
        {
          q: 'A $25,000 payout from your contractor license bond means:',
          choices: [
            'The surety absorbs the loss as insurance',
            'You must repay the surety what it paid out',
            'Your license is automatically canceled',
            'The claimant must repay the surety'
          ],
          answer: 1,
          topic: 'contractor-license-bond-25k',
          freq: 'high',
          explain: 'A bond is not insurance for you — if the surety pays a claim, you must repay it.',
          why: '“Surety absorbs it” confuses a bond with insurance. The surety pays the claimant, then comes after you.'
        },
        {
          q: 'The contractor license bond is required for:',
          choices: [
            'Only corporations and LLCs',
            'Only contractors with employees',
            'Every active license',
            'Only contractors doing public works'
          ],
          answer: 2,
          topic: 'contractor-license-bond-25k',
          freq: 'high',
          explain: 'The $25,000 contractor license bond applies to every active license, regardless of entity type or employees.'
        },
        {
          q: 'A Preliminary Notice must generally be served within how many days of first furnishing labor or materials?',
          choices: ['10 days', '20 days', '30 days', '90 days'],
          answer: 1,
          topic: 'preliminary-notice-20-day',
          freq: 'high',
          explain: 'Serve the Preliminary Notice within 20 days of first furnishing to preserve lien and stop-notice rights (Civ. Code §8204).'
        },
        {
          q: 'You first deliver materials to a job on April 5. What is the last day to serve a Preliminary Notice to fully protect your lien rights?',
          choices: ['April 15', 'April 20', 'April 25', 'May 5'],
          answer: 2,
          topic: 'preliminary-notice-20-day',
          freq: 'high',
          explain: '20 days from first furnishing: April 5 + 20 = April 25.',
          why: '“May 5” counts a full month, not 20 days. It’s 20 days from first furnishing, not 30.'
        },
        {
          q: 'A supplier’s first delivery to a project is October 10. The last day to serve a Preliminary Notice is:',
          choices: ['October 20', 'October 30', 'November 9', 'November 10'],
          answer: 1,
          topic: 'preliminary-notice-20-day',
          freq: 'high',
          explain: '20 days from October 10 = October 30.'
        },
        {
          q: 'Who especially needs to serve a Preliminary Notice to preserve lien rights?',
          choices: [
            'The property owner',
            'Anyone without a direct contract with the owner',
            'Only the general contractor',
            'The project architect'
          ],
          answer: 1,
          topic: 'preliminary-notice-20-day',
          freq: 'high',
          explain: 'Anyone without a direct contract with the owner — subs and suppliers especially — needs the Preliminary Notice to preserve rights.'
        },
        {
          q: 'If a Notice of Completion is recorded, a SUBCONTRACTOR must record its Claim of Lien within:',
          choices: ['10 days', '30 days', '60 days', '90 days'],
          answer: 1,
          topic: 'lien-recording-deadlines-30-60-90',
          freq: 'high',
          explain: 'After a Notice of Completion, subs/suppliers have 30 days (Civ. Code §8414); the direct contractor has 60 (§8412).'
        },
        {
          q: 'If a Notice of Completion is recorded, the DIRECT (prime) contractor must record its Claim of Lien within:',
          choices: ['30 days', '60 days', '90 days', '120 days'],
          answer: 1,
          topic: 'lien-recording-deadlines-30-60-90',
          freq: 'high',
          explain: 'After a Notice of Completion, the direct contractor has 60 days (Civ. Code §8412); subs/suppliers have 30 (§8414).',
          why: '“30 days” is the sub/supplier window — the prime gets 60.'
        },
        {
          q: 'No Notice of Completion or Cessation is recorded. A contractor must record a Claim of Lien within how many days of completion?',
          choices: ['30 days', '60 days', '90 days', '120 days'],
          answer: 2,
          topic: 'lien-recording-deadlines-30-60-90',
          freq: 'high',
          explain: 'With no Notice of Completion/Cessation recorded, the window is 90 days after completion.'
        },
        {
          q: 'An owner records a Notice of Completion on May 1. A supplier who was never paid must record its lien no later than:',
          choices: ['May 11', 'May 31', 'June 30', 'July 30'],
          answer: 1,
          topic: 'lien-recording-deadlines-30-60-90',
          freq: 'high',
          explain: 'A supplier (like a sub) has 30 days after a Notice of Completion: May 1 + 30 = May 31.',
          why: '“June 30” is the 60-day prime-contractor window. A supplier only gets 30 days once an NOC is recorded.'
        },
        {
          q: 'The three parties to a surety bond are:',
          choices: [
            'Buyer, seller, broker',
            'Principal, obligee, surety',
            'Owner, lender, contractor',
            'Plaintiff, defendant, judge'
          ],
          answer: 1,
          topic: 'surety-three-parties',
          freq: 'med',
          explain: 'Principal (contractor), obligee (the party protected), and surety (the bonding company).'
        },
        {
          q: 'On a contractor license bond, the contractor is the ____ and the bonding company is the ____.',
          choices: ['obligee; surety', 'principal; surety', 'surety; principal', 'obligee; principal'],
          answer: 1,
          topic: 'surety-three-parties',
          freq: 'med',
          explain: 'The contractor is the principal; the bonding company is the surety; the public/state protected is the obligee.',
          why: 'Don’t flip principal and surety — you are the principal who buys the bond; the bonding company is the surety.'
        },
        {
          q: 'After recording a mechanics lien, you must file a lawsuit to foreclose within:',
          choices: ['30 days', '90 days', '6 months', '1 year'],
          answer: 1,
          topic: 'foreclose-90-day',
          freq: 'med',
          explain: 'You must file the foreclosure action within 90 days of recording, or the lien expires (Civ. Code §8460).'
        },
        {
          q: 'Workers’ compensation insurance in California is:',
          choices: [
            'Optional for all contractors',
            'Required only for corporations',
            'Required if you have employees, and even without employees for C-8, C-20, C-22, C-39, and C-61/D-49',
            'Replaced by the license bond'
          ],
          answer: 2,
          topic: 'workers-comp-required',
          freq: 'med',
          explain: 'WC is mandatory with employees, and required for five classifications even with none. SB 216 will extend it to all licensees (phased to 2028).'
        },
        {
          q: 'A licensee has no employees. Which classification still requires workers’ comp coverage?',
          choices: ['B (General Building)', 'C-8 (Concrete)', 'C-10 (Electrical)', 'C-36 (Plumbing)'],
          answer: 1,
          topic: 'workers-comp-required',
          freq: 'med',
          explain: 'C-8 is one of five classes (C-8, C-20, C-22, C-39, C-61/D-49) needing WC even with no employees. SB 216 will extend the rule to all licensees by 2028.',
          why: 'C-10 and C-36 aren’t on the five-classification list — only C-8, C-20, C-22, C-39, and C-61/D-49 require WC with zero employees today.'
        },
        {
          q: 'A mechanics lien reaches the PROPERTY; a stop payment notice instead reaches the:',
          choices: ['Contractor’s license', 'Construction funds/money', 'Building permit', 'Surety bond'],
          answer: 1,
          topic: 'stop-notice-vs-lien',
          freq: 'med',
          explain: 'A stop payment notice targets the unpaid construction funds; the lien targets the property.'
        },
        {
          q: 'The $25,000 Bond of Qualifying Individual (RMO/RME) is waived when:',
          choices: [
            'The company has no employees',
            'The qualifier owns 10% or more of the company',
            'The license is inactive',
            'The company also carries CGL'
          ],
          answer: 1,
          topic: 'qualifying-individual-bond',
          freq: 'med',
          explain: 'The bond of qualifying individual is generally $25,000, but is waived if the qualifier (RMO/RME) owns 10%+ of the company (B&P §7071.9).'
        },
        {
          q: 'Commercial General Liability (CGL) insurance mainly covers:',
          choices: [
            'Employee injuries',
            'Third-party bodily injury and property damage',
            'The contractor’s own tools',
            'Unpaid invoices'
          ],
          answer: 1,
          topic: 'cgl-coverage',
          freq: 'med',
          explain: 'CGL covers third-party bodily injury and property damage; employee injuries fall under workers’ comp.',
          why: '“Employee injuries” is workers’ comp, not CGL. CGL is for third parties.'
        },
        {
          q: 'In addition to the $25,000 license bond, an LLC contractor must carry a worker bond of:',
          choices: ['$25,000', '$50,000', '$100,000', '$1,000,000'],
          answer: 2,
          topic: 'llc-bonds-100k',
          freq: 'low',
          explain: 'LLCs must carry an additional $100,000 worker bond (B&P §7071.6.5) on top of the $25,000 license bond.',
          why: '$1,000,000 is the LLC’s CGL requirement, not the worker bond. The worker bond is $100,000.'
        },
        {
          q: 'The state-mandated Commercial General Liability coverage for an LLC licensee is:',
          choices: [
            '$100,000 per occurrence',
            '$250,000 per occurrence',
            '$500,000 per occurrence',
            '$1,000,000 per occurrence'
          ],
          answer: 3,
          topic: 'llc-bonds-100k',
          freq: 'low',
          explain: 'LLC licensees must carry $1,000,000 per occurrence in CGL (B&P §7071.19).'
        },
        {
          q: 'The most a California small claims court can generally award an individual is:',
          choices: ['$5,000', '$10,000', '$12,500', '$25,000'],
          answer: 2,
          topic: 'small-claims-limit',
          freq: 'low',
          explain: 'The small claims limit is $12,500 for an individual (CCP §116.221).'
        },
        {
          q: 'The California small claims limit for a business or entity is:',
          choices: ['$2,500', '$6,250', '$12,500', '$25,000'],
          answer: 1,
          topic: 'small-claims-limit',
          freq: 'low',
          explain: 'A business/entity is capped at $6,250 in small claims; an individual can seek up to $12,500 (CCP §116.221).',
          why: '$12,500 is the individual limit — an entity is held to half that, $6,250.'
        },
        {
          q: 'After recording a Notice of Completion, the owner must notify lien claimants within:',
          choices: ['5 days', '10 days', '20 days', '30 days'],
          answer: 1,
          topic: 'owner-notify-10-day',
          freq: 'low',
          explain: 'The owner must notify lien claimants within 10 days of recording the Notice of Completion (Civ. Code §8190).'
        },
        {
          q: 'An owner records a Notice of Completion on July 1. The last day to notify lien claimants is:',
          choices: ['July 6', 'July 11', 'July 21', 'July 31'],
          answer: 1,
          topic: 'owner-notify-10-day',
          freq: 'low',
          explain: 'The owner has 10 days to notify claimants: July 1 + 10 = July 11 (Civ. Code §8190).',
          why: '“July 31” confuses this 10-day owner-notice with the 30-day sub lien window. It’s only 10 days.'
        }
      ],
      topics: {
        'contractor-license-bond-25k': { freq: 'high', label: 'Contractor license bond ($25k)' },
        'preliminary-notice-20-day': { freq: 'high', label: 'Preliminary Notice (20-day)' },
        'lien-recording-deadlines-30-60-90': { freq: 'high', label: 'Lien recording deadlines (30/60/90)' },
        'surety-three-parties': { freq: 'med', label: 'Surety bond — three parties' },
        'foreclose-90-day': { freq: 'med', label: 'Foreclose on lien (90-day)' },
        'workers-comp-required': { freq: 'med', label: "Workers' comp required" },
        'stop-notice-vs-lien': { freq: 'med', label: 'Stop notice vs. lien' },
        'qualifying-individual-bond': { freq: 'med', label: 'Bond of qualifying individual' },
        'cgl-coverage': { freq: 'med', label: 'CGL coverage' },
        'llc-bonds-100k': { freq: 'low', label: 'LLC bonds ($100k / $1M)' },
        'small-claims-limit': { freq: 'low', label: 'Small claims limit' },
        'owner-notify-10-day': { freq: 'low', label: 'Owner notifies claimants (10-day)' }
      }
    },
    {
      id: 'public-works',
      title: 'Public Works',
      weight: 5,
      intro: 'The lightest section, but easy points if you know the handful of rules that make government jobs different from private ones: prevailing wage, registration, certified payroll, and bonds.',
      key: [
        'Public works = construction paid for with public funds. Workers must be paid the DIR-set prevailing wage for their craft and area — often more than the private-market rate.',
        'Prevailing wage is the basic hourly rate PLUS fringe benefits set by the Director of Industrial Relations for that craft and locality.',
        'Contractors and subs on most public works must be registered with the California Department of Industrial Relations (DIR) to bid and work.',
        "Certified payroll records must be submitted (electronically, via the DIR's eCPR system) showing each worker, hours, classification, and the wage paid.",
        'Public works use the apprenticeship system, and prevailing-wage enforcement carries penalties for underpayment.',
        'A payment bond is required on public works contracts over $25,000 to protect subcontractors and suppliers.',
        'No mechanics liens on public projects — payment is protected by the payment bond and the stop payment notice instead.',
        'Prevailing-wage requirements generally attach to public works over $1,000.'
      ],
      numbers: [
        { label: 'Prevailing wage applies', value: 'public works over $1,000', src: 'CA Labor Code §1771' },
        { label: 'Prevailing wage =', value: 'basic hourly rate + fringe benefits', src: 'DIR' },
        {
          label: 'DIR contractor registration',
          value: 'required to bid/work most public works',
          src: 'CA Labor Code §1725.5'
        },
        {
          label: 'Payment bond required',
          value: 'public works contracts over $25,000',
          src: 'Civ. Code §9550'
        },
        { label: 'Certified payroll', value: 'submitted via DIR eCPR', src: 'CA Labor Code §1776 / DIR' }
      ],
      math: [],
      questions: [
        {
          q: 'On a public works project, workers must be paid:',
          choices: [
            'Minimum wage',
            'The DIR prevailing wage for the craft and area',
            'Whatever the contract sets',
            'The federal poverty wage'
          ],
          answer: 1,
          topic: 'prevailing-wage-definition',
          freq: 'high',
          explain: 'Public works require the prevailing wage set by the DIR for that craft and locality.'
        },
        {
          q: 'Prevailing wage is best described as:',
          choices: [
            'The basic hourly rate only',
            'The basic hourly rate plus fringe benefits',
            'Minimum wage plus tips',
            'Whatever the union charges'
          ],
          answer: 1,
          topic: 'prevailing-wage-definition',
          freq: 'high',
          explain: 'Prevailing wage combines a basic hourly rate and fringe benefits set by the DIR.',
          why: 'It is tempting to pick "basic hourly rate only," but the fringe-benefit piece is part of the required prevailing wage — leaving it out underpays the worker.'
        },
        {
          q: 'Who sets the prevailing wage rate for a given craft and locality on public works?',
          choices: ['The contractor', 'The CSLB', 'The Director of Industrial Relations (DIR)', 'The project owner'],
          answer: 2,
          topic: 'prevailing-wage-definition',
          freq: 'high',
          explain: 'The Director of Industrial Relations sets the prevailing wage (basic hourly rate plus fringe benefits) for each craft and area.'
        },
        {
          q: 'Prevailing wage requirements generally apply to public works exceeding:',
          choices: ['$500', '$1,000', '$25,000', '$100,000'],
          answer: 1,
          topic: 'prevailing-wage-1000-threshold',
          freq: 'high',
          explain: 'Prevailing wage generally attaches to public works over $1,000.'
        },
        {
          q: 'A small public works job comes in at $900. Does prevailing wage generally apply?',
          choices: [
            'Yes, prevailing wage applies to every public job',
            'No, the threshold is public works over $1,000',
            'Only if the DIR audits it',
            'Only on federal jobs'
          ],
          answer: 1,
          topic: 'prevailing-wage-1000-threshold',
          freq: 'high',
          explain: 'Prevailing-wage requirements generally attach to public works over $1,000, so a $900 job falls under that threshold.',
          why: 'The trap is assuming "public job = prevailing wage always." The $1,000 threshold is the line to remember.'
        },
        {
          q: 'To bid and work most California public works, a contractor must be registered with:',
          choices: [
            'The CSLB only',
            'The Department of Industrial Relations (DIR)',
            'The IRS',
            'The local chamber of commerce'
          ],
          answer: 1,
          topic: 'dir-registration',
          freq: 'med',
          explain: 'DIR registration is required to bid and work most public works projects.',
          why: 'Your CSLB license alone is not enough — public works add a separate DIR registration requirement to bid and work.'
        },
        {
          q: 'DIR contractor registration is required in order to:',
          choices: [
            'Pull any building permit',
            'Bid and work most public works projects',
            'Hire employees',
            'Buy materials wholesale'
          ],
          answer: 1,
          topic: 'dir-registration',
          freq: 'med',
          explain: 'Registration with the DIR is required to bid and work most public works projects.'
        },
        {
          q: 'Documentation showing each worker’s hours, classification, and wage on a public job is called:',
          choices: ['A balance sheet', 'Certified payroll submitted via DIR eCPR', 'A Preliminary Notice', 'A change order'],
          answer: 1,
          topic: 'certified-payroll-ecpr',
          freq: 'med',
          explain: 'Certified payroll records are submitted electronically through the DIR eCPR system on public works.'
        },
        {
          q: 'A payment bond is generally required on public works contracts over:',
          choices: ['$1,000', '$5,000', '$25,000', '$100,000'],
          answer: 2,
          topic: 'payment-bond-25k',
          freq: 'med',
          explain: 'Public works contracts over $25,000 require a payment bond protecting subs and suppliers.',
          why: 'Do not confuse this with the $1,000 prevailing-wage threshold. The payment-bond line is $25,000.'
        },
        {
          q: 'An unpaid subcontractor on a public works project should pursue:',
          choices: ['A mechanics lien', 'The payment bond and a stop payment notice', 'Foreclosure', 'Small claims only'],
          answer: 1,
          topic: 'no-liens-on-public-works',
          freq: 'med',
          explain: 'Public property can’t be liened; the payment bond and stop payment notice are the remedies.',
          why: 'A mechanics lien is the private-job remedy. You cannot lien public property, so the bond and stop payment notice take its place.'
        },
        {
          q: 'Public works projects rely on which system to train workers at lower rates:',
          choices: ['Internships', 'State-approved apprenticeship', 'Temp agencies', 'Independent contractors'],
          answer: 1,
          topic: 'apprenticeship-system',
          freq: 'low',
          explain: 'Public works use the state apprenticeship system, with apprentices paid a set percentage of the journey rate.'
        }
      ],
      topics: {
        'prevailing-wage-definition': { freq: 'high', label: 'Prevailing wage: what it is' },
        'prevailing-wage-1000-threshold': { freq: 'high', label: 'Prevailing wage $1,000 threshold' },
        'dir-registration': { freq: 'med', label: 'DIR contractor registration' },
        'certified-payroll-ecpr': { freq: 'med', label: 'Certified payroll via eCPR' },
        'payment-bond-25k': { freq: 'med', label: 'Payment bond over $25,000' },
        'no-liens-on-public-works': { freq: 'med', label: 'No mechanics liens on public works' },
        'apprenticeship-system': { freq: 'low', label: 'Apprenticeship system' }
      }
    }
  ]
};
