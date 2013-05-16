

var cursor = db.books.find({id:'1520b250-987f-47a8-a52b-ba2962618f50'});

var count = 0;
var book_count = 0;
k = true;
var booka;
var bookb;
var noproduct = 0;

function ftier (dataTier){
	if (dataTier== 'ED')
		return 4;
	else if (dataTier == 'PB')
		return 3;
	else if (dataTier == 'BS')
		return 2;
	else 
		return 1;
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

cursor.forEach(fcompare);


print('There are '+count+' products with not matching dataTier problem in books.');
print('There are '+book_count+' books with problem.');
print('There are '+noproduct+' found.');