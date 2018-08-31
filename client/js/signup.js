var host = 'http://127.0.0.1:3000/';

var signup_container = new Vue({
	el: '#signup-container',
	data: {
		name_signin: '',
		password_signin: '',
		name: '',
		password: '',
		repassword: '',
		firstname: '',
		lastname: '',
		birthday: '',
		sexs: ['male', 'female'],
		currentSex: 'male',
		ages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
		currentAge: '18',
		wechart: '',
		qq: '',
		email: '',
		contury: '',
		address: '',
		phone: '',
		websize: '',
		github: '',
		bio: '',
		commits: null,
		pagestate: '0',
		image: '',
		imageSrc: '/image/TracyWorld_icon.jpg'
	},
	methods: {
		uploadfiles: function () {
			var xhr = new XMLHttpRequest()
			var fd = new FormData();
			
			var self = this
			xhr.open('POST', host + 'uploadfiles', true)
			
			xhr.onload = function () {
				self.commits = xhr.responseText
			} 
			fd.append('myFile', this.image);
			xhr.send(fd)
		},
		filesChange: function(event) {
			this.image = event.target.files[0]
			this.imageSrc = URL.createObjectURL(event.target.files[0])
		},
		return_index: function () {
			this.pagestate = '0'
		},
		signin_index: function () {
			this.pagestate = '1'
		},
		signup_index: function () {
			this.pagestate = '2'
		},
		signin: function () {
			this.pagestate = '3'
			
			var xhr = new XMLHttpRequest()

			var self = this
			xhr.open('GET', host + 'signin?' + 'name=' + self.name_signin + '&password=' + self.password_signin, true)
			
			xhr.onload = function () {
				//self.commits = xhr.responseText
				var myObj = JSON.parse(xhr.responseText);
				self.commits = myObj
			}

			xhr.send()
		},
		addUser: function() {
			this.pagestate = '3'

			var xhr = new XMLHttpRequest()

			var self = this
			xhr.open('GET', host + 'signup?' + 'name=' + self.name + '&password=' + self.password + '&firstname=' + 
			self.firstname + '&lastname=' + self.lastname + '&birthday=' + self.birthday
			+ '&sex=' + self.currentSex + '&age=' + self.currentAge + '&wechart=' + self.wechart
			+ '&qq=' + self.qq + '&email=' + self.email + '&contury=' + self.contury
			+ '&address=' + self.address + '&phone=' + self.phone + '&websize=' + self.websize
			+ '&github=' + self.github + '&bio=' + self.bio, true)
			
			xhr.onload = function () {
				self.commits = xhr.responseText
			}
			xhr.send()
		}
	}
})
