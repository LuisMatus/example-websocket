<template>
  <div>
		<!--
		<v-navigation-drawer
			v-model="drawer"
			absolute
			temporary>
			<v-list class="pa-1">
				<v-list-tile avatar>
				<v-list-tile-avatar>
					<img src="https://randomuser.me/api/portraits/men/85.jpg">
				</v-list-tile-avatar>

				<v-list-tile-content>
					<v-list-tile-title>User Root</v-list-tile-title>
				</v-list-tile-content>
				</v-list-tile>
			</v-list>

			<v-list class="pt-0" dense>
				<v-divider></v-divider>

				<v-list-tile v-for="item in items" :key="item.title" @click="">
					
					<v-list-tile-action>
						
							<v-icon>{{ item.icon }}</v-icon>
						
					</v-list-tile-action>

					<v-list-tile-content>
						
						<v-list-tile-title><a href="/categories"> {{ item.title }}</a></v-list-tile-title>
						
					</v-list-tile-content>
				
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		-->
		<v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
			<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
				<!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
				<span class="hidden-sm-and-down">Transaccions</span>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			<!--<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>notifications</v-icon>
			</v-btn>
			-->
			<v-btn icon large>
				<v-avatar size="32px" tile>
					<img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
				</v-avatar>
			</v-btn>
		</v-toolbar>

  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
		{ title: 'Categorias',  icon: 'list_alt' },
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>