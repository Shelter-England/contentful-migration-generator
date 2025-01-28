require("dotenv").config();
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const contentful = require("contentful");

// Todo: source from env file
// Todo: add check/warning or interactive prompt if adding to master env
const SPACE_ID = "6sxvmndnpn0s";
const ENV = "master";
const ACCESS_TOKEN = process.env.access_token;

const findExternalLinks = (content, lookup) => {
  if(content) {


    let links = [];
    for(item of content) {
      if (item.nodeType === 'hyperlink') {
        links = [...links, item.data.uri];
      }
  
      if (item.content) {
        links = [...links, ...findExternalLinks(item.content, lookup)];
      }
    }
    return links;
  }

  return [];
}

const run = async () => {

  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID
  });

  const response1 = await client.getEntries({
    content_type: 'dataContactPoint',
    limit: 1000,
  });

  const response2 = await client.getEntries({
    content_type: 'dataContactPoint',
    limit: 1000,
    skip: 1000
  });
  
  
  const items = [...response1.items, ...response2.items];
  const includes = [...response1.includes.Entry, ...response2.includes.Entry];

  const lookup = {}
  
  includes.forEach(entry => {
    lookup[entry.sys.id] = entry.fields
  });

  const records = items.map(item => {
    const { localAuthority, link, ...rest } = item.fields;

    const localAuthorityFields = {};
     Object.keys(lookup[localAuthority.sys.id]).map(key => {
      localAuthorityFields[`la_${key}`] = lookup[localAuthority.sys.id][key];
    });


    const externalLinks = findExternalLinks(item.fields.text?.content, lookup);

    if (link && lookup[link.sys.id]) {
      externalLinks.unshift(lookup[link.sys.id].URL);
      console.log(lookup[link.sys.id]);
    }

    return {...localAuthorityFields, ...rest, externalLinks: `${externalLinks.join('\n')}`};
  });
  
  const csvWriter = createCsvWriter({
    path: 'csv/dataContactPoint.csv',
    header: [
        {id: 'la_title', title: 'Local authority - Title'},
        {id: 'la_shortCode', title: 'Local authority - Short Code'},
        {id: 'la_authorityType', title: 'Local authority - Authority Type'},
        {id: 'internalTitle', title: 'Title'},
        {id: 'serviceType', title: 'Service Type'},
        {id: 'phone', title: 'Phone'},
        {id: 'oooPhone', title: 'Out of Hours Phone'},
        {id: 'address', title: 'Address'},
        {id: 'email', title: 'Email'},
        {id: 'phone', title: 'Phone'},
        {id: 'externalLinks', title: 'External Links'}
    ]
  });

  await csvWriter.writeRecords(records);
  console.log('done')

}

run();