let calculator = {

	operands:{},
	
	read(a, b) {
		this.operands.a = a;
		this.operands.b = b;
	},
	
	sum(){
		return this.operands.a + this.operands.b
	},
	
	mul(){
		return this.operands.a * this.operands.b
	},

};

window.calculator = calculator;
