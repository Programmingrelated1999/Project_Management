const checkDueDate = (createdDate, endDate) => {
    if(!endDate || createdDate < endDate){
      return false;
    }
    return true;
}

export default {checkDueDate};