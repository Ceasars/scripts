var cursor = db.books.find();


//DEFINE


var count = 0;
var clean = 0;
var size;
var array;
var problem_count = 0;
var book_count = 0;

var csize = cursor.size();
print(csize);

// for (var i=0;i<csize;i++){
// 	fcompare(cursor[i]);
// };


function fcompare (x) {
	size = x.contributors.length;
	var is_duplicate = false;
	for (var t=0;t<size;t++){
		for (var n=t+1;n<size;n++){
				if ( (x.contributors[t].id != x.contributors[n].id )&& 
					 (x.contributors[t].displayName == x.contributors[n].displayName) ){
					print('Contributor:'+x.contributors[t].id);
					print('Contributor:'+x.contributors[n].id);
					print('Contributors id and displayName same for '+x.id);
					problem_count++;
					is_duplicate = true;
				};
		};
		
	};
	if ( is_duplicate) book_count++;
	
};


print ('--Start--');

cursor.forEach(fcompare);

/*
var cur = db.books.find({'id':'0dc8f5be-c579-451d-ab7a-07b5c861ceb3'});
var x = cur[0];
fcompare(x);
*/



print ('There are '+book_count+' books effected.');
print('There are '+problem_count+' contributors effected with duplicated contributors problem.');


















