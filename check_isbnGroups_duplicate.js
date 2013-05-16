
var cursor = db.isbnGroups.find();

var count = 0 ;
var id_count = 0;

ffind (group) {
	for (var i=0;i<group.groups.length;i++){
		cur_id = group.groups[i].id;
		for (var n= 0;n<group.groups.length;n++){
			next_id = group.groups[n].id;
			if ( cur_id = next_id ) id_count++;
 			var group_i = db.isbnGroups.find({isbn13:group.isbn13},{'groups.id':cur_id});
			group_i.toArray();
			
			if ( group_i.length >= 2 ) { count++;
				print('id : '+group.isbn13+' have problem.');
			};
		};
	};
	if (id_count >= group.groups.length)


};






print('--Start--');
print('There are '+cursor.size()+' isbnGroups to in db.');


cursor.forEach(ffind);


// print('There are '+count+' products with not matching dataTier problem in books.');
// print('There are '+book_count+' books with problem.');
// print('There are '+noproduct+' found.');