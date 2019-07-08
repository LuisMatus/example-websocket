<template lang="pug">
	.secction-charts
		v-container( grid-list-md text-xs-center)
			v-layout( row wrap)
				v-flex( xs12)
					h1(class="primary--text") Charts 
					//div#chart
				v-flex( xs12 md10 mx-auto)
					apexchart( type='line' width="100%" :options="options" :series="series" )
</template>



<script>
	var Axios = require('axios');

	import VueApexCharts from "vue-apexcharts";
	import ApexCharts from "apexcharts";

	export default {
		components: {
       		apexchart: VueApexCharts,
    	},
		data(){
			return {
				options : {
					chart: {
						id: "chart1",
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
				},
				series: [{
							name: "Suma de Costo ",
							data: []
						},
						{
							name: "Suma de Precio ",
							data: []
						}
				]
			}
		},
		sockets:{
			connection: function(){
				console.log('socket connected')
			},
			charts: function(){
				this.updateChart();
			}
		},
		mounted() {
			this.fetchData();
		},
		watch: {
			dialog (val) {
				val || this.close()
			}
		},
		methods: {

			async updateChart(){
				Axios.post('/api/v1/charts')
				.then( (response)=>{

					this.options.xaxis.categories = response.data.fechas;
					
					this.series[0].data = response.data.costo;
					this.series[1].data = response.data.precio;

				
					ApexCharts.exec("chart1", "updateOptions", {
						xaxis: {
							categories: this.options.xaxis.categories 
						}
					});

					ApexCharts.exec("chart1", "updateSeries", [
						{
							data: this.series[0].data
						},
						{
							data: this.series[2].data
						}

					]);
					

				})
				.catch(function (error) {
					// handle error
					//console.log(error);
				})
				.then(function () {
					// always executed
				});

			},

			fetchData(){
				Axios.post('/api/v1/charts')
				.then( (response)=>{
					// handle success
					//this.transactions = response.data.transactions;
					this.options.xaxis.categories = response.data.fechas;
					
					this.series[0].data = response.data.costo;
					this.series[1].data = response.data.precio;

				
					ApexCharts.exec("chart1", "updateOptions", {
						xaxis: {
							categories: this.options.xaxis.categories 
						}
					});

					ApexCharts.exec("chart1", "updateSeries", [
						{
							data: this.series[0].data
						},
						{
							data: this.series[2].data
						}

					]);
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