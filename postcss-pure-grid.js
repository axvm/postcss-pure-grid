import postcss from 'postcss';

export default postcss.plugin('postcss-pure-grid', (opts) => {

  var calculateWidth = (column, maxcolumns) => {
    let width = ((100 / maxcolumns) * column);

    if (Number(width) === width && width % 1 === 0) {
      return width;
    } else {
      return width.toFixed(4);
    }
  };

  var value = /\s*(\d+)\s*\/\s*(\d+)\s*/;

  return (css) => {
    css.walkDecls(/^pure-grid-offset/, (decl) => {
      var match;

      if (match = value.exec(decl.value)) {
        var column = match[1];
        var maxcolumns = match[2];

        decl.parent.append({prop: 'margin-left', value: calculateWidth(column, maxcolumns) + '%'});

        decl.remove();
      } else {
        throw decl.error('Invalid declaration', { plugin: 'postcss-pure-grid' });
      }
    });

    css.walkDecls(/^pure-grid-unit/, (decl) => {
      var match;

      if (match = value.exec(decl.value)) {
        var column = match[1];
        var maxcolumns = match[2];

        decl.parent.append({prop: 'display', value: 'inline-block'});
        decl.parent.append({prop: 'zoom', value: '1'});
        decl.parent.append({prop: 'letter-spacing', value: 'normal'});
        decl.parent.append({prop: 'word-spacing', value: 'normal'});
        decl.parent.append({prop: 'vertical-align', value: 'top'});
        decl.parent.append({prop: 'text-rendering', value: 'auto'});
        decl.parent.append({prop: 'float', value: 'left'});
        decl.parent.append({prop: 'width', value: calculateWidth(column, maxcolumns) + '%'});

        decl.remove();
      } else {
        throw decl.error('Invalid declaration', { plugin: 'postcss-pure-grid' });
      }
    });

    css.walkDecls(/^pure-grid-group/, (decl) => {
      decl.parent.append({prop: 'letter-spacing', value: '-0.31em'});
      decl.parent.append({prop: 'text-rendering', value: 'optimizespeed'});
      decl.parent.append({prop: 'font-family', value: 'FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif'});
      decl.parent.append({prop: 'display', value: 'flex'});
      decl.parent.append({prop: 'flex-flow', value: decl.value});
      decl.parent.append({prop: 'align-content', value: 'flex-start'});

      decl.remove();
    });
  }
});
