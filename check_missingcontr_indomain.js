

var cursor = db.bookViews_newOne.find({'meta.contributors':{$size:0}}).limit(100);

var count = 0;
var book_count = 0;
k = true;
var booka;
var bookb;
var noproduct = 0;

function find_missing_contributors(x){
	db = db.getSiblingDB('domain');
	// print(count);
	// print(x.bookId);

	booka = db.books.find({id:x.bookId},{contributors:1,_id:0});
	if (booka[0].contributors.length > 0 ){
		print(x.bookId);
		count++;
	}

};

// function ftier (dataTier){
// 	if (dataTier== 'ED')
// 		return 4;
// 	else if (dataTier == 'PB')
// 		return 3;
// 	else if (dataTier == 'BS')
// 		return 2;
// 	else 
// 		return 1;
// };

// function fcompare (x) {

// 	var y = db.books.find({id:x.id}).count();
// 	if ( y >= 2){
// 		count ++;
// 	};
// };

// 	var bookdatatier= x.ingestMetaData.dataTier;
// 	for (var i=0;i<x.products.length;i++){

// 		var n = db.products.find({isbn13:x.products[i].isbn13},{'ingestMetaData.dataTier':1,'_id':0});
// 		if (n[0] == null) {
// 			noproduct++;
// 			print('Book s product:':+x.id+' does not exist in product db.');
// 			break;
// 		}
// 		var productdatatier = n[0].ingestMetaData.dataTier;
// 		var booktierprio = ftier(bookdatatier);
// 		var producttierprio = ftier(productdatatier);
// 		if ( producttierprio > booktierprio){
// 			count++;
// 			print('Book dataTier: '+bookdatatier+' .');
// 			print('Product dataTier: '+productdatatier+' .');
// 			if ( k ){
// 				book_count++;
// 				k = false;
// 			};
// 		};

// 	};
// 	k = true;
// };
 

print('--Start--');
print('There are '+cursor.size()+' books to in db.');

cursor.forEach(find_missing_contributors);


print('There are '+count+' with more then 1 entry in domain.books.');
// print('There are '+book_count+' books with problem.');
// print('There are '+noproduct+' found.');