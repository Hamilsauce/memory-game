export const text = {
  kebabToCamel(txt) {
    return txt.replace(/([-\-][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  },

}