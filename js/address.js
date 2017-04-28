const vm=new Vue({
	el:".container",
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		shopindex:1
	},
	mounted:function (argument) {
		this.$nextTick(function(){
			this.getaddress();
		})
	},
	methods:{
		getaddress:function(){
			this.$http.get('data/address.json').then(res=>{
				console.log(res);
				this.addressList=res.body.result;
			})
		},
		setdefault:function(addressId){
			this.addressList.forEach(function(item,index){
				if(item.addressId==addressId){
					item.isDefault=true
				}else{
					item.isDefault=false
				}
			})
		},
		conductNum:function(){
			if(this.limitNum==3){
				this.limitNum=this.addressList.length
			}else{
				this.limitNum=3
			}
		}
	},
	computed:{
		fliteraddressList:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	fliters:{

	}

	
})