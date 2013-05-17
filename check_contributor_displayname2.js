var cursor = db.books.find();

//DEFINE


var count = 0;
var clean = 0;
var size;
var array;
var problem_count = 0;
var book_count = 0;
var cur_contributor;
var found_contributors= 0;
var csize = cursor.size();
var missing_contributor;
var hachette= 0;
print(csize);

// for (var i=0;i<csize;i++){
// 	fcompare(cursor[i]);
// };

//FUNCTIONS

function ffind (x)  {
	size = x.contributors.length;
	for (var i=0;i<size;i++){
		cur_contributor = db.contributors.find({'id':x.contributors[i].id});
		//print(x.contributors[i].id);
		if ( cur_contributor.count() != 0) {
			if ( cur_contributor[0].displayName != x.contributors[i].displayName) { 
			 // print(cur_contributor[0].displayName );
			 // print(x.contributors[i].displayName) ;
			problem_count++;
			if ( 'x.contributors[i].publisherInfo.supplier' != 'Hachette Book Group USA' ) {hachette++;}
			}
		}
		else { missing_contributor++;}	
	};
};

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

//EXECUTE

print('--Start--');

cursor.forEach(ffind);


// var cur = db.books.find({'id':'4ef23eeb-7ace-45d8-9611-8280c4e2d2cc'});
// var x = cur[0];
// ffind (x);




print('There are '+missing_contributor+' contributors are missing in contributor.');
print('There are '+problem_count+' contributors effected with different displayName.');
print('There are '+hachette+' books with Hachette effected with displayName.');

















