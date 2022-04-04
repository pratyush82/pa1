import * as mocha from 'mocha';
import {expect} from 'chai';
import { parser } from 'lezer-python';
import { traverseExpr, traverseStmt, traverse, parse } from '../parser';

// We write tests for each function in parser.ts here. Each function gets its 
// own describe statement. Each it statement represents a single test. You
// should write enough unit tests for each function until you are confident
// the parser works as expected. 
describe('traverseExpr(c, s) function', () => {
  it('parses a number in the beginning', () => {
    const source = "987";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({tag: "num", value: 987});
  });

  it('parses a variable in the beginning', () => {
    const source = "x";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({tag: "id", name: "x"});
  });

  it('parses abs statement', () => {
    const source = "abs(-1)";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "builtin1",
      "name": "abs",
      "arg": {
        "tag": "num",
        "value": -1
      }
    });
  });

  it('parses print statement', () => {
    const source = "print(1)";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "builtin1",
      "name": "print",
      "arg": {
        "tag": "num",
        "value": 1
      }
    });
  });

  it('parses max(x,y) statement', () => {
    const source = "max(1,2)";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "builtin2",
      "name": "max",
      "arg1": {
        "tag": "num",
        "value": 1
      },
      "arg2": {
        "tag": "num",
        "value": 2
      }
    });
  });

  it('parses min(x,y) statement', () => {
    const source = "min(1,2)";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "builtin2",
      "name": "min",
      "arg1": {
        "tag": "num",
        "value": 1
      },
      "arg2": {
        "tag": "num",
        "value": 2
      }
    });
  });

  it('parses pow(x,y) statement', () => {
    const source = "pow(2,2)";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "builtin2",
      "name": "pow",
      "arg1": {
        "tag": "num",
        "value": 2
      },
      "arg2": {
        "tag": "num",
        "value": 2
      }
    });
  });

  it('parses a unary operation', () => {
    const source = "-2";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "num",
      "value": -2
    });
  });

  it('parses a binary + operation', () => {
    const source = "2+3";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "binexpr",
      "op": "+",
      "left": {
        "tag": "num",
        "value": 2
      },
      "right": {
        "tag": "num",
        "value": 3
      }
    });
  });

  it('parses a binary - operation', () => {
    const source = "2-3";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "binexpr",
      "op": "-",
      "left": {
        "tag": "num",
        "value": 2
      },
      "right": {
        "tag": "num",
        "value": 3
      }
    });
  });

  it('parses a binary * operation', () => {
    const source = "2*3";
    const cursor = parser.parse(source).cursor();

    // go to statement
    cursor.firstChild();
    // go to expression
    cursor.firstChild();

    const parsedExpr = traverseExpr(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "binexpr",
      "op": "*",
      "left": {
        "tag": "num",
        "value": 2
      },
      "right": {
        "tag": "num",
        "value": 3
      }
    });
  });

  // TODO: add additional tests here to ensure traverseExpr works as expected
});

describe('traverseStmt(c, s) function', () => {
  it('parses assignment statement', () => {
    const source = "x=2";
    const cursor = parser.parse(source).cursor();
    // go to statement
    cursor.firstChild();

    const parsedExpr = traverseStmt(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal({
      "tag": "define",
      "name": "x",
      "value": {
        "tag": "num",
        "value": 2
      }
    });
  });
  // TODO: add tests here to ensure traverseStmt works as expected
});

describe('traverse(c, s) function', () => {
  it('traverses statements', () => {
    const source = "x=2\nx";
    const cursor = parser.parse(source).cursor();
    // go to statement
    // cursor.firstChild();

    const parsedExpr = traverse(cursor, source);

    // Note: we have to use deep equality when comparing objects
    expect(parsedExpr).to.deep.equal([
      { tag: 'define', name: 'x', value: { tag: 'num', value: 2 } },
      { tag: 'expr', expr: { tag: 'id', name: 'x' } }
    ]);
  });
  // TODO: add tests here to ensure traverse works as expected
});

describe('parse(source) function', () => {
  it('parse a number', () => {
    const parsed = parse("987");
    expect(parsed).to.deep.equal([{tag: "expr", expr: {tag: "num", value: 987}}]);
  });

  it('parse / binary operation', () => {
    let err = null;
    try {
      parse("3/2");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse % binary operation', () => {
    let err = null;
    try {
      parse("3%2");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse abs(x,y)', () => {
    let err = null;
    try {
      parse("abs(1,2)");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse max(x)', () => {
    let err = null;
    try {
      parse("max(1)");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse min(x)', () => {
    let err = null;
    try {
      parse("min(1)");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse pow(x)', () => {
    let err = null;
    try {
      parse("pow(1)");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  it('parse print(x,y)', () => {
    let err = null;
    try {
      parse("print(1,2)");
    } catch(e) {
      err = e;
    }
    expect(err).to.be.an('Error');
    expect(err.message).to.contain('PARSE ERROR');
  });

  // TODO: add additional tests here to ensure parse works as expected
});