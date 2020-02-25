const objectToArray = object => {
  if (object) {
    return Object.entries(object)
      .map(([k, v]) => {
        return {
          ...v
        };
      })
      .reverse();
  }
};

export { objectToArray };
