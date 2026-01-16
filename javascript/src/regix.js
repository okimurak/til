const arn = 'arn:aws:sns:us-gov-west-2:123456789012:HogehogeTopic';
const arnElementArray = arn.split(':');

// Regix enclosed between slashes (/), Please note that it is different from a string.(String enclosed between single quote ('))
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
const REGION_REGEXP = /(af|il|ap|ca|eu|me|sa|us|cn|us-gov|us-iso|us-isob)-(central|north|(north(?:east|west))|south|south(?:east|west)|east|west)-\d{1}/
const ACCOUNT_REGEXP = /\d{12}/

console.log(`region = ${arnElementArray[3]}, accountId = ${arnElementArray[4]}`);

if(arnElementArray[3].match(REGION_REGEXP)){
  console.log('this is valid region');
}

if(arnElementArray[4].match(ACCOUNT_REGEXP)) {
  console.log('this is valid account ID');
}
