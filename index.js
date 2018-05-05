/**
* @param context {WebtaskContext}
*/
'use strict';
const https = require('https');

function processResult(openGraph, url) {
  return `- [${openGraph.title}](${url}) ![image](${openGraph.image}) ${openGraph.description}`;
}

module.exports = function(context, cb) {
  const url = context.query.url;
  https
    .get(
        'https://wt-7c34bb748e3e4073b3f657c0ae1afac9-0.run.webtask.io/open-graph-parser?url=' + url,
        result => {
            let str = '';
            result.on('data', chunk => {
                str += chunk;
            });
            result.on('end', () => {
                 cb(null, processResult(JSON.parse(str), url));
            });
        }
    )
    .on('error', e => {
        console.error(e);
    });
};