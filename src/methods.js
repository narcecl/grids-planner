export default{
	getParents: function( node ){
		let current = node, list = [];

		while( current.parentNode !== null && current !== document.documentElement ){
			list.push(current.parentNode);
			current = current.parentNode;
		}

		return list;
	},
}