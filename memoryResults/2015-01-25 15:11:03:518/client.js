(function() {
  var getChartConfig, parseCsv, prepareSeries, run;

  parseCsv = function(str) {
    var key, out, rows, val, _i, _len;
    rows = str.split("\n");
    out = [];
    for (key = _i = 0, _len = rows.length; _i < _len; key = ++_i) {
      val = rows[key];
      if (!val.length) {
        continue;
      }
      out.push(val.split(";"));
    }
    return out;
  };

  prepareSeries = function(csvArr) {
    var heapTotal, heapUsed, out, row, rss, ts, _i, _len;
    out = {
      rss: [],
      heapTotal: [],
      heapUsed: []
    };
    for (_i = 0, _len = csvArr.length; _i < _len; _i++) {
      row = csvArr[_i];
      ts = row[0] * 1;
      rss = row[1] * 1;
      heapTotal = row[2] * 1;
      heapUsed = row[3] * 1;
      out.rss.push([ts, rss]);
      out.heapTotal.push([ts, heapTotal]);
      out.heapUsed.push([ts, heapUsed]);
    }
    return out;
  };

  getChartConfig = function(csvStr) {
    return {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Memory usage'
      },
      series: [],
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> bytes<br/>',
        valueDecimals: 0
      }
    };
  };

  run = function() {
    $.get('./data.csv', {}, function(csvStr) {
      var chartConfig, data;
      data = prepareSeries(parseCsv(csvStr));
      chartConfig = getChartConfig();
      chartConfig.series.push({
        name: 'rss',
        data: data.rss
      });
      chartConfig.series.push({
        name: 'heapTotal',
        data: data.heapTotal
      });
      chartConfig.series.push({
        name: 'heapUsed',
        data: data.heapUsed
      });
      return $('#container').highcharts('StockChart', chartConfig);
    }, 'html');
  };

  module.exports.parseCsv = parseCsv;

  module.exports.prepareSeries = prepareSeries;

  module.exports.getChartConfig = getChartConfig;

  module.exports.run = run;

}).call(this);
