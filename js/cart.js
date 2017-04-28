var vm=new Vue({
	el:'#app',
	data:{
		productList:[],
		totalMoney:0,
		checkFlag:false,
		delflag:false,
		del_index:''
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		})
	},
	methods:{
		cartView:function(){
			this.$http.get('data/cart.json').then(res=>{
				console.log(res);
				this.productList=res.body.result.productList;
				// this.totalMoney=res.body.result.totalMoney
			})
		},
		changemoney:function(product,val){
			if(val<0){  
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1;
				}
			}else{
				product.productQuentity++
			};
			this.calctotalMoney()
		},
		selectProduct:function(item){
			if(typeof item.checked=='undefined'){
				// Vue.set(item,'checked',true);全局注册
				this.$set(item,'checked',true);/**局部注册*/
			}else{
				item.checked=!item.checked
			}
			this.calctotalMoney()
		},
		selectAll:function(flag){
			this.checkFlag=flag;
			var _this=this;
			this.productList.forEach(function(item,val){
				if(typeof item.checked=='undefined'){
					_this.$set(item,'checked',_this.checkFlag);
				}else{
					item.checked=_this.checkFlag
				}
			});
			this.calctotalMoney()
			
		},
		calctotalMoney:function(){
			this.totalMoney=0;
			this.productList.forEach(res=>{
				if(res.checked){
					this.totalMoney+=res.productPrice*res.productQuentity
				}
			})
		},
		delete_item:function(index){
			this.delflag=!this.delflag;
			this.del_index=index;
		},
		delsure:function(){
			this.productList.splice(this.del_index,1);
			this.delflag=!this.delflag;
		}

	},

	filters:{
		formateMoney:function(value){
			return "￥"+value.toFixed(2)
		}
	}
})