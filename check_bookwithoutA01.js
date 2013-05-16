
var cursor = db.books.find();

var count = 0;
var book_count = 0 ;
var problem_count = 0;



function fA1(role){
	if ( role == 'A01')
		return 1;
	else return 0;
};

function fcontributors (x) {
	for (var i=0;i<x.contributors.length;i++){
		var n = x.contributors[i].role
		if ( fA1(n) == 1){
			break;
		} else (i==x.contributors.length) {
			print('Book '+x.id+' does not have A01.')
			problem_count++;
		};
	};
};



function fcompare (x) {
	var bookdatatier= x.ingestMetaData.dataTier;
	for (var i=0;i<x.products.length;i++){

		var n = db.products.find({isbn13:x.products[i].isbn13},{'ingestMetaData.dataTier':1,'_id':0});
		if (n[0] == null) {
			noproduct++;
			print('Book s product:':+x.id+' does not exist in product db.');
			break;
		}
		var productdatatier = n[0].ingestMetaData.dataTier;
		var booktierprio = ftier(bookdatatier);
		var producttierprio = ftier(productdatatier);
		if ( producttierprio > booktierprio){
			count++;
			print('Book dataTier: '+bookdatatier+' .');
			print('Product dataTier: '+productdatatier+' .');
			if ( k ){
				book_count++;
				k = false;
			};
		};

	};
	k = true;
};



print('--Start--');
print('There are '+cursor.size()+' books to in db.');

cursor.forEach(fcontributors);


print('There are '+problem_count+' books that does not have an A01 contributor.');
print('There are '+book_count+' books with problem.');
print('There are '+noproduct+' found.');








