import F2 from '@antv/f2';
const data = [{
  name: 'Samsung',
  percent: 21.2
}, {
  name: 'Apple',
  percent: 14.6
}, {
  name: 'Huawei',
  percent: 9.5
}, {
  name: 'Oppo',
  percent: 6.8
}, {
  name: 'Vivo',
  percent: 5.3
}, {
  name: 'Others',
  percent: 42.7
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.coord('polar', {
  transposed: true,
  endAngle:  Math.PI*(6/5),
  startAngle: -Math.PI/2,
  innerRadius: 0.3,
});

chart.source(data.sort((a,b)=>{
  	return a.percent-b.percent
}), {
  percent: {
    max: 42.7
  }
});
chart.axis('name', {
  grid: null,
  line:null,
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    fill: '#E5875B'
  }
});
chart.axis('percent', false);
chart.tooltip(false);
chart.interval()
  .position('name*percent')
  .color('pink')
chart.render();