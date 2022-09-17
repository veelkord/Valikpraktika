const validateField = {
  testFields: (name: string): any => {
    let result = name.match(/[0-9A-Za-zÄÖÜäöü -.,!?]/g);
    if (result!.length == name.length) {
      return true;
    }
    return false;
  },
  testName: (name: string) => {
    let result = name.match(/[A-Za-zÄÖÜäöü -]/g);
    if (result?.length == name.length) {
      return true;
    }
    return false;
  },
};

export default validateField;
