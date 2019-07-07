<template lang="pug">
	.secction-charts
		v-container( grid-list-md text-xs-center)
			v-layout( row wrap)
				v-flex( xs12)
					h1(class="primary--text") Charts 
					div#chart
</template>



<script>
	var Axios = require('axios');
	import ApexCharts from 'apexcharts';
	export default {

		data(){
			return {
				options : {
					chart: {
						height: 350,
						type: 'line',
						shadow: {
							enabled: true,
							color: '#000',
							top: 18,
							left: 7,
							blur: 10,
							opacity: 1
						},
						toolbar: {
							show: false
						}
					},
					colors: ['#77B6EA', '#545454'],
					dataLabels: {
						enabled: true,
					},
					stroke: {
						curve: 'smooth'
					},
					series: [{
							name: "Suma de Costo ",
							data: []
						},
						{
							name: "Suma de Precio ",
							data: []
						}
					],
					title: {
						text: 'Costos & Precio',
						align: 'left'
					},
					grid: {
						borderColor: '#e7e7e7',
						row: {
							colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
							opacity: 0.5
						},
					},
					markers: {
						
						size: 6
					},
					xaxis: {
						categories: [],
						
						title: {
							text: 'Día'
						}
					},
					yaxis: {
						title: {
							text: 'MXN'
						},
						//min: 5,
						//max: 40
					},
					legend: {
						position: 'top',
						horizontalAlign: 'right',
						floating: true,
						offsetY: -25,
						offsetX: -5
					}
				}
			}
		},
		mounted() {
			this.fetchData();
		},
		methods: {

			fetchData(){
				Axios.post('/api/v1/charts')
				.then( (response)=>{
					// handle success
					//this.transactions = response.data.transactions;
					console.log(this.options.series[0].data);
					this.options.xaxis.categories = response.data.fechas;
					this.options.series[0].data = response.data.costo;
					this.options.series[1].data = response.data.precio;

					var chart = new ApexCharts(document.querySelector("#chart"), this.options);
					chart.render();

				})
				.catch(function (error) {
					// handle error
					//console.log(error);
				})
				.then(function () {
					// always executed
				});
			},
		}
		
	}
</script>