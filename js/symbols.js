class CardSymbols {
  constructor(symbols) {
    this.symbols = symbols
  }
}

export function addSymbol(sym) {
  if (symbols.indexOf(sym) === -1) {
    symbols.push(sym);
    return symbols;
  } else {
    alert(' symbol already exists');
  }
}

export const symbols = [1, 2, 3, 4, 5, 6];

export const SYMBOL_NAMES = [
 'heart',
 'tornado',
 'trees',
 'headphones',
 'eiffel',
 'flower',
];

{ symbols }
