var count_different_publisher = 0;
var count_different_publisher_withinventory = 0;
var book_count = 0; 
var total_books= db.books.count(); var run_count=0;

for (var i=0;i<7400000;i=i+100000){
	var cursor = db.books.find().skip(i).limit(i+100000);
	cursor.forEach(compare);

	if ( i % 1000000 == 0) {
		// printjson(run_count);
		print('Total Number of books that their blacklisted by publisherId: '+book_count);
		print('Total Number of different publisher product number: ' +count_different_publisher);
		print('Total Number of different publisher product with inventory entry: '+count_different_publisher_withinventory);
	}
}




function compare (book){
	// run_count++;
	if ( book.hasOwnProperty('publisherInfo') && book.publisherInfo.hasOwnProperty('publisherId') 
		&& db.pblacklist.findOne({'_id': book.publisherInfo.publisherId}) != null  ){
		book_count++;
		book.products.forEach(function (productRef) {
			var product = db.products.findOne({isbn13:productRef.isbn13});
			if (  product !== null && product.hasOwnProperty('publisherInfo') ) {
				if( db.pblacklist.findOne({"_id" : product.publisherInfo.publisherId}) == null ){
					if ( db.inventories.findOne({isbn13:product.isbn13}) != null ){
						// print('Book: '+book.id);
						// print('With Inventory: ');
						// printjson(product.isbn13);
						count_different_publisher_withinventory ++;
					} else  {
						// printjson(product.isbn13);
						count_different_publisher++;
					}
				}
			}
		});
	};
	
};

print('Number of books that their blacklisted by publisherId: '+book_count);
print('Number of different publisher product number: ' +count_different_publisher);
print('Number of different publisher product with inventory entry: '+count_different_publisher_withinventory);



