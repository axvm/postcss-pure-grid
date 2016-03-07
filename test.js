import test from 'ava';
import postcss from 'postcss';
import puregrid from './';

var CSSObject = (testCss) => {
  return postcss(puregrid).process(testCss).then((res) => {
    var struct = {};
    res.root.walkRules((rule) => {
      rule.walkDecls((decl) => {
        struct[decl.prop] = decl.value;
      })
    })
    return struct;
  })
}

test('pure-grid-unit attributes', async t => {
  let res = await CSSObject('{pure-grid-unit: 1/2;}')

  let expected = {
    display: 'inline-block',
    zoom: '1',
    'letter-spacing': 'normal',
    'word-spacing': 'normal',
    'vertical-align': 'top',
    'text-rendering': 'auto',
    float: 'left',
    width: '50%'
  };

  t.same(res, expected);
});

test('pure-grid-group attributes', async t => {
  let res = await CSSObject('{pure-grid-group: row nowrap;}');

  let expected = {
    'letter-spacing': '-0.31em',
    'text-rendering': 'optimizespeed',
    'font-family': 'FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif',
    display: 'flex',
    'flex-flow': 'row nowrap',
    'align-content': 'flex-start'
  };

  t.same(res, expected);
});

test('pure-grid-offset', async t => {
  let res = await CSSObject('{pure-grid-offset: 3/4;}');

  let expected = {
    'margin-left': '75%'
  };

  t.same(res, expected);
});

var widthTestArray = [
  {
    type: '1/6',
    value: '16.6667%'
  },
  {
    type: '2/12',
    value: '16.6667%'
  },
  {
    type: '1/4',
    value: '25%'
  },
  {
    type: '3/12',
    value: '25%'
  },
  {
    type: '1/3',
    value: '33.3333%'
  },
  {
    type: '4/12',
    value: '33.3333%'
  },
  {
    type: '5/12',
    value: '41.6667%'
  },
  {
    type: '1/2',
    value: '50%'
  },
  {
    type: '6/12',
    value: '50%'
  },
  {
    type: '7/12',
    value: '58.3333%'
  },
  {
    type: '2/3',
    value: '66.6667%'
  },
  {
    type: '8/12',
    value: '66.6667%'
  },
  {
    type: '3/4',
    value: '75%'
  },
  {
    type: '9/12',
    value: '75%'
  },
  {
    type: '5/6',
    value: '83.3333%'
  },
  {
    type: '10/12',
    value: '83.3333%'
  },
  {
    type: '11/12',
    value: '91.6667%'
  },
  {
    type: '1/1',
    value: '100%'
  },
  {
    type: '12/12',
    value: '100%'
  }
];

widthTestArray.forEach(testCase => {
  test(`Width calculation for ${testCase.type}`, async t => {
    let res = await CSSObject(`{pure-grid-unit: ${testCase.type};}`);
    t.is(res.width, testCase.value);
  });
});
