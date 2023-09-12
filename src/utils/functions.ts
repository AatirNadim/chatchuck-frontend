export const checkOnline = (onlineObj, id : string) => {
  // console.log('online obj --> ', onlineObj)
  // console.log('person is online --> ', onlineObj[id])
  return !!onlineObj[id] ? true : false;
}