const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)

const dhp = [
    {
      shortcode: 'S12000033',
      phone: '0300 200 292 ',
      email: 'benefits@aberdeencity.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:",
      weblink: 'https://www.aberdeencity.gov.uk/services/benefits-and-advice/discretionary-housing-payments',
      pdf: '5166/Aberdeen_City_Council.pdf'
    },
    {
      shortcode: 'S12000034',
      phone: '03456 08 1200',
      email: 'asat@aberdeenshire.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nAberdeenshire Support and Advice Team\nPO Box 18533\nInverurie AB51 5WX\n\nIt should take approximately 30 minutes.",
      weblink: 'https://www.aberdeenshire.gov.uk/benefits-and-grants/council-tax-benefit/discretionary-housing-payments/',
      pdf: '5172/Aberdeenshire_Council.pdf'
    },
    {
      shortcode: 'E07000223',
      phone: '01273 263 444',
      email: 'revsbens@adur-worthing.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nFinancial Services\nTown Hall\nChapel Road\nWorthing\nWest Sussex BN11 1HB\n\nIt should take approximately 30 minutes.",
      weblink: 'https://www.adur-worthing.gov.uk/benefits/benefits-explained/discretionary-housing-payments/',
      pdf: '5178/Adur_Council.pdf'
    },
    {
      shortcode: 'E07000026',
      phone: '0303 123 1702',
      email: 'hben.cusserv@allerdale.gov.uk',
      text: "",
      weblink: 'https://www.allerdale.gov.uk/en/benefits/discretionary-housing-payment/',
      pdf: '7272/Allerdale_Council.doc'
    },
    {
      shortcode: 'E07000032',
      phone: '01773 841 470',
      email: 'benefits@ambervalley.gov.uk',
      text: "",
      weblink: 'https://www.ambervalley.gov.uk/benefits/application-forms/',
      pdf: '/'
    },
    {
      shortcode: 'S12000041',
      phone: '03452 777 778',
      email: 'revenquiry@angus.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nPO box 14\nInvertay house\nMonifieth\nDundee, DD5 4WA   \n\nOr in person to:\nArbroath benefit enquiry Office        \nForfar Benefit Enquiry office\nMontrose benefit enquiry Office\n\nIt should take approximately 30 minutes. If you require any assistance in completing the form please call 0800252056.",
      weblink: 'https://www.angus.gov.uk/benefits_and_money_advice/apply_for_a_discretionary_housing_payment',
      pdf: '5194/Angus.pdf'
    },
    {
      shortcode: 'S12000035',
      phone: '01546 605 512',
      email: 'benefitsgeneralenquiries@argyll-bute.gov.uk',
      text: "",
      weblink: 'http://www.argyll-bute.gov.uk/council-and-government/discretionary-housing-payments',
      pdf: '7273/Argyll_and_bute_Full_DHP.pdf'
    },
    {
      shortcode: 'E07000224',
      phone: '01903 737 753',
      email: 'revenues.benefits@arun.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nRevenues and Benefits\nArun District Council\nMaltravers Road\nWest Susses, BN17 5LF\n\nIt should take approximately 30 minutes. If you need any assistance in completing the form please call 01903737753 or you go in person to the Civic Centre in Littlehampton or Bognor Regis Town Hall.",
      weblink: 'http://www.arun.gov.uk/discretionary-housing-payments',
      pdf: '5204/Arun_District_.pdf'
    },
    {
      shortcode: 'E07000170',
      phone: '01623 450 000',
      email: 'revenues@ashfield.gov.uk',
      text: "",
      weblink: 'http://www.ashfield.gov.uk/residents/benefits-council-tax-support/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000105',
      phone: '01233 331 111',
      email: 'customer.care@ashford.gov.uk',
      text: "",
      weblink: 'http://www.ashford.gov.uk/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01296 585 618',
      email: 'benefits@aylesburyvaledc.gov.uk',
      text: "",
      weblink: 'http://www.aylesburyvaledc.gov.uk/housing-benefit',
      pdf: '/'
    },
    {
      shortcode: 'E07000200',
      phone: '0300 123 4000',
      email: 'housingsolutions@baberghmidsuffolk.gov.uk',
      text: "",
      weblink: 'http://www.babergh.gov.uk/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E09000002',
      phone: '020 8227 2970',
      email: 'benefits@lbbd.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nRevenues and Benefits,\nPO Box 48,\nDagenham, RM10 7DE\n\nCall the Housing Advice Team on 020 8724 8823 if you need help",
      weblink: 'https://www.lbbd.gov.uk/residents/benefits-and-support/housing-benefit/discretionary-housing-payments/who-can-claim-and-how-to-claim/',
      pdf: '7510/Barking_and_Dagenham.pdf'
    },
    {
      shortcode: 'E08000016',
      phone: '01226 787 787',
      email: 'online@barnsley.gov.uk',
      text: "",
      weblink: 'https://www.barnsley.gov.uk/services/advice-benefits-and-council-tax/housing-benefit/extra-help-to-pay-your-rent-dhp/',
      pdf: '/'
    },
    {
      shortcode: 'E07000066',
      phone: '01268 533 333',
      email: 'customerservices@basildon.gov.uk',
      text: "",
      weblink: 'http://www.basildon.gov.uk/article/5423/Benefits---Discretionary-And-Exceptional-Hardship-Payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000084',
      phone: '01256 844 844',
      email: 'benefits@basingstoke.gov.uk',
      text: "",
      weblink: 'http://www.basingstoke.gov.uk/benefitadvice#elem_32027',
      pdf: '/'
    },
    {
      shortcode: 'E07000171',
      phone: '01909 533 710',
      email: 'customer.services@bassetlaw.gov.uk',
      text: "",
      weblink: 'http://www.bassetlaw.gov.uk/benefits/additional-rent-council-tax-help/',
      pdf: '/'
    },
    {
      shortcode: 'E06000022',
      phone: '01225 477 277',
      email: 'welfare_support@bathnes.gov.uk',
      text: "",
      weblink: 'http://www.bathnes.gov.uk/services/council-tax-benefits-and-grants/benefits/discretionary-housing-payments',
      pdf: '7412/Bathnes.pdf'
    },
    {
      shortcode: 'E06000055',
      phone: '01234 718 097',
      email: 'customerservices@bedford.gov.uk',
      text: "",
      weblink: 'https://www.bedford.gov.uk/benefits-and-support/benefits-council-tax-support/discretionary-housing-payments/',
      pdf: '7413/Bedford_Borough.pdf'
    },
    {
      shortcode: 'E08000025',
      phone: '0121 464 7000',
      email: 'ptmailbox@birmingham.gov.uk',
      text: "",
      weblink: 'http://www.birmingham.gov.uk/dhp',
      pdf: '/'
    },
    {
      shortcode: 'E07000129',
      phone: '0116 272 7510',
      email: 'benefits@blaby.gov.uk',
      text: "",
      weblink: 'https://www.blaby.gov.uk/benefits-and-support/extra-help-and-support/discretionary-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000008',
      phone: '01254 585 585',
      email: 'benefits@blackburn.gov.uk',
      text: "",
      weblink: 'https://mybwd.blackburn.gov.uk/Pages/Form%20Pages/DiscretionaryHousingPaymentApplication.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000009',
      phone: '0800 6940 100',
      email: 'discretionarysupport@blackpool.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'W06000019',
      phone: '01495 353 398',
      email: 'benefits@blaenau-gwent.gov.uk',
      text: "",
      weblink: 'http://www.blaenau-gwent.gov.uk/en/resident/housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000033',
      phone: '01246 242 436',
      email: 'benefits@bolsover.gov.uk',
      text: "",
      weblink: 'https://www.bolsover.gov.uk/index.php/resident/24-resident/benefits-council-tax-support/74-resident-discretionary-housing-payments',
      pdf: '7416/Bolsover_District.doc'
    },
    {
      shortcode: 'E08000001',
      phone: '01204 331 590',
      email: 'housing.benefits@bolton.gov.uk',
      text: "",
      weblink: 'http://www.bolton.gov.uk/website/pages/Discretionaryhousingpayments.aspx',
      pdf: '7417/Bolton_Council.pdf'
    },
    {
      shortcode: 'E07000146',
      phone: '01553 616 200',
      email: '',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nBorough Council of King's Lynn & West Norfolk\nBenefits department\nPO BOX 26\nNorfolk, PE30 1BR\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.west-norfolk.gov.uk/default.aspx?page=24371',
      pdf: '5300/King\'s_Lynn.pdf'
    },
    {
      shortcode: 'E07000027',
      phone: '01229 404 242',
      email: 'benefits@barrowbc.gov.uk',
      text: "",
      weblink: 'http://www.barrowbc.gov.uk/residents/council-tax/council-tax-housing-benefit/',
      pdf: '7410/Barrow_in_Furness.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0345 034 4569',
      email: 'svpp@poole.gov.uk',
      text: "",
      weblink: 'https://www.poole.gov.uk/benefits-and-financial-help/apply-for-benefits/discretionary-housing-payment/',
      pdf: '/'
    },
    {
      shortcode: 'E07000136',
      phone: '01205 314 202',
      email: 'revs@boston.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nHousing Benefits Office\nMunicipal Buildings\nWest Street, Boston\nLincolnshire, PE21 8QR\n\nIf you need assistance in completing the form please seek advice at the council offices.",
      weblink: 'https://www.mybostonuk.com/benefits-council-tax/benefits-council-tax-support-2/discretionary-housing-payments/',
      pdf: '7418/Boston_borough_council.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01202 451 592',
      email: 'benefits.bournemouth@bcpcouncil.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nBenefits Section\nTown Hall\nSt Stephen's Road\nBournemouth BH2 6EB\n\nIf you do not hear from the council after two weeks, follow up by calling 01202 451 592.",
      weblink: 'http://www.bournemouth.gov.uk/BenefitsSupport/HousingBenefit/DiscretionaryPayments.aspx',
      pdf: '7419/Bournemouth_Borough.pdf'
    },
    {
      shortcode: 'E06000036',
      phone: '01344 352 010',
      email: 'benefits@bracknell-forest.gov.uk',
      text: "To apply for a DHP please complete this 11 page form and return it to:\n\nBenefits Service\nTime Square\nBracknell Berkshire\nRG12 1HJ\n\nIt should take approximately 60 minutes.",
      weblink: 'https://www.bracknell-forest.gov.uk/benefits/housing-benefit/discretionary-housing-payment',
      pdf: '7420/Bracknell_Forest_Council.pdf'
    },
    {
      shortcode: 'E07000067',
      phone: '01376 557 852',
      email: 'benefits@braintree.gov.uk',
      text: "",
      weblink: 'https://www.braintree.gov.uk/faqs/faq/148/can_i_apply_for_discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000143',
      phone: '01362 656 870',
      email: 'benefits@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E07000068',
      phone: '01277 312 500',
      email: 'benefit@brentwood.gov.uk ',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nBrentwood Borough Council\nRevenues & Benefits Service\nTown Hall\nIngrave Road\nBrentwood, CM15 8AY\n\nYou can also email your completed form to benefit@brentwood.gov.uk.\n\nIt should take approximately 30 minutes.",
      weblink: 'http://www.brentwood.gov.uk/index.php?cid=2400',
      pdf: '7422/Brentwood.docx'
    },
    {
      shortcode: 'W06000013',
      phone: '01656 643 396',
      email: 'benefits@bridgend.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBridgend County Borough Council\nPO box 107\nBridgend\nCF31 4WB\n\nIt should take approximately 45 minutes.",
      weblink: 'https://www.bridgend.gov.uk/residents/benefits-and-support/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000043',
      phone: '01273 293 117',
      email: 'housing.benefits@brighton-hove.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nRevenue and Benefits\nBrighton & Hove City Council\nPO Box 2929\nBrighton BN1 1PS\n\nOr email it to DHAT@brighton-hove.gov.uk\n\nIf you do not hear from the council after two weeks, follow up by calling 01273 293 117.",
      weblink: 'https://new.brighton-hove.gov.uk/benefits/help-and-support/apply-discretionary-payment',
      pdf: '7424/Brighton_and_Hove.pdf'
    },
    {
      shortcode: 'E06000023',
      phone: '0117 922 2300',
      email: 'benefits@bristol.gov.uk',
      text: "",
      weblink: 'http://www.bristol.gov.uk/page/financial-help-and-benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000144',
      phone: '01603 430 602',
      email: 'benefits@broadland.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Department\nBroadland District Council\nThorpe Lodge\nYarmouth Road\nNorwich, NR7 0DU\n\nIt should take approximately 45 minutes. If you need assistance in completing the form please call 01603430473, 460512, 430405 or email benefits@broadland.gov.uk.",
      weblink: 'https://www.broadland.gov.uk/info/200201/help_managing_your_money',
      pdf: '7425/Broadland_District.pdf'
    },
    {
      shortcode: 'E07000234',
      phone: '01527 881 213',
      email: 'benefits@bromsgrove.gov.uk',
      text: "",
      weblink: '"http://www.bromsgrove.gov.uk/money,-education-skills/benefits-help/extra-help-on-top-of-housing-benefit.aspx"',
      pdf: '/'
    },
    {
      shortcode: 'E07000095',
      phone: '01992 785 503',
      email: 'benefits@broxbourne.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E07000172',
      phone: '0115 917 7777',
      email: 'customerservices@broxtowe.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nQuality & Control Section\nDeputy Chief Executive���s Department\nBroxtowe Borough Council\nFoster Avenue\nBeeston\nNottingham, NG9 1AB\n\nIt should take approximately 60 minutes to compete the form.",
      weblink: 'https://www.broxtowe.gov.uk/for-you/benefits-grants/housing-benefits/discretionary-housing-payment/',
      pdf: '7427/Broxtowe_Borough.pdf'
    },
    {
      shortcode: 'E07000117',
      phone: '01282 425 011',
      email: 'benefits@burnley.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nContact Burnley\n9 Parker Lane\nBurnley BB11 2DS\n\nIf you do not hear from the council after two weeks, follow up by calling 01282 425 011.",
      weblink: 'https://www.burnley.gov.uk/residents/council-tax-benefits/benefits-and-how-apply/discretionary-housing-payments',
      pdf: '7428/Burnley_Borough.pdf'
    },
    {
      shortcode: 'E08000002',
      phone: '0161 253 7030',
      email: 'burysupportfund@bury.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nBury Council\nPO Box 68\nManchester\nM26 2YJ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.bury.gov.uk/index.aspx?articleid=10992',
      pdf: '7430/Bury_Council.pdf'
    },
    {
      shortcode: 'W06000018',
      phone: '01443 866 567',
      email: 'benefits@caerphilly.gov.uk',
      text: "To apply for a DHP please complete this form and return it to:\n\nCaerphilly County Borough Council\nPenalta House\nTredomen Park\nYstrad Mynach\nHengoed, CF82 7PG",
      weblink: 'http://www.caerphilly.gov.uk/Services/Housing-benefits/Discretionary-housing-payments',
      pdf: '7431/DHP_New_Application_Form_-_Caerphilly_Nov_2019_rev_1.2.pdf'
    },
    {
      shortcode: 'E08000033',
      phone: '01422 288 003',
      email: 'benefits.unit@calderdale.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it:\n\nBy Email to welfare.assistance@calderdale.gov.uk\nBy post to The revenues and benefits service, PO Box 51, Halifax, HX1 1TP\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.calderdale.gov.uk/siteinfo/faqs/answers.jsp?id=7681&start=7681',
      pdf: '7432/Calderdale_Council.pdf'
    },
    {
      shortcode: 'E07000008',
      phone: '01223 457 775',
      email: 'benefits@cambridge.gov.uk',
      text: "Apply using the email address below, explaining your circumstances and why you think you need a discretionary housing payment. \n\nRemember to tell the council how to contact you. ",
      weblink: 'https://www.cambridge.gov.uk/housing-benefit',
      pdf: '/'
    },
    {
      shortcode: 'E07000192',
      phone: '01543 464 292',
      email: 'customerservices@cannockchasedc.gov.uk',
      text: "",
      weblink: 'http://www.cannockchasedc.gov.uk/do-it-online/request-it/discretionary-housing-payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000106',
      phone: '01227 862 300',
      email: '',
      text: "",
      weblink: 'https://www.canterbury.gov.uk/advice-and-benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'W06000015',
      phone: '029 2087 2087',
      email: 'benefits@cardiff.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 10-page form. \n\nFor help completing your form, make an appointment at a <a href=\"https://www.cardiff.gov.uk/ENG/resident/hubs-and-housing-offices/Pages/default.aspx\">Cardiff Council hub or housing office</a>.",
      weblink: 'https://www.cardiff.gov.uk/ENG/resident/Benefits-and-Grants/Housing-Benefit/Discretionary-Housing-Payments/Pages/default.aspx',
      pdf: '7434/Cardiff_Council.pdf'
    },
    {
      shortcode: 'E07000028',
      phone: '01228 817 000',
      email: 'customerservices@carlisle.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it by post or in person to:\n\nBenefits Services\nCarlisle City Council\nCivic Centre\nCarlisle, CA3 8QG",
      weblink: 'http://www.carlisle.gov.uk/Residents/Benefits-and-support/Housing-Benefit/Discretionary-housing-payments',
      pdf: '7435/Carlisle_City.doc'
    },
    {
      shortcode: 'W06000010',
      phone: '01554 742 100',
      email: 'housing.benefits@carmarthenshire.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nThe Housing Benefit Section\n3rd floor\nTy Elwyn\nLlanelli, SA15 3AP\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.carmarthenshire.gov.wales/home/residents/benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '7436/Carmarthenshire.pdf'
    },
    {
      shortcode: 'E07000069',
      phone: '01268 882 200',
      email: 'benefits@castlepoint.gov.uk',
      text: "To apply for a DHP please complete this form and return it to:\n\nHousing @ Communities\nCastle Point Borough Council\nPO Box 15\nBenfleet\nEssex, SS7 1AY",
      weblink: 'https://www.castlepoint.gov.uk/discretionary-housing-payments',
      pdf: '7437/Castle_Point.pdf'
    },
    {
      shortcode: 'E06000056',
      phone: '0300 300 8306',
      email: 'customer.services@centralbedfordshire.gov.uk',
      text: "",
      weblink: 'http://www.centralbedfordshire.gov.uk/benefits/appeals/discretionary-housing.aspx',
      pdf: '7438/Central_Bedfordshire.pdf'
    },
    {
      shortcode: 'W06000008',
      phone: '01970 633252',
      email: 'revenues@ceredigion.gov.uk',
      text: "To apply for a DHP please complete the form and return it to:\n\nHousing Benefit Section, Canolfan Rheidol, Rhodfa Padarn, Llanbadarn Fawr, SY23 3UE",
      weblink: 'https://www.ceredigion.gov.uk/English/Resident/benefits/hbct/Pages/Discretionary-Housing-Payments-%28DHPs%29.aspx',
      pdf: '7439/Ceredigion.docx'
    },
    {
      shortcode: 'E07000130',
      phone: '0845 609 1258',
      email: 'charnwood.benefits@secure.capita.co.uk',
      text: "To apply for a DHP please complete this form and return it:\n\nBy post - Charnwood Council, Benefits Dept, P O Box 165, Erith,DA8 9EW\nIn Person - Charnwood Council, Benefits Department, Southfields, Loughborough, LE11 2TU\n",
      weblink: 'http://www.charnwood.gov.uk/pages/discretionaryhousingpayments',
      pdf: '7440/Charnwood.pdf'
    },
    {
      shortcode: 'E07000070',
      phone: '01245 606400',
      email: 'benefits.email@chelmsford.gov.uk',
      text: "To apply for a DHP please complete this form and return it by post to:\n\nBenefits Section, Civic Centre, Duke street, Chelmsford, CM1 1JE \n\nOr in person to:\n\nCustomer Service Centre, Civic Centre, Duke Street\nParkside Community Hub, Melbourne Avenue, CM1 2DX \nChelmsford Central Library, Market Road",
      weblink: 'https://www.chelmsford.gov.uk/benefits/apply-for-discretionary-housing-payments/apply-for-a-discretionary-housing-payment/',
      pdf: '7441/Chelmsford.pdf'
    },
    {
      shortcode: 'E07000078',
      phone: '01242 264 341',
      email: 'benefits@cheltenham.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it by post or in person to:\n\nBenefit Service\nCheltenham Borough Council\nP.O. Box 10\nMunicipal Offices\nPromenade\nCheltenham, GL50 1PW",
      weblink: 'http://www.cheltenham.gov.uk/info/200008/benefits/306/my_benefit_doesnt_meet_my_full_rent_is_there_any_extra_help',
      pdf: '7442/Cheltenham.pdf'
    },
    {
      shortcode: 'E07000177',
      phone: '01295 227 002',
      email: 'benefits@cherwell-dc.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nCherwell District Council \nBodicote House\nBodicote\nBanbury, OX15 4AA \n\nIt should take approximately 15 minutes to complete the form. If you need assistance in completing your form please call 01295 227002 to arrange an appointment.",
      weblink: 'https://www.cherwell.gov.uk/info/27/housing-benefits/33/',
      pdf: '7443/Cherwell.pdf'
    },
    {
      shortcode: 'E06000049',
      phone: '0300 123 5013',
      email: 'benefits@cheshireeast.gov.uk',
      text: "",
      weblink: 'https://www.cheshireeast.gov.uk/benefits_housing_council_tax/discretionary-housing-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000050',
      phone: '0300 123 7021',
      email: 'benefits@cheshirewestandchester.gov.uk',
      text: "",
      weblink: 'http://www.cheshirewestandchester.gov.uk/residents/benefits_and_grants/housing_benefit/discretionary_housing_payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000034',
      phone: '01246 345 484',
      email: 'benefits@chesterfield.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nChesterfield Borough Council \nBenefits Section\nCustomer Service Centre\nPO Box 100\nChesterfield S40 1SN\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.chesterfield.gov.uk/benefits-and-advice/housing-benefit-and-council-tax-support/discretionary-housing-payments.aspx',
      pdf: '7446/Chesterfield.pdf'
    },
    {
      shortcode: 'E07000225',
      phone: '01243 534 509',
      email: 'benefits@chichester.gov.uk',
      text: "",
      weblink: 'http://www.chichester.gov.uk/benefitforms',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01494 732 077',
      email: 'benefits@chilternandsouthbucks.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nRevenues and Benefits Service\nChiltern District Council\nKing George V house\nKing George V Road\nAmersham, HP6 5AW",
      weblink: 'http://www.chiltern.gov.uk/article/7292/Benefits-is-your-benefit-still-not-enough',
      pdf: '7447/Chiltern.pdf'
    },
    {
      shortcode: 'E07000118',
      phone: '01257 515 151',
      email: 'contact@chorley.gov.uk ',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\nChorley Council\nPO Box 13\nChorley\nPR7 1AR\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://chorley.gov.uk/Pages/AtoZ/Council%20Tax%20Support%20and%20Housing%20Benefit.aspx',
      pdf: '7448/Chorley.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0845 034 4569',
      email: 'svpp@poole.gov.uk',
      text: "",
      weblink: 'https://www.christchurch.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment-apply.aspx',
      pdf: '/'
    },
    {
      shortcode: 'W06000011',
      phone: '01792 635 353',
      email: 'benefts@swansea.gov.uk',
      text: "",
      weblink: 'http://www.swansea.gov.uk/dhp',
      pdf: '7287/Swansea_Application_for_Discretionary_Housing_Payments.pdf'
    },
    {
      shortcode: 'E08000032',
      phone: '01274 432 772',
      email: 'benefits@bradford.gov.uk',
      text: "",
      weblink: 'https://www.bradford.gov.uk/benefits/applying-for-benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000138',
      phone: '01522 873 355',
      email: 'benefits@lincoln.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nCity of Lincoln & North Kesteven District Council Shared Services\nRevenues & Benefits Office\nPO Box 1257\nLincoln LN5 7PQ\n\nIf you do not hear from the council after two weeks, follow up by calling 01522 873 355.",
      weblink: 'https://www.lincoln.gov.uk/housing-council-tax/apply-discretionary-housing-payment/1',
      pdf: '7449/City_of_lincoln.pdf'
    },
    {
      shortcode: 'E09000001',
      phone: '020 7332 3937',
      email: 'benefits@cityoflondon.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Section\nBarbican Estate Office\n3 lauderdale Place\nLondon, EC2Y 8EN\n\nIt should take approximately 30 minutes to complete the form. If you need assistance in completing your form please contact 020 7332 3937 or benefits@cityoflondon.gov.uk.",
      weblink: 'http://www.cityoflondon.gov.uk/services/housing/financial-help-benefits/Pages/discretionary-housing-payments.aspx',
      pdf: '7450/City_of_London.pdf'
    },
    {
      shortcode: 'E09000033',
      phone: '0800 072 0042',
      email: 'westminster.benefits@secure.capita.co.uk',
      text: "",
      weblink: 'https://www.westminster.gov.uk/general-housing-benefit-information#tenants',
      pdf: '/'
    },
    {
      shortcode: 'E06000014',
      phone: '01904 551 556',
      email: 'benefits@york.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return in person or by post to:\n\nBenefits Service\nWest Offices\nStation Rise\nYork, YO1 6GA\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.york.gov.uk/info/20069/housing_benefit/662/discretionary_housing_payment',
      pdf: '7451/City_of_York.pdf'
    },
    {
      shortcode: 'S12000005',
      phone: '01259 450 000',
      email: 'benefits@clacks.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it:\n\nIn person : Revenues and payments servcie, 8 bank street, Alloa, FK10 1HP   \nBy post to: Revenues and payments services, Lime Tree House, North Castle street, Alloa, FK10 1EX\n\nIf you need assistance in completing your form please call 01259 226 237.",
      weblink: 'http://www.clacksweb.org.uk/council/discretionaryhousingpayments/',
      pdf: '7452/Clackmannanshire.pdf'
    },
    {
      shortcode: 'E07000071',
      phone: '01206 282 600',
      email: 'revenues.enquiries@colchester.gov.uk',
      text: "",
      weblink: 'http://www.colchester.gov.uk/dhp',
      pdf: '/'
    },
    {
      shortcode: 'S12000013',
      phone: '01851 822 642',
      email: 'benefits@cne-siar.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nTowconwyn hall\nStornoway\nIsle of Lewis, HS1 2XF\n\nIt should take approximately 40 minutes to complete the form.",
      weblink: 'https://www.cne-siar.gov.uk/benefits-and-grants/housing-benefit-and-council-tax-reduction/discretionary-housing-payments/',
      pdf: '7453/Comhairle_nan_Eilean_siar.pdf'
    },
    {
      shortcode: 'W06000003',
      phone: '01492 576 491',
      email: 'benefits@conwy.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nConwy County Borough Council\nBodlondeb\nBangor Road\nConwy, LL32 8DU\n\nIt should take approximately 60 minutes to complete the form. If you need assistance in completing your form please call 01492576491.",
      weblink: 'http://www.conwy.gov.uk/en/Resident/Benefits-and-grants/Discretionary-Housing-Payments.aspx',
      pdf: '7454/Conwy.pdf'
    },
    {
      shortcode: 'E07000029',
      phone: '0845 054 8600',
      email: 'info@copeland.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it:\n\nIn person -  Milom Coutny Centre, St George's Road, Milom or \nCleator Moor Local Links, Market Square, Cleator Moor.\n\nBy post - housing benefits office, Copeland Centre, Whitehaven, CA28 7SJ",
      weblink: 'https://www.copeland.gov.uk/content/discretionary-housing-payments',
      pdf: '7455/Copeland.pdf'
    },
    {
      shortcode: 'E07000150',
      phone: '01536 464 000',
      email: 'benefit.enquiries@corby.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nBenefits Section\nFinancial Services\nThe Corby Cube\nGeorge Street\nNorthants, NN17 1QG\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.corby.gov.uk/home/benefits/housing-benefit-and-council-tax-support/how-do-i-claim-housing-benefit-andor-council-7',
      pdf: '7456/Corby.pdf'
    },
    {
      shortcode: 'E06000052',
      phone: '0300 1234 121',
      email: 'discretionaryaward@cornwall.gov.uk',
      text: "",
      weblink: 'http://www.cornwall.gov.uk/advice-and-benefits/benefits/claiming-housing-benefit-and-council-tax-support/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000079',
      phone: '01285 623 035',
      email: 'benefits@cotswold.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nBenefits Service\nCotswold District Council\nTrinity Road\nCirencester\nGloucestershire, GL7 1PX\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.cotswold.gov.uk/residents/council-tax/benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '7457/Cotswold.pdf'
    },
    {
      shortcode: 'E06000053',
      phone: '01720 424 000',
      email: 'enquiries@scilly.gov.uk',
      text: "",
      weblink: 'http://www.scilly.gov.uk',
      pdf: '/'
    },
    {
      shortcode: 'E08000026',
      phone: '02476 832 727',
      email: 'dhpteam@coventry.gov.uk',
      text: "",
      weblink: 'http://www.coventry.gov.uk/info/54/benefits/3055/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000163',
      phone: '01756 700 600',
      email: 'customerservices@cravendc.gov.uk',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\nRevenues and benefits services\nCraven District Council\n1 Belle Vue Square\nBroughton Road\nSkipton\nNorth Yorkshire, BD23 1FJ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.cravendc.gov.uk/benefits-and-advice/discretionary-housing-payments-dhp/',
      pdf: '7458/Craven.doc'
    },
    {
      shortcode: 'E07000226',
      phone: '01293 438 000',
      email: 'benefits@crawley.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\n* By post - Crawley Borough Council, Town Hall, The Boulevard, Crawley       \n* By email - Benefits@crawley.gov.uk        \n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'http://www.crawley.gov.uk/pw/Council_Tax_and_Benefits/index.htm',
      pdf: '7459/Crawley.doc'
    },
    {
      shortcode: 'E07000096',
      phone: '01442 228 000',
      email: 'housing.benefits@dacorum.gov.uk',
      text: "",
      weblink: 'http://web.dacorum.gov.uk/home/benefits/housing-council-tax-benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000005',
      phone: '01325 405 444',
      email: 'customerservices@darlington.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nDarlington Council\nHousing Benefits\nTown Hall\nDarlington DL1 5QT\n\nIf you do not hear from the council after two weeks, follow up by calling 01325 388 514.",
      weblink: 'https://www.darlington.gov.uk/council-tax-and-benefits/benefits/online-forms/change-of-circumstance-forms/#dhp',
      pdf: '7460/Darlington.pdf'
    },
    {
      shortcode: 'E07000107',
      phone: '01322 343 705',
      email: 'qualityteam@sevenoaks.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nDartford Borough Council\nCivic Centre\nHome Gardens\nDartford\nKent, DA1 1DR",
      weblink: 'http://www.dartford.gov.uk/by-category/advice-and-benefits2/landing3/discretionary-housing-payments2/what-are-discretionary-housing-payments-dhp',
      pdf: '7461/Dartford.pdf'
    },
    {
      shortcode: 'E07000151',
      phone: '01327 871 100',
      email: 'benefits@daventrydc.gov.uk',
      text: "",
      weblink: 'http://www.daventrydc.gov.uk/living/benefits/appeals-overpayments/?locale=en',
      pdf: '/'
    },
    {
      shortcode: 'W06000004',
      phone: '01824 706 000',
      email: 'benefits@denbighshire.gov.uk',
      text: "To apply for a DHP please complete this 13 page form and return it to:\n\nBenefits Department,\nRussell House,\nChurton Road,\nRhyl, LL18 3DP\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.denbighshire.gov.uk/en/resident/benefits-grants-and-advice/housing-benefit/discretionary-housing-payments.aspx',
      pdf: '7463/Denbighshire.pdf'
    },
    {
      shortcode: 'E06000015',
      phone: '01332 640 444',
      email: 'enquiries.benefits@derby.gov.uk',
      text: "",
      weblink: 'http://www.derby.gov.uk/advice-and-benefits/benefits/the-single-discretionary-award-scheme/',
      pdf: '/'
    },
    {
      shortcode: 'E07000035',
      phone: '01629 761 188',
      email: 'benefits@derbyshiredales.gov.uk',
      text: "Please apply for a discretionary housing payment by emailing the address below telling your council your situation. Remember to include details of how you would like the council to contact you.",
      weblink: 'http://www.derbyshiredales.gov.uk/housing-a-council-tax/welfare-reform/changes-for-social-housing-tenants#dhp',
      pdf: '/'
    },
    {
      shortcode: 'E08000017',
      phone: '01302 735 336',
      email: 'housing.benefits@doncaster.gov.uk',
      text: "To apply for a DHP please complete this 16 page form and return it to:\n\nThe Benefits Section\nDMBC\nCivic Office\nWaterdale\nDoncaster DN1 3BU\n\nIt should take approximately 60 minutes to complete the form. If you need assistance in completing your form please call 01245 606400 or go into the council's offices.",
      weblink: 'http://www.doncaster.gov.uk/services/council-tax-benefits/discretionary-housing-payments',
      pdf: '7464/Doncaster.pdf'
    },
    {
      shortcode: 'E07000108',
      phone: '01304 821 199',
      email: 'revenues@dover.gov.uk',
      text: "",
      weblink: 'http://www.dover.gov.uk/Benefits/Discretionary-Housing-Payments/Discretionary-Payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E08000027',
      phone: '0300 555 8100',
      email: 'customers.benefits@dudley.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nBenefits Services Division\nCouncil House\nPriory Road\nDudley\nDY1 1HF        \n\nOr in person - Dudley Council Plus, Castle Street, Dudley, DY1 1LQ \n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.dudley.gov.uk/resident/your-council/council-tax-and-benefits/benefits/discretionary-payments/',
      pdf: '7465/Dudley.pdf'
    },
    {
      shortcode: 'S12000006',
      phone: '030 333 3 3006',
      email: 'housingandcounciltax@dumgal.gov.uk',
      text: "",
      weblink: 'http://www.dumgal.gov.uk/article/15161/Discretionary-Housing-Payments',
      pdf: '/'
    },
    {
      shortcode: 'S12000042',
      phone: '01382 431 205',
      email: 'customerservices@dundeecity.gov.uk',
      text: "",
      weblink: 'http://www.dundeecity.gov.uk/benefits/DHPs',
      pdf: '/'
    },
    {
      shortcode: 'E06000047',
      phone: '03000 26 8000',
      email: 'housingsolutions@durham.gov.uk',
      text: "To apply for a DHP please complete this 20 page form and return it by post or in person to:\n\nRevenues and Benefits\nPO Box 238\nStanley, DH8 1FP\n\nIt should take approximately 30 minutes to complete the form. If you need assistance in completing your form please call 03000262000.",
      weblink: 'http://www.durham.gov.uk/article/3566/Discretionary-Housing-Payment-DHP',
      pdf: '7466/Durham.pdf'
    },
    {
      shortcode: 'S12000008',
      phone: '01563 554 400',
      email: 'benefits@east-ayrshire.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nEast Ayrshire Council\nRevenues and Benefits Section\nP.O. Box 13\nCivic Centre\nJohn Dickie Street\nKilmarnock, KA1 1BY \n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.east-ayrshire.gov.uk/CouncilAndGovernment/Benefits/HousingBenefit/DiscretionaryHousingPayments.aspx',
      pdf: '7467/East_Ayrshire.pdf'
    },
    {
      shortcode: 'E07000009',
      phone: '01842 756 566',
      email: 'benefitsenquiries@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E07000040',
      phone: '01395 571770',
      email: 'benefits@eastdevon.gov.uk',
      text: "",
      weblink: 'http://eastdevon.gov.uk/benefits-and-support/housing-benefit/apply-for-a-discretionary-housing-payment/',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0345 034 4569',
      email: 'svpp@bcpcouncil.gov.uk',
      text: "",
      weblink: 'https://www.dorsetforyou.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment-apply.aspx',
      pdf: '/'
    },
    {
      shortcode: 'S12000045',
      phone: '0800 901 057',
      email: 'benefits@eastdunbarton.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nRevenues and Benefits Team\nWilliam Patrick Library\n2-4 West High Street\nG66 1AD     \n\nOr in person to any of:\n* Kirkintilloch Hub, 2/4 West High Street, Kirkintilloch, G66 1AD\n* Bearsden Hub, Brookwood Villa, 166 Drymen Road, Bearsden, G61 3RJ\n* Bishopbriggs Hub, Bishopbriggs Library, 170 Kirkintilloch Road, G64 2LX\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.eastdunbarton.gov.uk/residents/benefits/discretionary-housing-payment',
      pdf: '7469/East_Dunbartonshire.pdf'
    },
    {
      shortcode: 'E07000085',
      phone: '01730 234 175',
      email: 'benefits@easthants.gov.uk',
      text: "Use the email address and phone number below to apply for a DHP",
      weblink: 'http://www.easthants.gov.uk/benefits/housing-benefit',
      pdf: '/'
    },
    {
      shortcode: 'E07000242',
      phone: '01279 655 261',
      email: 'benefits@hertspartnership-ala.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nThe Benefits Service,\nCouncil Offices,\nWallfields,\nHertford, SG13 8EQ\n \nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.eastherts.gov.uk/article/35279/Discretionary-Housing-Payments',
      pdf: '7529/49215_-_Discretionary_Housing_and_Hardship_Relief.pdf'
    },
    {
      shortcode: 'E07000137',
      phone: '01507 601 111',
      email: 'customerservices@e-lindsey.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBy post - Housing benefit section, Tedder Hall, Manby Park, Louth, Lincs LN11 8UP\nIn person - The housing benefit Section, Tedder Hall, Manby Park, Louth, LN11 8UP or any customer services centre.\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.e-lindsey.gov.uk/www.e-lindsey.gov.uk/discretionaryhousingpayment',
      pdf: '7471/East_Lindsey.pdf'
    },
    {
      shortcode: 'S12000010',
      phone: '01620 827 827',
      email: 'benefits@eastlothian.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nBenefit Section\nDepartment of Support Services\nEast Lothian Council\nPO Box 13261\nHaddington, EH41 3YA\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.eastlothian.gov.uk/info/200254/welfare_reform/1504/welfare_reform/4',
      pdf: '11311/East_lothian_DHP_application_form.pdf'
    },
    {
      shortcode: 'E07000152',
      phone: '01832 742 097',
      email: 'benquiries@east-northamptonshire.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it by post or in person to:\n\nBenefits Section \nEast Northamptonshire Council\nCedar Drive\nThrapston\nNorthants, NN14 4LZ\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.east-northamptonshire.gov.uk/info/200008/benefits/1009/discretionary_housing_payments',
      pdf: '7473/East_Northamptonshire.pdf'
    },
    {
      shortcode: 'S12000011',
      phone: '0141 577 3002',
      email: 'scottishwelfarefund@eastrenfrewshire.gov.uk',
      text: "To apply please call 0141 577 3649 or email the address below.",
      weblink: 'http://www.eastrenfrewshire.gov.uk/housingbenefit',
      pdf: '/'
    },
    {
      shortcode: 'E06000011',
      phone: '01482 394 631',
      email: 'adjudication@eastriding.gov.uk',
      text: "",
      weblink: 'http://www2.eastriding.gov.uk/housing/housing-benefit-and-council-tax-support/help-paying-your-rent/',
      pdf: '/'
    },
    {
      shortcode: 'E07000193',
      phone: '01283 508 000',
      email: 'benefits@eaststaffsbc.gov.uk',
      text: "Contact the council on the email address below and request a form",
      weblink: 'http://www.eaststaffsbc.gov.uk/benefits-and-support/housing-benefit/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000061',
      phone: '0845 300 6715',
      email: 'customerfirst@lewes-eastbourne.gov.uk',
      text: "",
      weblink: 'http://www.lewes-eastbourne.gov.uk/benefits-and-grants/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000086',
      phone: '023 8068 8000',
      email: 'revbens@eastleigh.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nRevenue & Benefits\nEastleigh House\nUpper Market Street\nEastleigh \n\nIt should take approximately 30 minutes to complete the form.",
      weblink: '"https://www.eastleigh.gov.uk/council-tax,-benefits-business-rates/housing-benefit/making-a-claim/discretionary-housing-payments.aspx"',
      pdf: '7474/Eastleigh.pdf'
    },
    {
      shortcode: 'E07000030',
      phone: '01768 212 131',
      email: 'benefits@eden.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Team Leader\nEden District Council\nTown Hall\nPenrith, CA11 7QF",
      weblink: 'https://www.eden.gov.uk/council-tax-and-housing-benefit/housing-benefit/housing-benefit-payments/awarding-discretionary-housing-payments/',
      pdf: '7475/Eden.pdf'
    },
    {
      shortcode: 'S12000036',
      phone: '0131 608 1111',
      email: 'dhp@edinburgh.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 6-page form and returning it to the address above:\n\nCity of Edinburgh Council\nPO Box 12331 \nEdinburgh\nEH7 9DN\n\nYou will need your council tax or benefit account number. The form takes about 30 minutes to complete.\n\nFor more information, email dhp@edinburgh.gov.uk.",
      weblink: 'http://www.edinburgh.gov.uk/info/20130/welfare_reform/1560/discretionary_housing_payments',
      pdf: '7476/Edinburgh.docx'
    },
    {
      shortcode: 'E07000207',
      phone: '01372 474 060',
      email: 'benefits@elmbridge.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nElmbridge Borough Council,\nHousing Benefits,\nCivic Centre,\nSurrey, KT10 9SD\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.elmbridge.gov.uk/housing-benefits/discretionary-housing-payments/',
      pdf: '7477/Elmbridge.pdf'
    },
    {
      shortcode: 'E09000010',
      phone: '020 8379 1000',
      email: 'revs@enfield.gov.uk',
      text: "",
      weblink: 'https://new.enfield.gov.uk/services/benefits/discretionary-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000072',
      phone: '01992 564 155',
      email: 'benefits@eppingforestdc.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Team\nEpping Forest District Council\nCivic Offices\nEpping\nEssex, CM16 4BZ",
      weblink: 'http://www.eppingforestdc.gov.uk/benefits/discretionary-housing-payment/',
      pdf: '7478/Epping_forest.pdf'
    },
    {
      shortcode: 'E07000208',
      phone: '01372 732 269',
      email: 'benefits@epsom-ewell.gov.uk',
      text: "",
      weblink: 'http://www.epsom-ewell.gov.uk/residents/benefits/discretionary-payments',
      pdf: '7479/Epsom.pdf'
    },
    {
      shortcode: 'E07000036',
      phone: '0115 907 1010',
      email: 'benefits@erewash.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nFinance Division\nPO Box 2\nWharncliffe Road\nIlkeston\nDerbyshire, DE7 5RP\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.erewash.gov.uk/about-benefits/discretionary-housing-payments.html',
      pdf: '7480/Erewash.pdf'
    },
    {
      shortcode: 'E07000041',
      phone: '01392 277 888',
      email: 'housing.benefit@exeter.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nFreepost RLZK-YKLG-BSEX\nExeter City Council\nHB/CTB Office\nCivic Centre\nDix���s Field\nExeter, EX1 1JW",
      weblink: 'https://exeter.gov.uk/benefits-and-welfare/how-to-claim-benefits/what-you-need-to-know-about-benefits/',
      pdf: '7481/Exeter.pdf'
    },
    {
      shortcode: 'S12000014',
      phone: '01324 503 992',
      email: 'revenues.dhp@falkirk.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nFalkirk Council Revenues & Benefits\nCallendar Square\nFalkirk, FK1 1UJ\n\nIf you need assistance in completing your form please contact 01324 503 992 or revenues.dhp@falkirk.gov.uk.",
      weblink: 'http://www.falkirk.gov.uk/services/homes-property/council-housing/rent/discretionary-housing-payments.aspx',
      pdf: '7482/Falkirk.pdf'
    },
    {
      shortcode: 'E07000087',
      phone: '01329 824646',
      email: 'benefits@fareham.gov.uk ',
      text: "",
      weblink: 'http://www.fareham.gov.uk/benefits/extra_help/intro.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000010',
      phone: '01354 654 321',
      email: 'benefits@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'S12000047',
      phone: '03451 551 155',
      email: 'benctax@fife.gov.uk',
      text: "",
      weblink: 'https://www.fifedirect.org.uk/topics/index.cfm?fuseaction=page.display&p2sid=234492E9-F88C-7B4B-90E5EB5DFE52C54B',
      pdf: '/'
    },
    {
      shortcode: 'W06000005',
      phone: '01352 704 848',
      email: 'wrrt@flintshire.gov.uk',
      text: "",
      weblink: 'https://www.flintshire.gov.uk/en/Resident/Council-Tax-and-Benefits-and-Grants/Housing-Benefits.aspx',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01284 757 269',
      email: 'benefits@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E07000080',
      phone: '01594 812 531',
      email: 'housing.benefits@fdean.gov.uk',
      text: "",
      weblink: 'https://www.fdean.gov.uk/residents/council-tax/benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '7485/forest_of_dean.pdf'
    },
    {
      shortcode: 'E07000119',
      phone: '01253 658 658',
      email: 'benefits@fylde.gov.uk',
      text: "",
      weblink: 'https://new.fylde.gov.uk/resident/housing-benefits/discretionary-housing-payments-dhp/',
      pdf: '/'
    },
    {
      shortcode: 'E08000037',
      phone: '0191 433 4646',
      email: 'benefitenquiries@gateshead.gov.uk',
      text: "",
      weblink: 'https://www.gateshead.gov.uk/article/7673/Apply-for-a-Discretionary-Housing-Payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000173',
      phone: '0115 901 3970',
      email: 'housingbenefits@gedling.gov.uk',
      text: "",
      weblink: 'https://www.gedling.gov.uk/resident/benefits/helpwithpayinghousingcosts/',
      pdf: '/'
    },
    {
      shortcode: 'S12000049',
      phone: '0141 287 5050',
      email: 'hben.central@glasgow.gov.uk',
      text: "Download and print out this 4-page form. It will take about 30 minutes to complete and return it to:\n\nGlasgow City Council\nPO Box 36\nGlasgow\nG1 1JE\n\nYou will need your national insurance number and evidence of your rent costs. You must list your income and expenditure.\n\nFor help to complete your form, call 0141 287 5050 and choose option 3. Lines are busy, so you may have to hold.",
      weblink: 'https://glasgow.gov.uk/index.aspx?articleid=17168',
      pdf: '7483/Glasgow.pdf'
    },
    {
      shortcode: 'E07000081',
      phone: '01452 396 979',
      email: 'benefits@gloucester.gov.uk',
      text: "To apply for a DHP please complete this 11 page form and return it to:\n\nRevenues & Benefits Services\nGloucester City Council\nThe Docks\nGloucester, GL1 2EQ\n\nIt should take approximately 60 minutes to complete the form. If you need assistance in completing your form please contact 01452 396440 or Benefits@gloucester.gov.uk.",
      weblink: 'https://www.gloucester.gov.uk/council-tax-benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '7484/Gloucester.doc'
    },
    {
      shortcode: 'E07000088',
      phone: '02392 545 325',
      email: 'benefits@gosport.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nThe Benefits Section\nFinancial Services Unit\nGosport Borough Council\nHampshire, PO12 1EB.\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.gosport.gov.uk/sections/your-council/council-services/housing-benefits/discretionary-housing-payments/',
      pdf: '7486/Gosport.pdf'
    },
    {
      shortcode: 'E07000109',
      phone: '01474 337 710',
      email: 'hbcustomer.services@gravesham.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nBenefit Office,\nGravesham Borough Council,\nCivic Centre,\nWindmill Street,\nKent, DA12 1AU\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.gravesham.gov.uk/home/housing/housing-benefit/discretionary-housing-payments',
      pdf: '7487/Gravesham.pdf'
    },
    {
      shortcode: 'E07000145',
      phone: '01493 846 291',
      email: 'benefits@great-yarmouth.gov.uk',
      text: "",
      weblink: 'http://www.great-yarmouth.gov.uk/discretionaryhousingpayment',
      pdf: '/'
    },
    {
      shortcode: 'E07000209',
      phone: '0330 123 0081',
      email: 'customerservices@guildford.gov.uk',
      text: "",
      weblink: 'http://www.guildford.gov.uk/benefits?faqdetailid=13300&inplace=true',
      pdf: '/'
    },
    {
      shortcode: 'W06000002',
      phone: '01286 682 689',
      email: 'benefits@gwynedd.llyw.cymru',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nCouncil Offices\nShirehall Street\nCaernarfon\nGwynedd, LL55 1SH\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.gwynedd.gov.uk/en/Residents/Benefits-and-grants/Discretionary-Housing-Payments-%28DHP%29.aspx',
      pdf: '7488/Gwynedd.pdf'
    },
    {
      shortcode: 'E06000006',
      phone: '0151 522 7772',
      email: 'benefits@halton.gov.uk',
      text: "To apply for a DHP please complete this 3 page form and return it to:\n\nBenefits Service\nPO Box 223\nWidnes, WA8 2DA\n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'https://www3.halton.gov.uk/Pages/CouncilandBenefits/Discretionary%20Housing%20Payments.aspx',
      pdf: '7489/Halton.pdf'
    },
    {
      shortcode: 'E07000164',
      phone: '01609 767 168',
      email: 'benefits@hambleton.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nHambleton District Council,\nCivic Centre,\nNorthallerton,\nNorth Yorkshire, DL6 2UU\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.hambleton.gov.uk/info/20114/housing_benefit/118/housing_benefit/6',
      pdf: '7490/Hambleton.doc'
    },
    {
      shortcode: 'E07000131',
      phone: '018 588 28282',
      email: 'benefits@harborough.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nThe Leicestershire Partnership\nBenefits Section\nPO Box 10004\nHinckley, LE1O 9EJ\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.harborough.gov.uk/info/20020/benefits/115/extra_help_if_you_are_in_financial_difficulty',
      pdf: '7491/Harborough.pdf'
    },
    {
      shortcode: 'E07000073',
      phone: '01279 446 633',
      email: 'hdc.benefits@harlow.gov.uk',
      text: "To apply for a DHP please complete the 10 page form and return it to:\n\nReveneues & Benefits, Harlow Council, Civic Centre, The Water Gardens, CM20 1WG\n\nIt should take approximately 45 minutes.",
      weblink: 'https://www.harlow.gov.uk/benefits/discretionary-housing-payment',
      pdf: '7494/Harlow.pdf'
    },
    {
      shortcode: 'E07000165',
      phone: '01423 500 600',
      email: 'ben_rev@harrogate.gov.uk',
      text: "",
      weblink: 'https://www.harrogate.gov.uk/info/20062/housing_benefit/455/discretionary_housing_payments',
      pdf: '7282/Harrogate.doc'
    },
    {
      shortcode: 'E07000089',
      phone: '01252 774 444',
      email: 'benefits@hart.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Section\nHart District Council\nCivic Offices\nHarlington Way\nHampshire, GU5l 4AE",
      weblink: 'http://www.hart.gov.uk/housing/help-advice',
      pdf: '5902/Hart.pdf'
    },
    {
      shortcode: 'E06000001',
      phone: '01429 284 284',
      email: 'welfareandbenefit@hartlepool.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nHartlepool Borough Council\nCivic Centre\nVictoria Road\nHartlepool, TS24 8AY",
      weblink: 'https://www.hartlepool.gov.uk/housingbenefit',
      pdf: '5908/Hartlepool.pdf'
    },
    {
      shortcode: 'E07000062',
      phone: '01424 451 080',
      email: 'benefits@hastings.gov.uk',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\nRevenues & Benefits Service\nCommunity Contact Centre\nTown Hall\nQueens Square\nHastings, TN34 1TL\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.hastings.gov.uk/benefits/housingbenefit/discretionaryhousingpayments/',
      pdf: '5914/Hastings.pdf'
    },
    {
      shortcode: 'E07000090',
      phone: '02392 446 382',
      email: 'havant.benefits@secure.capita.co.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nThe Benefit Manager\nHavant Borough Council\nPublic Service Plaza\nHavant, PO9 2AX\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.havant.gov.uk/benefits/housing-benefits/discretionary-housing-payment',
      pdf: '5920/havant.docx'
    },
    {
      shortcode: 'E06000019',
      phone: '01432 260 333',
      email: 'benefits@herefordshire.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Section\nHerefordshire Council\nPlough Lane, HR4 0LE\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.herefordshire.gov.uk/info/200207/family_support/54/housing_benefit/3',
      pdf: '5926/herefordshire.pdf'
    },
    {
      shortcode: 'E07000098',
      phone: '020 8207 2277',
      email: 'benefits@hertsmere.gov.uk',
      text: "To apply please call 020 8207 7404.",
      weblink: 'https://www.hertsmere.gov.uk/Benefits--Council-tax/Benefits/',
      pdf: '/'
    },
    {
      shortcode: 'E07000037',
      phone: '0345 129 4880',
      email: 'benefits@highpeak.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nHigh Peak Borough Council\nPO Box 136\nBuxton, SK17 1AQ \n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'http://www.highpeak.gov.uk/article/908/Discretionary-Housing-Payments-DHP',
      pdf: '5936/High_Peak.pdf'
    },
    {
      shortcode: 'E07000132',
      phone: '01455 238 141',
      email: 'benefits@hinckley-bosworth.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nThe Leicestershire Partnership\nBenefits Section\nPO Box 10004\nHinckley, LE1O 9EJ\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.hinckley-bosworth.gov.uk/info/72/once_you_have_your_decision/419/discretionary_housing_payments/4',
      pdf: '5942/Hinckley.pdf'
    },
    {
      shortcode: 'E07000227',
      phone: '01444 477264',
      email: 'finance@horsham.gov.uk',
      text: "",
      weblink: 'https://www.lgss-revs-bens.com/horsham/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000010',
      phone: '01482 300 303',
      email: 'benefitssr@hullcc.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nAdjudication Team\nFreepost RSJC-KKBE-ABXZ\nHull Revenues and Benefits\nPo Box 15\nHull, HU1 2AB",
      weblink: 'http://www.hull.gov.uk/benefits-support-and-welfare-advice/benefits-support/discretionary-housing-payment',
      pdf: '5952/Hull_city.pdf'
    },
    {
      shortcode: 'E07000011',
      phone: '01480 388 308',
      email: 'benefit@huntingdonshire.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nBenefit Section\nPathfinder House\nSt Mary���s Street\nHuntingdon, PE29 3TN",
      weblink: 'https://www.huntingdonshire.gov.uk/benefits/discretionary-housing-payments/',
      pdf: '5958/Huntingdonshire.pdf'
    },
    {
      shortcode: 'E07000120',
      phone: '01254 388 111',
      email: 'enquiries@hyndburnbc.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits, Revenues and Customer Contact\nAccrington Town Hall\nBroadway Offices\nAccrington\nLancashire, BB5 1EZ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.hyndburnbc.gov.uk/download-package/discretionary-housing-payments/',
      pdf: '5964/Hyndburn.docx'
    },
    {
      shortcode: 'S12000018',
      phone: '0800 013 1375',
      email: 'discretionarypayments@inverclyde.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nInverclyde Council\nRevenues & Customer Services\nClyde Square\nGreenock, PA15 1LY",
      weblink: 'http://www.inverclyde.gov.uk/dhp',
      pdf: '5970/Inverclyde.pdf'
    },
    {
      shortcode: 'E07000202',
      phone: '01473 432701',
      email: 'benefits@ipswich.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'W06000001',
      phone: '01248 752 226',
      email: 'benefits@anglesey.gov.uk',
      text: "You can make a claim by making an appointment with the Revenues and Benefits team by:\n* Tel: 01248 752226 / 752658\n* email benefits@anglesey.gov.uk\n* visit Isle of Anglesey County Council Revenues and Benefit Department, Council Offices, Llangefni.",
      weblink: 'http://www.anglesey.gov.uk/advice-and-benefits/benefits-and-welfare-rights/discretionary-housing-payments-and-discretionary-assistance-fund/',
      pdf: '/'
    },
    {
      shortcode: 'E06000046',
      phone: '01983 823 950',
      email: 'housing.benefit@iow.gov.uk',
      text: "",
      weblink: 'https://www.iwight.com/Residents/Benefits-Council-Tax-and-Business-Rates/Housing-Benefit-Services/Housing-Benefit-Guidance/Discretionary-Housing-Payment-Policy',
      pdf: '/'
    },
    {
      shortcode: 'E07000153',
      phone: '01536 534 247',
      email: 'creditunion@kettering.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Office\nIncome and Debt Management\nKettering Borough Council\nBowling Green Road\nNorthants, NN15 7QX\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.kettering.gov.uk/info/20006/benefits/102/apply_for_extra_support/4',
      pdf: '5988/Kettering.pdf'
    },
    {
      shortcode: 'E08000034',
      phone: '01484 414 782',
      email: 'lwp@kirklees.gov.uk',
      text: "",
      weblink: 'http://www.kirklees.gov.uk/beta/benefits/discretionary-housing-payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E08000011',
      phone: '0151 489 6000',
      email: 'benefits@knowsley.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to any of the following:\n\n* Huyton One stop shop, Municipal Buildings, Archway Road, Huyton, l36 9YU   \n\n* Kirkby One Stop Shop, the Kirkby Centre, Norwich Way, Kirkby, l32 8XY    \n\n* Halewood One Stop Shop, the Halewood Centre, Roseheath Drive, L26 9UH        \n\n* Prescot One Stop Shop, Prescot Shopping Centre, Aspinall street, Prescot, L34 5GA\n",
      weblink: 'http://www.knowsley.gov.uk/residents/benefits-and-grants/housing-benefit/discretionary-housing-payments.aspx',
      pdf: '5998/knowsley.pdf'
    },
    {
      shortcode: 'E07000121',
      phone: '01524 582 965',
      email: 'benefits@lancaster.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nLancaster City Council\nPO Box 4\nLancaster, LA1 1QR\n\nor by hand to:\n\nLancaster or Morecambe Benefits Customer Service Centres at Lancaster and Morecambe Town Halls.\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.lancaster.gov.uk/benefits-and-support/discretionary-housing-payments',
      pdf: '6004/Lancaster.pdf'
    },
    {
      shortcode: 'E08000035',
      phone: '0113 222 4404',
      email: 'lcc.benefits@leeds.gov.uk',
      text: "You can apply for a DHP by completing the online application form. It should take approximately 30-45 minutes to complete. \n\nYou will need to gather a number of documents before you apply such as your housing benefit details, bank account information and proofs of your income and expenditures.",
      weblink: 'http://www.leeds.gov.uk/residents/Pages/Discretionary-Housing-Payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000016',
      phone: '0116 454 1006',
      email: 'dhp@leicester.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nFreepost RRBZ-TECL-GRLZ\nCustomer Service Centre\nYork House\n91 Granby Street\nLeicester LE1 6FB\n\nIf you do not hear from the council after two weeks, follow up by calling the council on 0116 454 1006.",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E07000063',
      phone: '01273 471 600',
      email: 'customerfirst@lewes-eastbourne.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nLewes District Council\nSouthover House\nSouthover Road\nLewes\nEast Sussex, BN7 1AB",
      weblink: 'http://www.lewes-eastbourne.gov.uk/benefits-and-grants/discretionary-housing-payments/',
      pdf: '6022/Lewes.pdf'
    },
    {
      shortcode: 'E07000194',
      phone: '01543 308 900',
      email: 'benefits@lichfielddc.gov.uk',
      text: "To apply for a DHP please complete this 15 page form and return it to:\n\nDistrict Council House,\nFrog Lane,\nLichfield,\nStaffs, WS13 6YY",
      weblink: 'https://www.lichfielddc.gov.uk/Residents/Benefits/About-discretionary-housing-payments.aspx',
      pdf: '6028/Lichfield.doc'
    },
    {
      shortcode: 'E08000012',
      phone: '0800 028 3697',
      email: 'benefits.service@liverpool.gov.uk',
      text: "You can apply online for a DHP via the council website or by downloading and printing out this 4-page form and return it to:\n\nBenefits Service,\nLiverpool City Council,\nPO Box 13,\nLiverpool,\nL69 2JG \n\nor return it in person to any One Stop Shop.",
      weblink: 'http://liverpool.gov.uk/benefits-and-grants/housing-benefits/discretionary-housing-payments',
      pdf: '6034/Liverpool.pdf'
    },
    {
      shortcode: 'E09000003',
      phone: '0208 359 2442',
      email: 'benefits@barnet.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nLondon Borough of Barnet\nBenefits Service\nPO Box 2015\nPershore WR10 9BG\n\nIf you do not hear from the council after two weeks, follow up by calling the council on 0208 359 2111. You may spend more than 15 minutes on hold at busy times.",
      weblink: 'https://www.barnet.gov.uk/citizen-home/council-tax-and-benefits/housing-benefit-and-council-tax-support/housing-benefit-get-extra-help-to-pay-your-rent.html',
      pdf: '6040/Barnet_Council_.pdf'
    },
    {
      shortcode: 'E09000004',
      phone: '0203 045 3546',
      email: 'dhp@bexley.gov.uk',
      text: "",
      weblink: 'https://www.bexley.gov.uk/services/housing/discretionary-housing-payments',
      pdf: '7414/Bexley.pdf'
    },
    {
      shortcode: 'E09000005',
      phone: '020 8937 1800',
      email: 'benefits@brent.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nBrent Customer Services\nPO Box 425\nWembley\nMiddlesex, HA9 6SU",
      weblink: 'https://brent.gov.uk/services-for-residents/benefits-and-money-advice/claim-discretionary-housing-payment/',
      pdf: '7421/Brent_Council.pdf'
    },
    {
      shortcode: 'E09000006',
      phone: '0300 303 8670',
      email: 'benefits@bromley.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nThe Benefits Section\nLondon Borough of Bromley\nCivic Centre\nStockwell Close\nBromley, BR1 3UH\n\nIt should take approximately 30 minutes.",
      weblink: 'http://www.bromley.gov.uk/info/200008/benefits/418/housing_benefit',
      pdf: '7426/Bromley.pdf'
    },
    {
      shortcode: 'E09000007',
      phone: '020 7974 4444',
      email: 'benefits@camden.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nBenefits Service\nCamden Town Hall\nJudd Street\nLondon WC1H 8NJ\n\nIf you do not hear from the council after two weeks, follow up by calling 0203 324 0383.",
      weblink: 'https://www.camden.gov.uk/help-housing-costs',
      pdf: '7433/Camden_Council.pdf'
    },
    {
      shortcode: 'E09000008',
      phone: '020 8726 7000',
      email: 'croyhben@croydon.gov.uk',
      text: "",
      weblink: 'https://www.croydon.gov.uk/advice/benefits/discretionary-support/discretionary-support-fund',
      pdf: '/'
    },
    {
      shortcode: 'E09000009',
      phone: '020 8825 7000',
      email: 'localwelfareassistance@ealing.gov.uk',
      text: "",
      weblink: 'https://www.ealing.gov.uk/info/201103/housing_benefit_and_council_tax_support/304/discretionary_housing_payments_and_discretionary_council_tax_discounts',
      pdf: '/'
    },
    {
      shortcode: 'E09000012',
      phone: '020 8356 3399',
      email: 'benefits@hackney.gov.uk',
      text: "",
      weblink: 'https://hackney.gov.uk/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E09000013',
      phone: '020 8753 6681',
      email: 'benefits@lbhf.gov.uk',
      text: "",
      weblink: 'https://www.lbhf.gov.uk/benefits/help-paying',
      pdf: '/'
    },
    {
      shortcode: 'E09000014',
      phone: '020 8489 1000',
      email: 'benefits@haringey.gov.uk',
      text: "Apply for a DHP by completing an online application through Haringey's MyAccount system.\n\nYou can also download a [paper form here](https://www.haringey.gov.uk/council-tax-and-benefits/housing-benefit-and-council-tax-reductions/discretionary-housing-payments-dhp#form) and returning it to the council. ",
      weblink: 'http://www.haringey.gov.uk/advice-tax-and-benefits/housing-benefit-and-council-tax-reductions/discretionary-housing-payments-dhp',
      pdf: '/'
    },
    {
      shortcode: 'E09000015',
      phone: '020 8901 2610',
      email: 'housing.benefits@harrow.gov.uk',
      text: "",
      weblink: 'https://www.harrow.gov.uk/benefits/discretionary-housing-payments?documentId=12396&categoryId=210268',
      pdf: '7495/harrow.pdf'
    },
    {
      shortcode: 'E09000016',
      phone: '01708 433 996',
      email: '',
      text: "",
      weblink: 'https://www.havering.gov.uk/Pages/Services/Discretionary-Housing-Payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E09000017',
      phone: '0300 123 1384',
      email: 'fasttrackteam@hillingdon.gov.uk',
      text: "",
      weblink: 'https://www.hillingdon.gov.uk/article/2421/Eligibility-for-discretionary-housing-payments-DHPs',
      pdf: '/'
    },
    {
      shortcode: 'E09000018',
      phone: '020 8583 4242',
      email: 'dhps@liberata.com',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nRevenue & Benefits Client Unit,\nBorough of Hounslow,\nCivic Centre,\nLampton Road,\nTW3 4DN",
      weblink: 'https://www.hounslow.gov.uk/info/20072/housing_benefit/1251/discretionary_housing_payments',
      pdf: '6107/Hounslow.pdf'
    },
    {
      shortcode: 'E09000019',
      phone: '020 527 2000',
      email: 'claimit@islington.gov.uk',
      text: "Apply to the Resident Support Scheme by visiting:\n\nContact Islington, 222 Upper Street, N1 1XR.",
      weblink: 'https://www.islington.gov.uk/advice/resident-support-scheme',
      pdf: '/'
    },
    {
      shortcode: 'E09000022',
      phone: '0345 302 2312',
      email: 'benefitsinfo@lambeth.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E09000023',
      phone: '020 8314 6000',
      email: '',
      text: "You can apply for a DHP by downloading and printing out this 4-page form.\n\nIt shouldn't take longer than 30 minutes to complete.\n\nYou may need to provide the council with evidence of what you spend money on.",
      weblink: 'http://www.lewisham.gov.uk/myservices/benefits/housing-benefit/Pages/discretionary-housing-payments.aspx',
      pdf: '6122/lewisham.pdf'
    },
    {
      shortcode: 'E09000025',
      phone: '020 8430 2000',
      email: ' benefits@newham.gov.uk',
      text: "",
      weblink: 'https://www.newham.gov.uk/Pages/Services/Housing-benefit-new-claim.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E09000026',
      phone: '020 8708 5690',
      email: 'housing.benefits@redbridge.gov.uk',
      text: "You can apply for a DHP using this online form",
      weblink: 'https://www.redbridge.gov.uk/benefits/discretionary-housing-and-hardship-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E09000027',
      phone: '020 8891 1411',
      email: '',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nRevenues and Benefits\nCivic Centre\n44 York Street\nTwickenham, TW1 3BZ\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.richmond.gov.uk/home/services/housing/help_with_paying_your_rent_and_council_tax/housing_benefit/discretionary_housing_payments.htm',
      pdf: '6137/Richmond.pdf'
    },
    {
      shortcode: 'E09000028',
      phone: '0207 525 1880',
      email: 'financial.inclusion@southwark.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 8-page form.\n\nIt should take about 30 minutes to complete.\n\nYou may need to provide the council with evidence of what you spend money on.",
      weblink: 'https://www.southwark.gov.uk/benefits-and-support/housing-benefit/get-extra-help',
      pdf: '6143/Southwark.pdf'
    },
    {
      shortcode: 'E09000029',
      phone: '020 8770 5000',
      email: 'WELFAREREFORM@SUTTON.GOV.UK',
      text: "",
      weblink: 'https://www.sutton.gov.uk/info/200468/council_tax_and_benefits/1749/information_for_claimants',
      pdf: '/'
    },
    {
      shortcode: 'E09000030',
      phone: '020 7364 5000',
      email: 'benefits@towerhamlets.gov.uk',
      text: "",
      weblink: 'http://www.towerhamlets.gov.uk/lgnl/advice_and_benefits/benefits/discretionary_housing_payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E09000031',
      phone: '020 8496 3000',
      email: 'revenue.services@walthamforest.gov.uk',
      text: "",
      weblink: 'https://www.walthamforest.gov.uk/content/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E09000032',
      phone: '020 8871 8769',
      email: 'benefitpayments@wandsworth.gov.uk',
      text: "To apply for a DHP please apply in writing to:\n\nBenefit Fianance Team, Wandsworth Benefit Service, PO box 500, SW18 2PN\n\nPlease remember to provide as much detail as possible about why you need a discretionary housing payment.",
      weblink: 'http://www.wandsworth.gov.uk/info/200008/benefits/1194/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000032',
      phone: '03007 900 345',
      email: 'revenues@luton.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E07000110',
      phone: '01622 602 440',
      email: '',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nBenefits\nMaidstone House\nKing Street\nMaidstone\nKent ME15 6JQ\n\nIf you do not hear from the council after two weeks, follow up by calling the council on 01622 602 440 or 01622 602 557",
      weblink: 'http://www.maidstone.gov.uk/home/primary-services/benefits/primary-areas/advice-and-information',
      pdf: '6169/Maidstone.pdf'
    },
    {
      shortcode: 'E07000074',
      phone: '01621 854 477',
      email: 'contact@maldon.gov.uk',
      text: "",
      weblink: 'https://www.maldon.gov.uk/info/20087/benefits/7060/extra_help_and_advice',
      pdf: '/'
    },
    {
      shortcode: 'E07000235',
      phone: '03004 560 560',
      email: 'benefits@southworcestershirerevenues.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nSouth Worcestershire Revenues & Benefits Shared Service\nPO Box 11\nPershore\nWorcs WR10 1PU",
      weblink: 'https://www.malvernhills.gov.uk/council-tax-and-benefits/housing-benefit',
      pdf: '6178/Malvern_Hills.pdf'
    },
    {
      shortcode: 'E08000003',
      phone: '0161 234 5003',
      email: 'benefit.enquiries@manchester.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 8-page form.\n\nIt should take about 30 minutes to complete.\n\nYou may need to provide the council with evidence of what you spend money on.",
      weblink: 'http://www.manchester.gov.uk/info/200008/benefits_and_support/1342/discretionary_housing_payments_and_discretionary_council_tax_payments',
      pdf: '6184/ManchesterCC_DHP_Claim_form_November_2018.pdf'
    },
    {
      shortcode: 'E07000174',
      phone: '01623 463 463',
      email: 'mdc@mansfield.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nMansfield District Council\nCivic Centre\nChesterfield Road\nSouth Mansfield\nNotts NG19 7BH",
      weblink: 'https://www.mansfield.gov.uk/housing-benefits/discretionary-housing-payment',
      pdf: '6190/Mansfield.pdf'
    },
    {
      shortcode: 'E06000035',
      phone: '01634 332 222',
      email: 'benefits@medway.gov.uk',
      text: "",
      weblink: 'https://www.medway.gov.uk/info/200171/benefits_and_financial_support/414/extra_help_paying_the_rent/1',
      pdf: '/'
    },
    {
      shortcode: 'E07000133',
      phone: '01664 502 502',
      email: 'contactus@melton.gov.uk',
      text: "",
      weblink: 'http://www.melton.gov.uk/meandmylearning/info/2/our_services/12/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000187',
      phone: '0300 303 8588',
      email: 'customerservices@mendip.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nBenefit Section\nCannards Grave Road\nShepton Mallet\nSomerset, BA4 5BT\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.mendip.gov.uk/dhp',
      pdf: '6204/Mendip.pdf'
    },
    {
      shortcode: 'W06000024',
      phone: '01685 725116',
      email: 'benefits@merthyr.gov.uk',
      text: "To apply for a discretionary housing payment please email benefits@merthyr.gov.uk or call the number below.",
      weblink: 'http://www.merthyr.gov.uk/resident/housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E09000024',
      phone: '020 8274 4903',
      email: 'housing.benefits@merton.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nMerton Benefits Service\nPO Box 610\nMerton Civic Centre\nLondon Road\nMorden, SM4 5ZT\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www2.merton.gov.uk/advice-benefits/benefits/hb-ctb/dhp.htm',
      pdf: '6214/Merton.pdf'
    },
    {
      shortcode: 'E07000042',
      phone: '01884 234 259',
      email: 'benefits@middevon.gov.uk',
      text: "",
      weblink: 'https://www.middevon.gov.uk/residents/benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000203',
      phone: '0845 606 6080',
      email: 'housingsolutions@baberghmidsuffolk.gov.uk',
      text: "",
      weblink: 'http://www.babergh.gov.uk/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000228',
      phone: '01444 477264',
      email: 'benefit@midsussex.gov.uk',
      text: "",
      weblink: 'http://www.midsussex.gov.uk/revsandbens/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000002',
      phone: '01642 726 005',
      email: '',
      text: "",
      weblink: 'https://www.middlesbrough.gov.uk/benefits-and-council-tax/housing-benefit-and-council-tax-reduction/apply-discretionary-housing-payment',
      pdf: '/'
    },
    {
      shortcode: 'S12000019',
      phone: '0131 271 3201',
      email: 'revenues.enquiries@midlothian.gov.uk',
      text: "",
      weblink: 'https://www.midlothian.gov.uk/downloads/download/58/discretionary_housing_payment',
      pdf: '7283/Midlothian_DHP.pdf'
    },
    {
      shortcode: 'E06000042',
      phone: '01908 253 040',
      email: 'dhpbenefits@milton-keynes.gov.uk',
      text: "",
      weblink: 'http://www.milton-keynes.gov.uk/housing/rent-paying-rent/welfare-reform-options/discretionary-housing-payments-dhp',
      pdf: '/'
    },
    {
      shortcode: 'E07000210',
      phone: '01306 879 187',
      email: 'benefits@molevalley.gov.uk',
      text: "To apply for a DHP please complete this 3 page form and return it to:\n\nBenefits Department\nMole Valley District Council\nPippbrook\nDorking\nSurrey, RH4 1SJ\n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'http://www.molevalley.gov.uk/index.cfm?articleid=17510',
      pdf: '6244/Mole_Valley.pdf'
    },
    {
      shortcode: 'W06000021',
      phone: '01633 644655',
      email: 'benefits@monmouthshire.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nShared Benefits Service\nLevel 3 Civic Centre\nPontypool\nTorfaen, NP4 6YB",
      weblink: 'https://www.monmouthshire.gov.uk/home/counciltaxandbenefits/',
      pdf: '6250/Monmouthshire.pdf'
    },
    {
      shortcode: 'W06000012',
      phone: '01639 686 838',
      email: 'housing.benefits@npt.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\n* Port Talbot residents - Director of Finance and Corporate Services, Civic Centre, SA13 1PJ  \n\n* Neath/Upper Lliw Valley - Director of Finance and Corporate Services, Civic Centre, SA11 3QZ",
      weblink: 'https://www.npt.gov.uk/5069',
      pdf: '6256/Neat_port_talbot.pdf'
    },
    {
      shortcode: 'E07000091',
      phone: '01590 646 121',
      email: 'benefits@nfdc.gov.uk',
      text: "",
      weblink: 'http://www.nfdc.gov.uk/DHP',
      pdf: '/'
    },
    {
      shortcode: 'E07000175',
      phone: '01636 650 000',
      email: 'housing.benefits@nsdc.info',
      text: "You can apply to your council at the email address below stating why you are in need of a discretionary housing payment.",
      weblink: 'http://www.newark-sherwooddc.gov.uk/benefits/benefitsfaqs/',
      pdf: '/'
    },
    {
      shortcode: 'E08000021',
      phone: '0191 278 7878',
      email: 'benefits@newcastle.gov.uk',
      text: "People aged 16 to 25 in Newcastle can also apply to the Centrepoint Rent Deposit Guarantee Scheme for deposit support. Ask Centrepoint about landlords who accept housing benefit or Universal Credit.",
      weblink: 'https://www.newcastle.gov.uk/services/benefits/housing-benefit-help-pay-your-rent',
      pdf: '/'
    },
    {
      shortcode: 'E07000195',
      phone: '01782 715 500',
      email: 'benefits@newcastle-staffs.gov.uk',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\nBenefits Office,\nNewcastle under Lyme BC,\nCivic Offices,\nNewcastle,\nST5 2AQ \n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.newcastle-staffs.gov.uk/all-services/council-tax-and-benefits/benefits/discretionary-housing-payments',
      pdf: '6274/Newcastle_under_lyme_app_form.pdf'
    },
    {
      shortcode: 'W06000022',
      phone: '01633 656 656',
      email: 'benefits@newport.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nBy post - Newport City Council, Civic Centre, Newport, South Wales, NP20 4UR\n\nIn person - Information Station, Old station buildings, Queensway, Newport, NP20 4AX\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.newport.gov.uk/_dc/index.cfm?fuseaction=housing.homepage&contentid=cont701953',
      pdf: '6280/Newport.pdf'
    },
    {
      shortcode: 'S12000021',
      phone: '01294 310 000',
      email: 'benefits@north-ayrshire.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nNorth Ayrshire Council\nBenefits Section\nBridgegate House\nIrvine, KA12 8LS\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.north-ayrshire.gov.uk/benefits/housing-benefits/discretionary-housing-payments.aspx',
      pdf: '6286/North_Ayrshire.docx'
    },
    {
      shortcode: 'E07000043',
      phone: '01271 388 877',
      email: 'benefits@northdevon.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0345 034 4569',
      email: 'svpp@bcpcouncil.gov.uk',
      text: "",
      weblink: 'https://www.dorsetforyou.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000038',
      phone: '01246 217 600',
      email: 'revenues@ne-derbyshire.gov.uk ',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nRevenues Section,\n2013 Mill Lane,\nWingerworth,\nChesterfield, S42 6NG",
      weblink: 'https://www.ne-derbyshire.gov.uk/benefits/discretionary-housing-payments',
      pdf: '6300/North_East_Derbyshire.pdf'
    },
    {
      shortcode: 'E06000012',
      phone: '01472 326 287',
      email: 'benefits@nelincs.gov.uk',
      text: "",
      weblink: 'https://www.nelincs.gov.uk/benefits/extra-help/',
      pdf: '/'
    },
    {
      shortcode: 'E07000099',
      phone: '01462 474 597',
      email: 'service@north-herts.gov.uk',
      text: "To apply for a DHP please complete this online form ",
      weblink: 'http://www.north-herts.gov.uk/benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000139',
      phone: '01529 414 155',
      email: 'nkbenefits@lincoln.gov.uk',
      text: "",
      weblink: 'https://www.n-kesteven.gov.uk/residents/council-tax-and-housing-benefit/council-tax-support-and-housing-benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'S12000050',
      phone: '01236 856420',
      email: 'northbenefitsteam@northlan.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 8-page form. \n\nYou will need your housing benefit reference number and national insurance number.",
      weblink: 'http://www.northlanarkshire.gov.uk/index.aspx?articleid=28697',
      pdf: '/'
    },
    {
      shortcode: 'E06000013',
      phone: '01724 297000',
      email: 'benefits@northlincs.gov.uk',
      text: "",
      weblink: 'https://www.northlincs.gov.uk/council-tax-benefits-and-housing/benefits/dhps/',
      pdf: '/'
    },
    {
      shortcode: 'E07000147',
      phone: '01263 516 349',
      email: 'benefits@north-norfolk.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nBenefit Department\nNorth Norfolk District Council\nHolt Road\nCromer\nNorfolk, NR27 9EN\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.north-norfolk.gov.uk/tasks/benefits/apply-for-discretionary-housing-payments/',
      pdf: '6332/North_Norfolk.pdf'
    },
    {
      shortcode: 'E06000024',
      phone: '01934 888 888',
      email: 'customer.services@n-somerset.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefit Office\nNorth Somerset Council\nTown Hall, PO Box 83\nWeston-super-Mare, BS23 1UF\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.n-somerset.gov.uk/my-services/benefits-and-support/housingbenefit/about-discretionary-housing-payment/',
      pdf: '6338/North_Somerset.docx'
    },
    {
      shortcode: 'E08000022',
      phone: '0345 2000 104',
      email: 'benefits@northtyneside.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nRevenue and Benefit Service\nNorth Tyneside Council\nQuadrant East\nSilverlink North\nCobalt Business Park\nNorth Tyneside, NE27 0BY\n\nIt should take approximately 45 minutes to complete the form. If you need assistance in completing your form please call",
      weblink: 'http://my.northtyneside.gov.uk/category/92/discretionary-housing-payments',
      pdf: '6344/North_Tyneside.pdf'
    },
    {
      shortcode: 'E07000218',
      phone: '01827 715 341',
      email: 'benefits@northwarks.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nThe Council House\nSouth Street\nAtherstone\nWarwickshire, CV9 1DE",
      weblink: 'https://www.northwarks.gov.uk/info/20063/benefits/1111/housing_benefit_and_council_tax_support/3',
      pdf: '6350/North_Warwickshire.pdf'
    },
    {
      shortcode: 'E07000134',
      phone: '01530 454 545',
      email: 'benefits@nwleicestershire.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nRevenues and benefits service\nPO Box 10004\nHinckley, LE10 9EJ\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.nwleics.gov.uk/pages/discretionary_payments',
      pdf: '6356/North_West_Leicestershire.pdf'
    },
    {
      shortcode: 'E07000154',
      phone: '0300 330 7000',
      email: 'benefitservices@northampton.gov.uk',
      text: "",
      weblink: 'http://www.northampton.gov.uk/info/200008/benefits/1204/discretionary_housing_payment_dh',
      pdf: '/'
    },
    {
      shortcode: 'E06000057',
      phone: '0345 600 6400',
      email: 'benefits@northumberland.gov.uk',
      text: "Apply for a DHP by completing the 8 page application form and returning it to:\n",
      weblink: 'http://www.northumberland.gov.uk/Default.aspx?page=489#collapse8',
      pdf: '6366/Northumberland.pdf'
    },
    {
      shortcode: 'E07000148',
      phone: '0344 980 3333',
      email: 'benefits@norwich.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nBenefits Department\nCity Hall\nNorwich, NR2 1NH\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.norwich.gov.uk/info/20003/benefits_and_support/35/discretionary_housing_payments',
      pdf: '6372/Norwich.pdf'
    },
    {
      shortcode: 'E06000018',
      phone: '0115 718 4444',
      email: 'benefits.housing@nottinghamcity.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 12-page form.\n\nReturned the form to:\n\nNottingham City Council \nAdmail 3428 \nNottingham \nNG1 4XX",
      weblink: 'https://www.nottinghamcity.gov.uk/information-for-residents/benefits/housing-benefit/extra-help-with-your-rent/',
      pdf: '6378/Nottingham_city.pdf'
    },
    {
      shortcode: 'E07000219',
      phone: '024 7637 6514',
      email: 'benefits.section@nuneatonandbedworth.gov.uk',
      text: "To apply for a DHP please download and complete this 9 page form and return it to:\n\nNuneaton and Bedworth Borough Council\nBenefits\nTown Hall\nCoton Road\nNuneaton, CV11 5AA\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.nuneatonandbedworth.gov.uk/info/20035/benefits/167/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000135',
      phone: '0116 288 8961',
      email: 'benefits@oadby-wigston.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\n* Resources Department,\nOadby & Wigston BC,\nPO Box 5,\nWigston,\nLE18 1AZ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.oadby-wigston.gov.uk/pages/discretionary_housing_payment',
      pdf: '6390/Oadby.pdf'
    },
    {
      shortcode: 'E08000004',
      phone: '0161 770 6633',
      email: 'benefits@oldham.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'S12000023',
      phone: '01856 873 535',
      email: 'benefits@orkney.gov.uk',
      text: "",
      weblink: 'http://www.orkney.gov.uk/Service-Directory/D/Discretionary-Housing-Payments_2.htm',
      pdf: '7285/Orkney_DHP.pdf'
    },
    {
      shortcode: 'E07000178',
      phone: '01865 252755',
      email: 'welfarereform@oxford.gov.uk',
      text: "You can apply for a DHP by completing the following form.\n\nOxford City Council also offer a text message service available at 07786207664.\n\nBefore applying it is useful and may speed up the application process to call the Council on 01865252755.",
      weblink: 'https://www.oxford.gov.uk/info/20039/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'W06000009',
      phone: '01437 764 551',
      email: 'revenue.services@pembrokeshire.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nPembrokeshire County Council\nPO Box 42\nRevenue Services\nNorth Wing\nCounty Hall\nHaverfordwest\nPembrokeshire SA61 1YH",
      weblink: 'https://www.pembrokeshire.gov.uk/housing-benefit/discretionary-housing-payments',
      pdf: '6410/Pembrokeshire.pdf'
    },
    {
      shortcode: 'E07000122',
      phone: '01282 661 800',
      email: 'benefits@pendle.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'S12000048',
      phone: '01738 476 900',
      email: 'welfarefund@pkc.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nScottish Welfare Fund Team\nHousing & Community Care\nPerth & Kinross Council\nPullar House\n35 Kinnoull Street\nPerth, PH1 5GD\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.pkc.gov.uk/DHP',
      pdf: '6420/Perth_and_Kinross.pdf'
    },
    {
      shortcode: 'E06000031',
      phone: '01733 452 241',
      email: 'benefits@peterborough.gov.uk',
      text: "",
      weblink: 'https://www.peterborough.gov.uk/council/benefits/benefits-forms/',
      pdf: '/'
    },
    {
      shortcode: 'E06000026',
      phone: '01752 668 000',
      email: 'revenues@plymouth.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E06000044',
      phone: '023 9283 4556',
      email: 'hbsupportteam@portsmouthcc.gov.uk',
      text: "To apply for a DHP please complete this online form ",
      weblink: 'https://www.portsmouth.gov.uk/ext/benefits-and-support/benefits/supplementary-housing-benefits---discretionary-and-extended-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'W06000023',
      phone: '0845 602 7032',
      email: 'benefits@powys.gov.uk',
      text: "",
      weblink: 'https://en.powys.gov.uk/discretionaryhousingpayments',
      pdf: '/'
    },
    {
      shortcode: 'E07000123',
      phone: '01772 906 363',
      email: 'welfarebenefits@preston.gov.uk',
      text: "",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01929 557 382',
      email: 'benefits@westwey.gov.uk',
      text: "Email benefits@westwey.gov.uk and ask for a form to be sent to you. \nYou can also call 01305 211930 or 01929 557240 and ask for a form to be sent to you.",
      weblink: 'https://www.dorsetforyou.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000038',
      phone: '0118 937 3707',
      email: 'debt.advice@reading.gov.uk',
      text: "To apply for a DHP please complete this online form",
      weblink: 'https://www.reading.gov.uk/discretionary-payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000003',
      phone: '01642 774 774',
      email: 'contactus@redcar-cleveland.gov.uk',
      text: "",
      weblink: 'https://www.redcar-cleveland.gov.uk/resident/council-tax-and-benefits/benefits-and-support/Pages/Discretionary-Housing-Payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000236',
      phone: '01527 534 050',
      email: 'hbenefits@redditchbc.gov.uk',
      text: "",
      weblink: 'http://www.redditchbc.gov.uk/money-education-and-skills/benefits-and-help/extra-help-on-top-of-housing-benefit.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000211',
      phone: '01737 276 000',
      email: 'benefits@reigate-banstead.gov.uk ',
      text: "",
      weblink: 'http://www.reigate-banstead.gov.uk/info/20048/making_a_claim_for_housing_and_council_tax_support/488/discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'S12000038',
      phone: '0300 300 0204',
      email: 'benefits.finit@renfrewshire.gov.uk',
      text: "",
      weblink: 'http://www.renfrewshire.gov.uk/article/2345/Discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'W06000016',
      phone: '01443 425 002',
      email: 'housingbenefitenquiries@rctcbc.gov.uk',
      text: "To apply for a DHP please complete this 16 page form and return it to:\n\nBenefits,\nBronwydd House,\nPorth, CF39 9DL",
      weblink: 'http://www.rctcbc.gov.uk/EN/Resident/Benefits/DiscretionaryHousingpayments.aspx',
      pdf: '6478/Rhondda_Cynon_Taf.pdf'
    },
    {
      shortcode: 'E07000124',
      phone: '01200 425 111',
      email: 'benefits@ribblevalley.gov.uk',
      text: "",
      weblink: 'https://www.ribblevalley.gov.uk/info/200409/benefits_and_council_tax_support/529/housing_benefit_and_council_tax_support/7',
      pdf: '7286/Ribble_Valley.doc'
    },
    {
      shortcode: 'E07000166',
      phone: '01748 829 100',
      email: 'benefits@richmondshire.gov.uk',
      text: "To apply for a DHP please complete this online form",
      weblink: 'https://www.richmondshire.gov.uk/housing/help-with-housing/discretionary-housing-payment/',
      pdf: '/'
    },
    {
      shortcode: 'E08000005',
      phone: '0300 303 8870',
      email: 'benefits@rochdale.gov.uk',
      text: "To apply for a DHP please complete this  form and return it to one of:\n\nCustomer services, No 1 Riverside, Rochdale, OL16 1XU\nCustomer Services, Middleton Library, M24 6DU\nCustomer Services, Heywood Library, Heywood, OL10 1LL\nRevenues and Benefits Service, PO Box 490, Rochdale OL16 9AJ\n\n",
      weblink: 'http://www.rochdale.gov.uk/council-tax-benefits-and-money/Pages/help-with-housing-costs.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000075',
      phone: '01702 318 197',
      email: 'revenues&benefits@rochford.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nRochford Council\nRevenues and benefits\nCouncil Offices\nSouth Street\nRochford\nEssex, SS4 1BW \n\n\nIt should take approximately 60 minutes to complete the form. If you need assistance in completing your form please contact  01702 318197 or 01702 318198",
      weblink: 'https://www.rochford.gov.uk/benefits/financial-help-and-money-advice',
      pdf: '6500/rochford_dhp_2019.pdf'
    },
    {
      shortcode: 'E07000125',
      phone: '01706 217777',
      email: 'benefits@rossendalebc.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Section\nRossendale Borough Council\nAdmail ADM 4005\nRossendale BB4 4LZ       \n\nOr in person to One Stop Shop, The Business Centre, Futures Park, Bacup, OL13 0BB\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.rossendale.gov.uk/info/69/housing_benefits/5/discretionary_housing_payments',
      pdf: '6506/Rosendale_DHP_app_form_2019.pdf'
    },
    {
      shortcode: 'E07000064',
      phone: '01424 787 000',
      email: 'revenuesandbenefits@rother.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nP.O. Box 60\nBexhill-on-Sea\nEast Sussex, TN39 3ZF\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.rother.gov.uk/article/8966/discretionary-housing-payment',
      pdf: '6512/Rother.pdf'
    },
    {
      shortcode: 'E08000018',
      phone: '01709 382 121',
      email: 'benefits@rotherham.gov.uk',
      text: "",
      weblink: 'https://www.rotherham.gov.uk/benefits/discretionary-housing-payments/1',
      pdf: '/'
    },
    {
      shortcode: 'E09000011',
      phone: '020 8921 4900',
      email: 'benefits@royalgreenwich.gov.uk',
      text: "To apply for a DHP please complete this 14 page form and return it by mail or in person to:\n\nRoyal Borough of Greenwich\nRevenues & Benefits Service\nThe Woolwich Centre\n35 Wellington Street\nLondon SE18 6HQ        \n\nIt should take approximately 60 minutes to complete the form.",
      weblink: '',
      pdf: '/'
    },
    {
      shortcode: 'E09000020',
      phone: '020 7361 3006',
      email: 'benefits@rbkc.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nHousing Benefits Team\nKensington and Chelsea Council\nPO Box 22515 \nTown Hall \nHornton Street\nLondon W8 7WB\n\nIf you do not hear from the council after two weeks, follow up by calling the council on 020 7361 3006.",
      weblink: 'http://www.rbkc.gov.uk/adviceandbenefits/housingbenefit/discretionaryhousingpayment1.aspx',
      pdf: '6528/Kensington.pdf'
    },
    {
      shortcode: 'E09000021',
      phone: '0208 547 6702',
      email: 'benefits@rbk.kingston.gov.uk',
      text: "To apply, download the DHP form on the link above. Return the completed form and requested proofs to:\n\nBenefits Service\nRoyal Borough of Kingston upon Thames\nGuildhall 2\nKingston upon Thames\nKT1 1EU \n",
      weblink: 'http://www.kingston.gov.uk/info/200298/benefits/187/extra_support_-_discretionary_housing_payments',
      pdf: '6534/Kingston.pdf'
    },
    {
      shortcode: 'E06000040',
      phone: '01628 796 036',
      email: 'benefits@rbwm.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nRevenues & Benefits Team,\nBorough of Windsor & Maidenhead,\nPO Box 3464,\nSL6 1XP\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www3.rbwm.gov.uk/info/200231/discretionary_housing_payment/340/discretionary_housing_payments',
      pdf: '6540/RBWM_dhp_application_form_April_2020.pdf'
    },
    {
      shortcode: 'E07000220',
      phone: '01788 533 533',
      email: 'benefits.unit@rugby.gov.uk',
      text: "",
      weblink: 'https://www.rugby.gov.uk/info/20011/council_tax/14/discretionary_awards',
      pdf: '/'
    },
    {
      shortcode: 'E07000212',
      phone: '01932 425 388',
      email: 'benefits@runnymede.gov.uk',
      text: "",
      weblink: 'https://runnymededhp.teamnetsol.com/dhp/home',
      pdf: '/'
    },
    {
      shortcode: 'E07000176',
      phone: '0115 981 9911',
      email: 'revenues@rushcliffe.gov.uk',
      text: "",
      weblink: 'http://www.rushcliffe.gov.uk/counciltaxandbenefits/housingbenefit/discretionaryhousingpayment/',
      pdf: '/'
    },
    {
      shortcode: 'E07000092',
      phone: '01252 398 914',
      email: 'benefits@rushmoor.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Department\nRushmoor Borough Council\nFarnborough Road\nFarnborough\nHants GU14 7JU\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.rushmoor.gov.uk/article/3895/Types-of-benefit-available',
      pdf: '6562/Rushmoor.pdf'
    },
    {
      shortcode: 'E06000017',
      phone: '01572 722 577',
      email: 'enquiries@rutland.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nRutland County Council,\nCatmose,\nOakham,\nRutland, LE15 6HP\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.rutland.gov.uk/my-services/benefits/help-to-pay-rent/discretionary-payments/',
      pdf: '6568/Rutland.pdf'
    },
    {
      shortcode: 'E07000167',
      phone: '01653 600 666',
      email: 'benefits@ryedale.gov.uk',
      text: "",
      weblink: 'http://www.ryedale.gov.uk/services/council-tax-benefits/benefits/discretionary-housing-payment.html',
      pdf: '/'
    },
    {
      shortcode: 'E08000006',
      phone: '0161 793 2500',
      email: '',
      text: "",
      weblink: 'https://www.salford.gov.uk/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E08000028',
      phone: '0121 368 1155',
      email: 'contact@sandwell.gov.uk',
      text: "",
      weblink: 'http://www.sandwell.gov.uk/info/200154/housing_benefit/2170/problems_with_paying',
      pdf: '/'
    },
    {
      shortcode: 'E07000168',
      phone: '01723 232 323',
      email: 'benefits.office@scarborough.gov.uk',
      text: "",
      weblink: 'http://www.scarborough.gov.uk/home/housing/housing-benefit/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'S12000026',
      phone: '0300 100 1800',
      email: 'enquiries@scotborders.gov.uk',
      text: "",
      weblink: 'https://www.scotborders.gov.uk/info/20019/housing_benefits/454/discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000188',
      phone: '0300 303 7802',
      email: 'benefits@sedgemoor.gov.uk',
      text: "To apply for a DHP please complete this online form\n",
      weblink: 'http://www.sedgemoor.gov.uk/article/922/Discretionary-help-towards-Council-Tax-and-Rent-payments',
      pdf: '/'
    },
    {
      shortcode: 'E08000014',
      phone: '0845 140 0845',
      email: 'contact@sefton.gov.uk',
      text: "",
      weblink: 'https://www.sefton.gov.uk/advice-benefits/discretionary-housing-payment-and-exceptional-hardship-fund-policy-statement.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000169',
      phone: '01757 705 101',
      email: 'info@selby.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nSelby District Council,\nCivic Centre,\nDoncaster Road,\nN Yorkshire, YO8 9FT\n\nOr by handing it in in person to the Access Selby Contact Centre.\n\nIt should take approximately 45 minutes to complete the form. If you need assistance in completing your form please call the number below.\n",
      weblink: 'https://www.selby.gov.uk/how-we-work-out-your-benefit',
      pdf: '6607/Selby.doc'
    },
    {
      shortcode: 'E07000111',
      phone: '01732 227 000',
      email: 'qualityteam@sevenoaks.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nSevenoaks District Council\nPO Box 102\nArgyle Road\nSevenoaks\nKent, TN13 1GT\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.sevenoaks.gov.uk/info/20036/housing_benefit_and_council_tax_reduction/146/discretionary_payments',
      pdf: '6613/Sevenoaks.pdf'
    },
    {
      shortcode: 'E08000019',
      phone: '0114 273 6983',
      email: 'dhp-cts@sheffield.gov.uk',
      text: "",
      weblink: 'https://www.sheffield.gov.uk/home/benefits/discretionary-housing-payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000112',
      phone: '01303 853 555',
      email: 'revenues.benefits@folkestone-hythe.gov.uk',
      text: "To apply for a DHP please complete this online form",
      weblink: 'https://www.folkestone-hythe.gov.uk/housing-benefit/discretionary-housing-benefit',
      pdf: '/'
    },
    {
      shortcode: 'S12000027',
      phone: '01595 744 682',
      email: 'benefits@shetland.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nBenefits Department\nOffice Headquarters\n8 North Ness Business Park\nLerwick, ZE1 0LZ \n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.shetland.gov.uk/about_benefits/DiscretionaryHousingPayments.asp',
      pdf: '6629/shetland.pdf'
    },
    {
      shortcode: 'E06000051',
      phone: '0345 678 9001',
      email: 'benefits@shropshire.gov.uk',
      text: "",
      weblink: 'http://new.shropshire.gov.uk/benefits/what-help-can-i-claim-from-the-council/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000039',
      phone: '01753 475 111',
      email: 'benefits@slough.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nSlough Borough Council Benefit Service\nPO Box 1032\nSlough\nBerkshire, SL1 3YT\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.slough.gov.uk/benefits-and-money/discretionary-housing-payments.aspx',
      pdf: '6639/Slough.pdf'
    },
    {
      shortcode: 'E08000029',
      phone: '0121 704 8200',
      email: 'financialinclusion@solihull.gov.uk',
      text: "To apply for a DHP please complete this 16 page form and return it to:\n\nIncome and Awards\nDiscretionary Grants Team\nPO BOX 8118\nCouncil House\nSolihull, B91 9WZ\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.solihull.gov.uk/Resident/Benefits/welfarereforms/financialsupport',
      pdf: '6645/Solihull.pdf'
    },
    {
      shortcode: 'S12000028',
      phone: '0300 123 0900',
      email: 'DHP@south-ayrshire.gov.uk',
      text: "",
      weblink: 'https://www.south-ayrshire.gov.uk/welfarereform/housingpayments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01895 837 515',
      email: 'sbdcbenefits@chilternandsouthbucks.gov.uk',
      text: "",
      weblink: 'http://www.southbucks.gov.uk/article/7014/Discretionary-Housing-Payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000012',
      phone: '0345 045 0061',
      email: 'benefits@scambs.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nBenefit Section\nSouth Cambridgeshire District Council\nSouth Cambridgeshire Hall\nCambourne Business Park\nCambourne, CB23 6EA\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.scambs.gov.uk/benefits/apply-for-discretionary-housing-payments-dhps/',
      pdf: '6661/south_cambs_dhp_form_2019.pdf'
    },
    {
      shortcode: 'E07000039',
      phone: '01283 595 795',
      email: 'customer.services@south-derbys.gov.uk',
      text: "",
      weblink: 'https://www.southderbyshire.gov.uk/our-services/benefits/discretionary-payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000025',
      phone: '01454 868 002',
      email: 'Housing.Benefit@southglos.gov.uk',
      text: "",
      weblink: 'https://www.southglos.gov.uk/advice-and-benefits/benefits/discretionary-housing-payment-dhp/',
      pdf: '/'
    },
    {
      shortcode: 'E07000044',
      phone: '01803 861 234',
      email: 'customer.services@swdevon.gov.uk',
      text: "To apply for a DHP please complete this form and return it to:\n\nFollaton House\nPlymouth Road\nTotnes\nDevon, TQ9 5NE\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.southhams.gov.uk/DHP',
      pdf: '/'
    },
    {
      shortcode: 'E07000140',
      phone: '01775 761 161',
      email: 'benefits@sholland.gov.uk',
      text: "To apply for a discretionary housing payment please telephone the council on 01775 761161. Remember to explain your situation and any factors you think might be important (medical conditions, family circumstances etc).",
      weblink: 'https://www.sholland.gov.uk/article/5192/Benefits-Council-Tax-Support',
      pdf: '/'
    },
    {
      shortcode: 'E07000141',
      phone: '01476 406 080',
      email: 'benefits@southkesteven.gov.uk',
      text: "",
      weblink: 'http://www.southkesteven.gov.uk/index.aspx?articleid=8130',
      pdf: '/'
    },
    {
      shortcode: 'E07000031',
      phone: '01539 793418',
      email: 'benefits@southlakeland.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nThe Benefits Team\nSouth Lakeland District Council\nSouth Lakeland House\nLowther Street\nKendal, LA9 4DQ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.southlakeland.gov.uk/council-tax-and-housing-benefit/benefits/housing-benefit-payments/discretionary-housing-payments/',
      pdf: '6689/South_Lakeland.pdf'
    },
    {
      shortcode: 'S12000029',
      phone: '0303 123 1011',
      email: 'benefits@southlanarkshire.gov.uk',
      text: "",
      weblink: 'https://www.southlanarkshire.gov.uk/info/200261/housing_benefit_and_council_tax_reduction/1063/discretionary_housing_payment_dhp',
      pdf: '/'
    },
    {
      shortcode: 'E07000149',
      phone: '01508 533701',
      email: 'benefitsmailbox@s-norfolk.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nCommunities Directorate\nSouth Norfolk Council\nSwan Lane\nLong Stratton\nNorfolk, NR15 2XE\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.south-norfolk.gov.uk/benefits/912.asp',
      pdf: '6701/South_Norfolk.pdf'
    },
    {
      shortcode: 'E07000155',
      phone: '01327 322 140',
      email: 'customerservice@southnorthants.gov.uk',
      text: "",
      weblink: 'https://www.southnorthants.gov.uk/info/16/housing-benefits/126/discretionary-housing-payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000179',
      phone: '0345 302 2313',
      email: 'sodc.benefits@secure.capita.co.uk',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\nSouth Oxfordshire District Council\nPO Box 870\nErith, DA8 1UN\n\nIt should take approximately 60 minutes to complete the form.\n",
      weblink: 'http://www.southoxon.gov.uk/services-and-advice/council-tax-and-benefits/benefits/discretionary-housing-payments',
      pdf: '6711/South_Oxfordshire.pdf'
    },
    {
      shortcode: 'E07000126',
      phone: '01772 625 625',
      email: 'benefits@southribble.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it by mail or in person to:\n\nBenefits Service\nCivic Centre\nWest Paddock\nLeyland, PR25 1DH   \n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.southribble.gov.uk/content/discretionary-housing-payments-0',
      pdf: '6717/South_Ribble_DHP_form_April_2019.pdf'
    },
    {
      shortcode: 'E07000189',
      phone: '01935 462 462',
      email: 'benefitsunit@southsomerset.gov.uk',
      text: "",
      weblink: 'https://eclaim.southsomerset.gov.uk/victoriaforms/Viewer-VicForms.asp?user=anon&Form=DHP%20Application%20Form%20(1.0).wdf',
      pdf: '/'
    },
    {
      shortcode: 'E07000196',
      phone: '01902 696 668',
      email: 'benefits@sstaffs.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nSouth Staffs Council\nWolverhampton Road\nCodsall\nSouth Staffordshire, WV81PX\n\nIt should take approximately 15 minutes to complete the form. \n",
      weblink: 'https://www.sstaffs.gov.uk/benefits/discretionary-housing-payment.cfm',
      pdf: '6727/South_Staffordshire.pdf'
    },
    {
      shortcode: 'E08000023',
      phone: '0191 424 4333',
      email: 'benefits@southtyneside.gov.uk',
      text: "",
      weblink: 'https://www.southtyneside.gov.uk/article/34041/Additional-help-and-Discretionary-Housing-Payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000045',
      phone: '02380 833 009',
      email: 'benefit.services@southampton.gov.uk',
      text: "",
      weblink: 'http://www.southampton.gov.uk/benefits-welfare/housing-benefit/housing-benefit-calculator/discretionary-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000033',
      phone: '01702 215 001',
      email: 'benefits@southend.gov.uk',
      text: "",
      weblink: 'http://www.southend.gov.uk/info/200288/extra_financial_help/68/discretionary_housing_payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000213',
      phone: '01784 446 374',
      email: 'benefits@spelthorne.gov.uk',
      text: "",
      weblink: 'https://www.spelthorne.gov.uk/article/2737/Discretionary-Housing-Payments-',
      pdf: '/'
    },
    {
      shortcode: 'E07000240',
      phone: '01727 866 100',
      email: 'benefits@stalbans.gov.uk',
      text: "To apply for a DHP please complete this 6 page form and return it by post or in person to:\n\nBenefit Section\nSt Albans District Council Offices\nCivic Centre\nSt Peter���s Street\nSt Albans, AL1 3JE   \n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.stalbans.gov.uk/discretionary-housing-payments',
      pdf: '6749/St_Albans_DHP_form_May_2018_.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01284 757 269',
      email: 'benefitsenquiries@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E08000013',
      phone: '01744 676 666',
      email: 'Benefitactionline@sthelens.gov.uk',
      text: "",
      weblink: 'https://www.sthelens.gov.uk/benefits/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000197',
      phone: '01785 619 478',
      email: 'benefits@staffordbc.gov.uk',
      text: "",
      weblink: 'http://www.staffordbc.gov.uk/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000198',
      phone: '0345 605 3010',
      email: 'benefits@staffsmoorlands.gov.uk',
      text: "",
      weblink: 'https://www.staffsmoorlands.gov.uk/article/949/Discretionary-Housing-Payments-DHP',
      pdf: '/'
    },
    {
      shortcode: 'E07000243',
      phone: '01438 242 440',
      email: 'benefits@hertspartnership-ala.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nThe Benefits Service\nCouncil Offices\nWallfields\nHertford, SG13 8EQ\n\nIt should take approximately 10 minutes to complete the form.",
      weblink: 'http://www.stevenage.gov.uk/benefits/91406/',
      pdf: '6773/Stevenage_Borough_Council_Discretionary-Housing-Payment.pdf'
    },
    {
      shortcode: 'S12000030',
      phone: '01786 404040',
      email: 'finservices@stirling.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nStirling Council\nTeith House\nKerse Road\nStirling, FK7 7QA\n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'https://www.stirling.gov.uk/housing-council-tax/housing/housing-benefit/discretionary-housing-payment-scheme/',
      pdf: '6779/Stirling_Council_DHP_form_April2020.doc'
    },
    {
      shortcode: 'E08000007',
      phone: '0161 2176015',
      email: 'bentax.appeals@stockport.gov.uk',
      text: "",
      weblink: 'https://www.stockport.gov.uk/housing-benefit-discretionary-payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000004',
      phone: '01642 393 829',
      email: 'benefits.section@stockton.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits\n16 Church Road\nStockton-on-Tees, TS18 1TX\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.stockton.gov.uk/environment-and-housing/housing-benefit/discretionary-housing-payments/',
      pdf: '6789/Stockton_on_Tees.pdf'
    },
    {
      shortcode: 'E06000021',
      phone: '01782 234 234',
      email: 'Customer.Services@stoke.gov.uk',
      text: "",
      weblink: 'http://www.stoke.gov.uk/ccm/content/advice/benefits/discretionary-housing-payments.en',
      pdf: '/'
    },
    {
      shortcode: 'E07000221',
      phone: '01789 260 991',
      email: 'revenues@stratford-dc.gov.uk',
      text: "",
      weblink: 'https://www.stratford.gov.uk/benefits-support/housing-benefits.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E07000082',
      phone: '01453 754 078',
      email: 'benefit.services@stroud.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nBenefits Department,\nStroud District Council,\nEbley Mill,\nEbley Wharf,\nStroud, GL5 4UB\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.stroud.gov.uk/housing-benefit-universal-credit-and-council-tax-support/housing-benefit/discretionary-housing-payment-dhp',
      pdf: '6805/Stroud_discretionary-housing-payments-application-form.doc'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0333 016 2000',
      email: 'benefits@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E08000024',
      phone: '0191 520 5551',
      email: 'DiscretionaryHousingPayments@sunderland.gov.uk',
      text: "To apply for a DHP please complete this 12 page form and return it to:\n\nIt should take approximately 60 minutes to complete the form.\n",
      weblink: 'https://www.sunderland.gov.uk/DHP',
      pdf: '6815/Sunderland.pdf'
    },
    {
      shortcode: 'E07000214',
      phone: '01276 707 100',
      email: 'revenues@surreyheath.gov.uk',
      text: "",
      weblink: 'http://www.surreyheath.gov.uk/residents/benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000113',
      phone: '01795 417 850',
      email: 'benefitenquiries@swale.gov.uk',
      text: "",
      weblink: 'http://www.swale.gov.uk/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E06000030',
      phone: '0345 302 2316',
      email: 'swindon.benefits@secure.capita.co.uk',
      text: "",
      weblink: 'http://www.swindon.gov.uk/ab/ab-benefits/housingbenefit/ab-benefits-claim/Pages/ab-benefits-housingbenefit-claim-discretionarypayments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E08000008',
      phone: '0161 342 3708',
      email: 'benefitsteam@tameside.gov.uk',
      text: "",
      weblink: 'http://www.tameside.gov.uk/benefits/dhp',
      pdf: '/'
    },
    {
      shortcode: 'E07000199',
      phone: '01827 709 709',
      email: 'benefits@tamworth.gov.uk ',
      text: "To apply for a DHP please complete this 6 page form and return it to:\n\nThe Benefits Team,\nTamworth Borough Council,\nMarmion House,\nLichfield Street,\nTamworth, B79 7BZ\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.tamworth.gov.uk/do-it-online',
      pdf: '6843/Tamworth_DHP_form.docx'
    },
    {
      shortcode: 'E07000215',
      phone: '01883 722 000',
      email: 'benefits@tandridge.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nBenefits Section\nTandridge District Council Offices\n8 Station Road East\nOxted\nSurrey RH8 0BT.\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.tandridge.gov.uk/Benefits-and-support/Local-housing-allowance/Discretionary-payments',
      pdf: '6849/Tandridge__Discretionary-housing-payment-form-2018.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0300 304 8000',
      email: 'enquiries@somersetwestandtaunton.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nSomerset West and Taunton Council,\nRevenues and Benefits,\nPO Box 866, Taunton, TA1 9GS\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.somersetwestandtaunton.gov.uk/benefits/discretionary-payments/',
      pdf: '6855/somerset_west_and_taunton_dhp-dcta-claim-form-2019.pdf'
    },
    {
      shortcode: 'E07000045',
      phone: '01626 215 078',
      email: 'revandbens@teignbridge.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nTeignbridge District Council,\nBenefit Services,\nPO Box 2, Forde House,\nBrunel Road,\nNewton Abbot, TQ12 4YR\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.teignbridge.gov.uk/benefits-and-support/apply-for-benefit/discretionary-housing-payments-dhp/',
      pdf: '6861/teinbridge-dhp-application-nov-18.pdf'
    },
    {
      shortcode: 'E06000020',
      phone: '01952 383 838',
      email: 'contact@telford.gov.uk',
      text: "",
      weblink: 'http://www.telford.gov.uk/dhp',
      pdf: '/'
    },
    {
      shortcode: 'E07000076',
      phone: '01255 686 868',
      email: 'benefitsmail@tendringdc.gov.uk',
      text: "",
      weblink: 'http://www.tendringdc.gov.uk/benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000093',
      phone: '01264 368 000',
      email: 'benefits@testvalley.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nRevenues Services\nBeech Hurst\nWeyhill Road\nAndover\nHampshire, SP10 3AJ\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'https://www.testvalley.gov.uk/benefitsandcounciltax/benefits/discretionary-housing-payment',
      pdf: '6875/Test_Valley_Council_DHP_Policy_Revised_Feb_2020.pdf'
    },
    {
      shortcode: 'E07000083',
      phone: '01684 272 035',
      email: 'benefits@tewkesbury.gov.uk',
      text: "",
      weblink: 'https://www.tewkesbury.gov.uk/housing-benefit-and-council-tax-reduction/',
      pdf: '/'
    },
    {
      shortcode: 'E07000114',
      phone: '01843 577552',
      email: 'benefits@thanet.gov.uk',
      text: "",
      weblink: 'https://www.thanet.gov.uk/services/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'S12000017',
      phone: '0800 090 1004',
      email: 'welfare.support@highland.gov.uk',
      text: "",
      weblink: 'http://www.highland.gov.uk/directory_record/6377/discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'S12000020',
      phone: '01343 563 456',
      email: 'revenues@moray.gov.uk',
      text: "",
      weblink: 'http://www.moray.gov.uk/moray_standard/page_41496.html',
      pdf: '7284/Moray_DHP.pdf'
    },
    {
      shortcode: 'E07000102',
      phone: '01923 278 501',
      email: 'benefits@threerivers.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nThree Rivers District Council,\nThree Rivers House,\nNorthway,\nRickmansworth,\nHerts, WD3 1RL\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.threerivers.gov.uk/egcl-page/discretionary-housing-payments',
      pdf: '6899/three-rivers-discretionary-housing-payment-claim-form-1.pdf'
    },
    {
      shortcode: 'E06000034',
      phone: '01375 652 950',
      email: 'benefits@thurrock.gov.uk',
      text: "",
      weblink: 'https://www.thurrock.gov.uk/discretionary-housing-payment/overview',
      pdf: '/'
    },
    {
      shortcode: 'E07000115',
      phone: '01732 876 376',
      email: 'financial.services@tmbc.gov.uk',
      text: "To apply for a DHP please complete this 2 page form and return it to:\n\nKings Hill (Head Office),\nGibson Building,\nKings Hill,\nWest Malling,\nKent, ME19 4LZ\n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'http://www.tmbc.gov.uk/services/advice-and-benefits/benefits/discretionary-housing-payments-dhp',
      pdf: '6909/tonbridge-malling-dhp-app-form_3.pdf'
    },
    {
      shortcode: 'E06000027',
      phone: '01803 207 201',
      email: 'revenues@torbay.gov.uk',
      text: "Apply for a DHP by downloading and completing the 24 page form and return it to:\n\nTorbay Council, \nTorbay Town Hall, \nCastle Circus, \nTorquay, \nTQ1 3DR",
      weblink: 'https://www.torbay.gov.uk/benefits/other-help/dhp/',
      pdf: '6915/torbay-council-dhp-form.doc'
    },
    {
      shortcode: 'W06000020',
      phone: '01495 766430',
      email: 'benefits@torfaen.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nShared Benefit Service Level 3,\nCivic Centre,\nPontypool,\nTorfaen, NP4 6YB\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.torfaen.gov.uk/en/CouncilTaxAndBenefits/Benefits/HousingBenefitandCouncilTaxReduction/DiscretionaryhousingpaymentDHP/Discretionary-Housing-Payments.aspx',
      pdf: '6921/Torfaen-Discretionary-Housing-Payments-Application-Form.pdf'
    },
    {
      shortcode: 'E07000046',
      phone: '01237 428 700',
      email: 'benefits@torridge.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nTorridge District Council,\nRiverbank House,\nBideford,\nDevon, EX39 2QG\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.torridge.gov.uk/article/11139/Discretionary-Payment-Scheme',
      pdf: '6927/Torridge_DHP_Form_and_Notes_2020.pdf'
    },
    {
      shortcode: 'E08000009',
      phone: '0161 912 2220',
      email: 'access.trafford@trafford.gov.uk',
      text: "",
      weblink: 'http://www.trafford.gov.uk/residents/benefits-and-council-tax/benefits/discretionary-housing-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000116',
      phone: '01892 554 601',
      email: 'benefits@tunbridgewells.gov.uk',
      text: "To apply for a DHP please complete this 8 page form and return it to:\n\nBenefits Department\nTunbridge Wells Borough Council\nPO Box 1358\nMaidstone, ME14 9US\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.tunbridgewells.gov.uk/residents/benefits/housing-benefit',
      pdf: '6937/Tunbridge_Well_DHP_Form_2020.pdf'
    },
    {
      shortcode: 'E07000077',
      phone: '01799 510 335',
      email: 'benefits@uttlesford.gov.uk',
      text: "To apply for a DHP please complete this 11 page form and return it to:\n\nBenefits Uttlesford District Council,\nCouncil Offices,\nLondon Road,\nSaffron Walden,\nEssex, CB11 4ER\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.uttlesford.gov.uk/article/5122/Discretionary-Housing-Payments',
      pdf: '6943/Uttlesford_DHP_application.pdf'
    },
    {
      shortcode: 'W06000014',
      phone: '01446 709 244',
      email: 'benefits@valeofglamorgan.gov.uk',
      text: "",
      weblink: 'http://www.valeofglamorgan.gov.uk/en/our_council/housing_benefits/Discretionary-Housing-Payments-DHP.aspx',
      pdf: '7292/Vale_of_Glamoragan_DHP_form_April_2020.pdf'
    },
    {
      shortcode: 'E07000180',
      phone: '0345 302 2315',
      email: 'vowh.benefits@secure.capita.co.uk',
      text: "To apply for a DHP please complete this 9 page form and return it to:\n\n* Vale of White Horse District Council,\nPO Box 880,\nErith, DA8 1UN\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.whitehorsedc.gov.uk/services-and-advice/council-tax-and-benefits/benefits/discretionary-housing-payments',
      pdf: '6953/Vale_WH_DHP_Form.pdf'
    },
    {
      shortcode: 'E08000036',
      phone: '0845 8504 504',
      email: 'benefitsservice@wakefield.gov.uk',
      text: "",
      weblink: 'http://www.wakefield.gov.uk/housing/need-help-rent/discretionary-housing-payment',
      pdf: '/'
    },
    {
      shortcode: 'E08000030',
      phone: '0300 555 2855',
      email: 'BenefitsService@walsall.gov.uk   ',
      text: "",
      weblink: 'https://go.walsall.gov.uk/benefits/universal_credit/discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'E06000007',
      phone: '01925 443321',
      email: 'benefits@warrington.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nBenefits and Exchequer services\nPO Box 5\nNew Town House\nButtermarket St\nWarrington, WA1 2NH\n\nIt should take approximately 15 minutes to complete the form.",
      weblink: 'https://www.warrington.gov.uk/discretionary-housing-payments-dhps',
      pdf: '6969/Warrington_DHP_form_and_leaflet.pdf'
    },
    {
      shortcode: 'E07000222',
      phone: '01926 456 760',
      email: 'benefits@warwickdc.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nFinance\nP.O. Box 258\nRiverside House\nMilverton Hill\nLeamington Spa, CV32 5QW\n\nIt should take approximately 45 minutes to complete the form.",
      weblink: 'http://www.warwickdc.gov.uk/info/20199/housing_benefits/363/discretionary_housing_payments',
      pdf: '6975/Warwick.pdf'
    },
    {
      shortcode: 'E07000103',
      phone: '01923 278 501',
      email: 'benefits@watford.gov.uk',
      text: "To apply for a DHP please complete this form and return it to:\n\nThe Benefit Department\nWatford Borough Council\nWatford Town Hall\nWatford, WD17 3EX",
      weblink: 'https://www.watford.gov.uk/info/20229/benefits/935/apply_for_discretionary_housing_payments',
      pdf: '6981/Watford.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0333 016 2000',
      email: 'benefits@angliarevenues.gov.uk',
      text: "",
      weblink: 'http://www.angliarevenues.gov.uk/services/discretionary/index.cfm',
      pdf: '/'
    },
    {
      shortcode: 'E07000216',
      phone: '01483 523 596',
      email: 'housingbenefits@waverley.gov.uk',
      text: "Contact the council on 01483 523596.",
      weblink: 'http://www.waverley.gov.uk/info/100007/housing',
      pdf: '/'
    },
    {
      shortcode: 'E07000065',
      phone: '01323 443 500',
      email: 'benefits@wealden.gov.uk',
      text: "To apply for a DHP please complete the 4 page form available from the above link and return it to:\n\nBenefits Service,\nWealden District Council,\nVicarage Lane,\nHailsham, BN27 2AX\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://wealdengovuk.azurewebsites.net/benefits/who-can-get-housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000156',
      phone: '01933 231 692',
      email: 'benefits@wellingborough.gov.uk',
      text: "You can apply for a DHP by downloading and printing out this 7-page form.\n\nIt should take about 30 minutes to complete.\n\nYou may need to provide the council with evidence of what you spend money on.",
      weblink: 'http://www.wellingborough.gov.uk/info/200008/benefits/305/discretionary_housing_payments',
      pdf: '7003/Wellingborough_DHP_form_March_2020.pdf'
    },
    {
      shortcode: 'E07000241',
      phone: '01707 357 000',
      email: 'benefits@welhat.gov.uk',
      text: "To apply for a DHP please complete this 4 page form and return it to:\n\nThe Benefits Section,\nWelwyn Hatfield Borough Council,\nThe Campus,\nWelwyn Garden City,\nAL8 6AE\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.welhat.gov.uk/benefit-help/discretionary-housing-payments-and-council-tax-hardship-relief',
      pdf: '7009/Welwyn_Hatfield.pdf'
    },
    {
      shortcode: 'E06000037',
      phone: '01635 519 530',
      email: 'housing@westberks.gov.uk',
      text: "",
      weblink: 'http://info.westberks.gov.uk/index.aspx?articleid=27580',
      pdf: '/'
    },
    {
      shortcode: 'E07000047',
      phone: '01822 618 888',
      email: 'benefits@westdevon.gov.uk',
      text: "",
      weblink: 'https://www.westdevon.gov.uk/DHP',
      pdf: '/'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01305 251 010',
      email: 'benefits@westwey.gov.uk',
      text: "",
      weblink: 'https://www.dorsetforyou.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'S12000039',
      phone: '01389 738 555',
      email: 'benefits@west-dunbarton.gov.uk',
      text: "",
      weblink: 'https://www.west-dunbarton.gov.uk/benefits-and-grants/housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E07000127',
      phone: '0300 790 0380',
      email: 'housing.benefits@westlancs.gov.uk',
      text: "Call the council on 0300 790 0380 for an application form.\n\nOr email the council: housing.benefits@westlancs.gov.uk",
      weblink: 'http://www.westlancs.gov.uk/bills-benefits/benefits/discretionary-housing-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E07000142',
      phone: '01427 676 676',
      email: 'benefits@west-lindsey.gov.uk',
      text: "",
      weblink: 'http://www.west-lindsey.gov.uk/residents/benefits/help-to-pay-rent/discretionary-payments/',
      pdf: '/'
    },
    {
      shortcode: 'S12000040',
      phone: '01506 280 000',
      email: 'benefits@westlothian.gov.uk',
      text: "",
      weblink: 'https://www.westlothian.gov.uk/article/32347/Discretionary-Housing-Payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000181',
      phone: '01993 861 030',
      email: 'benefits@westoxon.gov.uk',
      text: "To apply for a DHP please complete this 7 page form and return it to:\n\nBenefit Services\nPO Box 302\nWitney, OX28 1WP\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.westoxon.gov.uk/council-tax-and-benefits/housing-benefits-and-universal-credit/discretionary-housing-payments/',
      pdf: '7047/West_Oxon_DHP_form_March_2020.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0300 304 8000',
      email: 'benefits@westsomerset.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nWest Somerset Council,\nRevenues and Benefits,\nPO Box 866, Taunton, TA1 9GS\n \nIt should take approximately 30 minutes to complete the form.",
      weblink: 'https://www.somersetwestandtaunton.gov.uk/benefits/discretionary-payments/',
      pdf: '7053/Somerset_west_DHP_form_March_2020.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '0345 034 4569',
      email: 'benefits@westwey.gov.uk',
      text: "",
      weblink: 'https://www.dorsetforyou.gov.uk/benefits/types-of-benefit/discretionary-housing-payment/discretionary-housing-payment.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E08000010',
      phone: '01942 489 002',
      email: 'benefits@wigan.gov.uk',
      text: "",
      weblink: 'http://www.wigan.gov.uk/Resident/Benefit-Grants/Housing-Benefits/Discretionary-housing-payments.aspx',
      pdf: '/'
    },
    {
      shortcode: 'E06000054',
      phone: '0300 456 0110',
      email: 'benefits@wiltshire.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nBenefits Service,\nWiltshire Council,\nMonkton Park,\nChippenham,\nWiltshire, SN15 1ER\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.wiltshire.gov.uk/downloads/3231',
      pdf: '7067/Wiltshire_council_dhp_application_March_2020.pdf'
    },
    {
      shortcode: 'E07000094',
      phone: '01962 848 539',
      email: 'benefits@winchester.gov.uk',
      text: "",
      weblink: 'https://www.winchester.gov.uk/benefits/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E08000015',
      phone: '0151 606 2002',
      email: 'housingbenefits@wirral.gov.uk',
      text: "",
      weblink: 'http://www.wirral.gov.uk/benefits-and-money/housing-benefit/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E07000217',
      phone: '01483 755 855',
      email: 'customers@woking.gov.uk',
      text: "",
      weblink: 'https://www.woking.gov.uk/benefits/housing-benefit/discretionary-housing-payments',
      pdf: '/'
    },
    {
      shortcode: 'E06000041',
      phone: '0118 974 6625',
      email: 'benefits@wokingham.gov.uk',
      text: "",
      weblink: 'http://www.wokingham.gov.uk/benefits/housing-benefit/discretionary-housing-payments/',
      pdf: '/'
    },
    {
      shortcode: 'E08000031',
      phone: '01902 551 166',
      email: 'city.direct@wolverhampton.gov.uk',
      text: "",
      weblink: 'http://www.wolverhampton.gov.uk/article/6760/Discretionary-Housing-Payment-DHP',
      pdf: '/'
    },
    {
      shortcode: 'E07000237',
      phone: '03004 560 560',
      email: 'benefits@southworcestershirerevenues.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nSouth Worcestershire Revenues & Benefits Shared Service,\nPO Box 11,\nPershore,\nWorcs, WR10 1PU\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'http://www.worcester.gov.uk/discretionary-housing-payments',
      pdf: '7099/Worcester_Discretionary_Housing_Payment_Form.pdf'
    },
    {
      shortcode: 'E07000229',
      phone: '01903 221 062',
      email: 'revsbens@adur-worthing.gov.uk',
      text: "To apply for a DHP please complete this 5 page form and return it to:\n\nAdur & Worthing Councils,\nPortland House,\n44 Richmond Road, Worthing,\nWest Sussex, BN11 1HS\n\nIt should take approximately 30 minutes to complete the form.",
      weblink: 'http://www.adur-worthing.gov.uk/benefits/benefits-explained/discretionary-housing-payments/',
      pdf: '7105/Adur_Worthing_DHP_form.pdf'
    },
    {
      shortcode: 'W06000006',
      phone: '01978 298 992',
      email: 'housingbenefits@wrexham.gov.uk',
      text: "To apply for a DHP please write to the council at the email address below. Remember to explain your situation and provide a complete financial statement of your income and expenses. ",
      weblink: 'http://www.wrexham.gov.uk/english/council/benefits/discretionary.htm',
      pdf: '/'
    },
    {
      shortcode: 'E07000238',
      phone: '03004 560 560',
      email: 'benefits@southworcestershirerevenues.gov.uk',
      text: "To apply for a DHP please complete this 10 page form and return it to:\n\nSouth Worcestershire Revenues & Benefits Shared Service, \nPO Box 11,\nPershore,\nWorcs, WR10 1PU\n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.wychavon.gov.uk/benefits-and-council-tax/benefits-advice/housing-benefit',
      pdf: '7115/Wychavon_DHP_form.pdf'
    },
    {
      shortcode: 'NNNNNNNNN',
      phone: '01494 412 227',
      email: 'benefits@wycombe.gov.uk',
      text: "To apply for a DHP please complete this 14 page form and return it to:\n\nWycombe District Council,\nBenefits Service,\nPO Box 513,\nHigh Wycombe, HP11 1DA\n\nOr in person - Wycombe District Council, Queen Victoria Road, HP11 1BB \n\nIt should take approximately 60 minutes to complete the form.",
      weblink: 'https://www.wycombe.gov.uk/pages/Housing/Housing-benefit/Discretionary-help-paying-rent.aspx',
      pdf: '7121/Wycombe_DHP_form.docx'
    },
    {
      shortcode: 'E07000128',
      phone: '01253 891 000',
      email: 'mailroom@wyre.gov.uk',
      text: "",
      weblink: 'http://www.wyre.gov.uk/info/200351/debt_counselling/313/discretionary_housing_payment',
      pdf: '/'
    },
    {
      shortcode: 'E07000239',
      phone: '01562 732 928',
      email: 'benefits@wyreforestdc.gov.uk',
      text: "",
      weblink: 'https://www.wyreforestdc.gov.uk/council-tax-and-benefits/housing-benefit/discretionary-housing-payments.aspx',
      pdf: '/'
    },
  ]

async function downloadFile(url, outputPath) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream(`./downloaded/${outputPath}`))
}

Promise.all(dhp.map(async d => {
    if (d.pdf.length > 2)
    return await downloadFile(`https://tools.shelter.org.uk/tools/contact_details/downloads/${d.pdf}`, d.pdf.replace('/','_'))
}))
