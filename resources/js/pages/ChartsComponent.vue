<template lang="pug">
	.secction-charts
		v-container( grid-list-md text-xs-center)
			v-layout(row justify-right )
				v-flex(xs12 text-right )
					v-radio-group( v-model="radios" row)
						v-radio( v-for="year of years" :label="''+year"  :value="year"  color="primary")
		v-container( grid-list-md text-xs-center)
			v-layout( row wrap)
				v-flex( xs12)
					h1(class="primary--text") Charts 
					//div#chart
				v-flex( xs12 md10 mx-auto)
					apexchart( type='line' width="100%" :options="options" :series="series" )
		
		table-data-component(v-bind:year="radios" v-bind:refreshChild="refreshChild")
		
</template>



<script>
	import tableData  from  './tableDataComponent.vue'

	var Axios = require('axios');

	import VueApexCharts from "vue-apexcharts";
	import ApexCharts from "apexcharts";

	export default {
		components: {
       		apexchart: VueApexCharts,
			'table-data-component':tableData
    	},
		data(){
			return {
				years: [],
				radios: 2000,
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
					colors: ['#545454','#77B6EA'],
					dataLabels: {
						enabled: false,
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
						size: 3
					},
					xaxis: {
						categories: [],
						type: 'categories',
						
						title: {
							text: ''
						},
						labels: {
							show: true,
							rotate: -30,
						}
					},
					yaxis: {
						title: {
							text: 'Costo - Precio'
						},labels: {
							formatter: function (val) {
								let	num= parseInt(val);
								return  '$ '+num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
							},
						},
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
							name: "Costo",
							data: []
						},
						{
							name: "Precio",
							data: []
						}
				],
				refreshChild : true,
			}
		},
		sockets:{
			connection: function(){
				console.log('socket connected')
			},
			charts: function(year){
				console.log('received by server'+ year);
				if(this.radios == year){
					this.fetchPerYear(year);
					this.refreshChild = !this.refreshChild;
					
				}
			}
		},
		mounted() {
			this.fetchData();
		},
		watch: {
			dialog (val) {
				val || this.close()
			},
			radios(year){
				console.log('change  year radios: '+year);
				this.fetchPerYear(year);
			}
		},
		methods: { 
			fetchData(){
				Axios.post('/api/v1/charts')
				.then( (response)=>{
					// handle success
					this.years = response.data.years;
					this.radios = this.years[this.years.length - 1];
					
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
			},
			fetchPerYear(year){
				Axios.post('/api/v1/charts/'+year)
				.then( (response)=>{
					
					if(response.data.status!='success') return;

					this.options.xaxis.categories = response.data.fechas;
					this.series[0].data = response.data.costo;
					this.series[1].data = response.data.precio;

					ApexCharts.exec("chart1", "updateOptions", {
						xaxis: {
							categories: this.options.xaxis.categories,
							title:{
								text:'weeks -' +year
							}
						}
					});

					ApexCharts.exec("chart1", "updateSeries", [
						{
							data: this.series[0].data
						},
						{
							data: this.series[1].data
						}

					]);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});

			}
			

		}
		
	}
</script>